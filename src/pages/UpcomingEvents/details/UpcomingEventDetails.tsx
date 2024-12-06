import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaParking  } from "react-icons/fa";
import { FaLocationDot, FaNoteSticky } from "react-icons/fa6";
import { Button } from '../../../components/ui/button';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Speakers, { Speaker } from '../../../components/Speakers';
import EventSchedule, { EventSlot } from '../../../components/EventSchedule';
import { FaBowlFood } from "react-icons/fa6";
import { BsPeopleFill } from "react-icons/bs";
import {BsArrowUpRightCircle} from "react-icons/bs";

import { doc, getDoc } from 'firebase/firestore';
import { db, storage } from '../../../firebase/firebaseConfig';
import { ref, getDownloadURL } from 'firebase/storage';
import { EventForServer } from '../../../types';
import { message, Spin } from "antd";
import { useAuth } from '../../../context/useAuth';
import { Link, useParams } from 'react-router-dom';


const upcomingEventSpeakers: Speaker[] = [
    {
        name: "Dr. John Doe",
        role: "Data Scientist",
        expertises: [
                "AI & ML Workshop",
                "Data Scientist",
                "Machine Learning "
        ],
        imageUrl: "/pastEvents/past1.jpeg",
        linkedIn: "https://www.linkedin.com/in/johndoe",
        date: "February 10, 2024",
        description: "This hands-on workshop will dive deep into AI and machine learning techniques. Learn from industry experts and enhance your skills in the world of artificial intelligence.",
        authorImg: "/pastEvents/past1.jpeg",
        author: "KO'DJ",
    },
    {
        name: "Dr. Jane Smith",
        role: "Machine Learning Engineer",
        expertises: [ 
                    "AI & ML Workshop",
                    "Data Scientist",
                    "Machine Learning "
        ],
        imageUrl: "/pastEvents/past2.jpeg",
        linkedIn: "https://www.linkedin.com/in/janesmith",
        date: "February 10, 2024",
        description: "This hands-on workshop will dive deep into AI and machine learning techniques. Learn from industry experts and enhance your skills in the world of artificial intelligence.",
        authorImg: "/pastEvents/past1.jpeg",
        author: "KO'DJ",
    },
    {
        name: "Dr. John Doe",
        role: "Data Scientist",
        expertises: [
                "AI & ML Workshop",
                "Data Scientist",
                "Machine Learning "
        ],
        imageUrl: "/pastEvents/past1.jpeg",
        linkedIn: "https://www.linkedin.com/in/johndoe",
        date: "February 10, 2024",
        description: "This hands-on workshop will dive deep into AI and machine learning techniques. Learn from industry experts and enhance your skills in the world of artificial intelligence.",
        authorImg: "/pastEvents/past1.jpeg",
        author: "KO'DJ",
    },
    {
        name: "Dr. Jane Smith",
        role: "Machine Learning Engineer",
        expertises: [ 
                    "AI & ML Workshop",
                    "Data Scientist",
                    "Machine Learning "
        ],
        imageUrl: "/pastEvents/past2.jpeg",
        linkedIn: "https://www.linkedin.com/in/janesmith",
        date: "February 10, 2024",
        description: "This hands-on workshop will dive deep into AI and machine learning techniques. Learn from industry experts and enhance your skills in the world of artificial intelligence.",
        authorImg: "/pastEvents/past1.jpeg",
        author: "KO'DJ",
    }
]

const eventSchedule: EventSlot[] = [
    {
        subject: "K-AI Alliance AI Solutions",
        time: "14:30 ~ 15:45",
        location: "Room 201",
        presentations: [
          { title: "AI Monetization Cases for Enterprises", company: "Moloko", presenter: "Jang Hyung-wook" },
          { title: "The Rise of Actionable AI", company: "Makinalax", presenter: "Yoon Seong-ho" },
          { title: "Engineering technologies for large-scale AI data centers", company: "Ravelup", presenter: "Kim Jun-ki" },
        ],
      },
      {
        subject: "Growing together with AI",
        time: "16:00 ~ 17:15",
        location: "Room 201",
        presentations: [
          { title: "(Panel Discussion) Together Talk by Three AI Community Operators", company: "SK Telecom, NVIDIA", presenter: "Kim Sang-ki, Kim Chan-ran, Seongtae Lee" },
        ],
      },
      {
        subject: "AI & ML Workshop",
        time: "17:30 ~ 18:45",
        location: "Room 201",
        presentations: [
          { title: "AI Monetization Cases for Enterprises", company: "Moloko", presenter: "Jang Hyung-wook" },
          { title: "The Rise of Actionable AI", company: "Makinalax", presenter: "Yoon Seong-ho" },
          { title: "Engineering technologies for large-scale AI data centers", company: "Ravelup", presenter: "Kim Jun-ki" },
        ],
      },
      {
        subject: "AI & ML Workshop",
        time: "19:00 ~ 20:15",
        location: "Room 201",
        presentations: [
          { title: "AI Monetization Cases for Enterprises", company: "Moloko", presenter: "Jang Hyung-wook" },
          { title: "The Rise of Actionable AI", company: "Makinalax", presenter: "Yoon Seong-ho" },
          { title: "Engineering technologies for large-scale AI data centers", company: "Ravelup", presenter: "Kim Jun-ki" },
        ],
      }
  ];


export default function UpcomingEventDetails() {

  const {user} = useAuth();

  // const param = useParams();
  // const id = param.id as string;
  const { id } = useParams<{ id: string }>();

  const [event, setEvent] = useState<EventForServer | null>(null);
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const handleProtectedLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {

    if (!user) {
      e.preventDefault(); 
      messageApi.error("Please login first to register for the event.");
      return;
    }
  };

  const fetchEventData = async () => {

    if (!id) {
      console.error('No event ID provided in the URL.');
      setLoading(false);
      return;
    }

    try {
      const eventDocRef = doc(db, 'upcomingEvents', id);
      const eventDoc = await getDoc(eventDocRef);

      // console.log('Fetching event with ID:', id);

      if (eventDoc.exists()) {
        const eventData = eventDoc.data() as EventForServer;
        eventData.id = eventDoc.id;

        // Fetch image URLs
        if (eventData.images && eventData.images.length > 0) {
          const imageUrls = await Promise.all(
            eventData.images.map(async (imagePath) => {
              const imageRef = ref(storage, imagePath);
              const url = await getDownloadURL(imageRef);
              return url;
            })
          );
          eventData.imageUrls = imageUrls;
        }

        setEvent(eventData);
        setLoading(false);
      } else {
        console.error('No such document!');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching event data: ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if(id) {
       fetchEventData();
    }
  }, [id]);

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50 text-blue-600 text-md"> 
            <Spin tip="Wait a little bit" size="large">  
            </Spin> 
        </div>
    );
  }
  // Gallery functions
  const openGallery = (index: number) => {
    setSelectedImage(index);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
  };

  const nextImage = () => {
    if (event && event.imageUrls && event.imageUrls.length > 0) {
      setSelectedImage((selectedImage + 1) % event.imageUrls.length);
    }
  };

  const prevImage = () => {
    if (event && event.imageUrls && event.imageUrls.length > 0) {
      setSelectedImage(
        (selectedImage - 1 + event.imageUrls.length) % event.imageUrls.length
      );
    }
  };

  // Add to Calendar function
  const handleAddToCalendar = () => {
    if (!event) return;
    const { title, date, location, description } = event;

    const startDateTime = `${date}`;
    const endDateTime = `${date}`;

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${startDateTime.replace(/[-:]/g, '')}/${endDateTime.replace(
      /[-:]/g,
      ''
    )}&details=${encodeURIComponent(
      description
    )}&location=${encodeURIComponent(location)}`;
    window.open(googleCalendarUrl, '_blank');
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (!event) {
    return <div>Event not found.</div>;
  }

  const date = new Date(event.date.toMillis());

  // we extract year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${year}.${month}.${day}`;

    return (
      <>
      {contextHolder}
        <div className="container mx-auto py-8 px-4 sm:px-8">
            {/* images grid */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 pt-5"> */}
              {event.imageUrls?.length === 1 ? (
                <div className="col-span-2 relative h-72 sm:h-[600px] cursor-pointer overflow-hidden" onClick={() => openGallery(0)}> 
                <img
                        src={event.imageUrls[0]}
                        alt={event.title}
                        className="rounded-lg shadow-lg w-full h-full object-cover"

                    />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 pt-5">
                  <div className="col-span-2 relative h-64 sm:h-[400px] cursor-pointer" onClick={() => openGallery(0)}>
                    <img
                      src={event.imageUrls?.[0] ?? ''}
                      alt={event.title}
                      className="rounded-lg shadow-lg w-full h-full object-cover" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {event.imageUrls?.slice(1, 4).map((image, index) => ( 
                        <div key={index} className="relative h-32 sm:h-48 cursor-pointer" onClick={() => openGallery(index + 1)}>
                            <img
                                src={image}
                                alt={`${event.title} - ${index + 2}`}
                                className="rounded-lg shadow-md"
                                // className="rounded-lg shadow-md w-full h-full object-cover"
                            />
                        </div>
                    ))}
                    { event.images.length > 4 && (
                        <div className="relative h-32 sm:h-48 cursor-pointer" onClick={() => openGallery(4)}>
                            <img
                                src={event.images[4]}
                                alt={`${event.title} - 4`}
                                // className="rounded-lg shadow-md w-full h-full object-cover"
                                className="rounded-lg shadow-md"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                                <p className="text-white text-md font-bold"> + {event.images.length - 5} photos</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>  
            )}
            {/* Event Title, Date, Location */}
            <div className="mb-6">
                <h1 className="text-3xl text-blue-600 font-bold mt-5 mb-5">{event.title}</h1>
                <div className="text-blue-100 mb-1">
                    <div className="mb-2 font-bold">
                        <p className="mb-2">
                            <FaCalendarAlt className="inline-block mr-3 mb-1" />
                            {formattedDate}
                            <button
                                onClick={handleAddToCalendar}
                                className="inline-block ml-2 mb-1 text-lg text-blue-600 hover:text-blue-200 py-1 px-4 rounded-full"
                                aria-label="Add to Calendar"
                            >
                                <BsArrowUpRightCircle />
                            </button>
                        </p>
                        <p className="flex items-center mb-2">
                            <BsPeopleFill className="inline-block mr-3 mb-1" />
                            <strong>{event.seats}</strong>
                        </p>
                        <p className="flex items-center mb-2">
                            <FaBowlFood className="inline-block mr-3 mb-1" />
                            <strong>{event.snacks}</strong>
                        </p>
                        <p className="flex items-center mb-2">
                            <FaParking className="inline-block mr-3 mb-1" />
                            <strong>{event.parking ? "Available" : "Not Available"}</strong>
                        </p>
                    </div>
                    
                    {/* Location and Register Button Row */}
                    <div className="flex items-center justify-between">
                        <p className="font-bold flex items-center mb-2">
                            <FaLocationDot className="inline-block mr-3 mb-1" />
                            {event.location}
                            <a
                                href={`https://map.kakao.com/link/search/${encodeURIComponent(event.location)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-blue-500 hover:underline"
                            >
                                View on KakaoMap
                            </a>
                        </p>
                        <Link 
                          to={`/events/upcoming/details/${id}/register`}
                          state={{ 
                            title: event.title,
                            date: event.date.toString(),
                            location: event.location,
                          }}
                          onClick={handleProtectedLinkClick}
                        >
                            <Button className="text-sm text-white bg-blue-700 border border-blue-700 px-3 py-1 rounded-2xl flex items-center hover:bg-white hover:text-blue-700 transition-colors duration-300 space-x-1 -mt-6">
                                <FaArrowUpRightFromSquare className="flex-none text-xs" />
                                <span>Register</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">Register</button> */}        
            {/* // description */}
            <div className="prose prose-lg text-white mb-8">
                <p>{event.description}</p>
            </div>
            <EventSchedule schedule={eventSchedule} />
            {/* <div className="bg-gray-800 p-6 rounded-lg text-gray-200 mt-8"></div> */}
            <div className='mt-10'>  </div>
            {/* speakers */}  
            <Speakers speakers={upcomingEventSpeakers} />

            <div className="bg-gray-800 p-6 rounded-lg text-gray-200 mt-8">
                <h4 className=" flex text-2xl font-bold text-blue-500 mb-2">
                   <FaNoteSticky className="inline-block text-2xl mr-2 mt-1" />
                    Note:
                </h4>
                <div className="overflow-x-auto">
                    <p className="text-gray-500 text-left">
                        Please note that this event is for registered attendees only. If you have not registered yet, please do so before the event starts.
                        Only registered attendees will be allowed to enter the event venue as we have our seats are limited. Thank you for your cooperation.
                    </p>
                </div>
            </div>
            <div className="mt-10 flex justify-between">
                {/* <button className="pointer-events-none opacity-50 duration-350 rounded px-2 py-1 text-neutral-400 transition hover:text-neutral-700">Back</button> */}
                {/* <button className="bg duration-350 flex items-center justify-center rounded-full bg-blue-500 py-1.5 px-3.5 font-medium tracking-tight text-white transition hover:bg-blue-600 active:bg-blue-700">Submit</button> */}
            </div>
            {/* full screen gllery view */}
            <AnimatePresence>
                {isGalleryOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <button onClick={closeGallery} className="absolute top-4 right-4 text-white text-lg bg-transparent">✕</button>
                        <button onClick={prevImage} className="absolute left-4 text-white text-xl bg-transparent z-10">&#8592;</button>

                        <motion.div
                            key={selectedImage}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="relative w-full max-w-3xl h-[80vh] flex items-center justify-center"
                        >
                          {event.imageUrls && event.imageUrls[selectedImage] && (

                            <img
                                src={event.imageUrls[selectedImage] }
                                alt={`Gallery Image ${selectedImage + 1}`}
                                className="rounded-lg"
                            />
                          )}
                        </motion.div>
                        <button onClick={nextImage} className="absolute right-4 text-white text-xl bg-transparent z-10">&#8594;</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
        </>
    // </div>
    );
}