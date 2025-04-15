// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaCalendarAlt, FaMapMarkedAlt, FaParking } from "react-icons/fa";
// import { FaLocationDot, FaNoteSticky } from "react-icons/fa6";
// import Speakers from "@/components/Event";
// import EventSchedule from "@/components/Event/EventSchedule";
// import { FaBowlFood } from "react-icons/fa6";
// import { BsPeopleFill } from "react-icons/bs";
// import { BsArrowUpRightCircle } from "react-icons/bs";

// import {
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   orderBy,
//   query,
//   Timestamp,
//   where,
// } from "firebase/firestore";
// import { db, storage } from "@/firebase/firebaseConfig";
// import { EventForServer, EventTimeline, Speaker } from "@/types";
// import { Spin } from "antd";
// import { useLocation, useParams } from "react-router-dom";
// import EventButton from "./EventButton";
// import KakaoMap from "@/components/KakaoMap";
// import { BackButton } from "@/components/Button/BackButton";
// import { useRecoilValue } from "recoil";
// import { getDownloadURL, ref } from "firebase/storage";
// import { eventCacheAtom } from "@/atoms/events";

// export default function EventDetails() {
//   const { id, type } = useParams<{ id: string; type: string }>();

//   const location = useLocation();
//   const eventCache = useRecoilValue(eventCacheAtom);
//   const passedEvent = location.state?.eventData;

//   const [event, setEvent] = useState<EventForServer | null>(null);
//   const [speakers, setSpeakers] = useState<Speaker[]>([]);
//   const [eventSchedule, setEventSchedule] = useState<EventTimeline[]>([]);
//   const [isGalleryOpen, setGalleryOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [registeredCount, setRegisteredCount] = useState(0);
//   const [partialLoading, setPartialLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let isMounted = true;
//     const fetchEventsData = async () => {
//       if (!id) {
//         setError("No Event ID is found");
//         setLoading(false);
//         return;
//       }
//       try {
//         const cachedEvent =
//           id && eventCache && id in eventCache ? eventCache[id] : passedEvent;

//         if (cachedEvent) {
//           if (isMounted) {
//             console.log("Using cached/passed event:", cachedEvent);
//             setEvent(cachedEvent as EventForServer);
//             setPartialLoading(true);
//           }
//         } else {
//           // agar passedData yoki cachedata bo'sh bo'lsa firebasedan fetch qilamiz
//           const collectionName =
//             type === "upcoming" ? "upcomingEvents" : "pastEvents";
//           console.log(`Fetching from ${collectionName} with ID: ${id}`);

//           const eventDocRef = doc(db, collectionName, id);
//           const eventDocSnap = await getDoc(eventDocRef);

//           if (eventDocSnap.exists()) {
//             if (isMounted) {
//               const eventData = {
//                 ...eventDocSnap.data(),
//                 id,
//               } as EventForServer;
//               console.log("Firebase event data:", eventData);
//               setEvent(eventData);
//             }
//           } else {
//             setError(`Event not found with ID: ${id}`);
//           }
//         }

//         // parallel fetch qilamiz
//         Promise.all([
//           // agar cacheda bo'lsa  skip qilamiz
//           cachedEvent
//             ? Promise.resolve({
//                 data: () => cachedEvent,
//                 exists: (): boolean => true,
//               })
//             : getDoc(
//                 doc(
//                   db,
//                   type === "upcoming" ? "upcomingEvents" : "pastEvents",
//                   id
//                 )
//               ),
//           getDocs(
//             query(collection(db, "registrations"), where("eventId", "==", id))
//           ),
//           getDocs(
//             query(collection(db, "speakers"), where("speakersId", "==", id))
//           ),
//           getDocs(
//             query(
//               collection(db, "eventTimeline"),
//               where("eventId", "==", id),
//               orderBy("startTime", "asc")
//             )
//           ),
//         ]).then(
//           ([eventDoc, regSnapshot, speakersSnapshot, timelineSnapshot]) => {
//             setRegisteredCount(regSnapshot.size);
//             setSpeakers(
//               speakersSnapshot.docs.map(
//                 (doc) => ({ ...doc.data(), id: doc.id } as Speaker)
//               )
//             );
//             setEventSchedule(
//               timelineSnapshot.docs.map((doc) => doc.data() as EventTimeline)
//             );

//             // const eventData = cachedEvent || (eventDoc && 'data' in eventDoc ? eventDoc.data() : null);

//             let eventData: EventForServer | null = null;
//             if (cachedEvent) {
//               eventData = cachedEvent;
//             } else if (
//               eventDoc &&
//               typeof (eventDoc as any).data === "function"
//             ) {
//               const data = (eventDoc as any).data();
//               if (data) {
//                 eventData = { ...data, id: id };
//               }
//             }

//             setPartialLoading(false);

//             if (eventData?.images?.length) {
//               loadImagesProgressively(eventData.images);
//             }
//           }
//         );

//         if (isMounted) {
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error("Error fetching event details:", error);
//         if (isMounted) {
//           setError("Failed to load event details. Please try again.");
//           setLoading(false);
//         }
//       }
//     };
//     fetchEventsData();

//     return () => {
//       isMounted = false;
//     };
//   }, [id, type, eventCache, passedEvent]);

//   // rasmlarni yuklash uhchun method
//   const loadImagesProgressively = async (
//     imagePaths: string[]
//   ): Promise<void> => {
//     // birinchi rasmni yuklaymiz
//     if (imagePaths.length > 0) {
//       try {
//         const mainImageUrl = await getDownloadURL(ref(storage, imagePaths[0]));
//         setEvent((prev) => {
//           if (!prev) return prev;
//           return {
//             ...prev,
//             imageUrls: [mainImageUrl],
//           };
//         });

//         // qolganinini esa backgroundda yuklaymiz
//         if (imagePaths.length > 1) {
//           Promise.all(
//             imagePaths
//               .slice(1)
//               .map((path) => getDownloadURL(ref(storage, path)))
//           ).then((urls) => {
//             setEvent((prev) => {
//               if (!prev) return prev;
//               return {
//                 ...prev,
//                 imageUrls: [...(prev.imageUrls || []), ...urls],
//               };
//             });
//           });
//         }
//       } catch (error) {
//         console.error("Error loading images:", error);
//       }
//     }
//   };

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-red-500">{error}</div>
//       </div>
//     );
//   }

//   if (loading || partialLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50 text-blue-600 text-md">
//         <Spin tip={loading ? "Wait a little bit" : "Loading additional data..."} size="large"></Spin>
//       </div>
//     );
//   }
//   // Gallery functions
//   const openGallery = (index: number) => {
//     setSelectedImage(index);
//     setGalleryOpen(true);
//   };

//   const closeGallery = () => {
//     setGalleryOpen(false);
//   };

//   const nextImage = () => {
//     if (event && event.imageUrls && event.imageUrls.length > 0) {
//       setSelectedImage((selectedImage + 1) % event.imageUrls.length);
//     }
//   };

//   const prevImage = () => {
//     if (event && event.imageUrls && event.imageUrls.length > 0) {
//       setSelectedImage(
//         (selectedImage - 1 + event.imageUrls.length) % event.imageUrls.length
//       );
//     }
//   };

//   // Add to Calendar function
//   const handleAddToCalendar = () => {
//     if (!event) return;
//     const { title, date, location, description } = event;

//     const startDateTime = `${date}`;
//     const endDateTime = `${date}`;

//     const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
//       title
//     )}&dates=${startDateTime.replace(/[-:]/g, "")}/${endDateTime.replace(
//       /[-:]/g,
//       ""
//     )}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(
//       location
//     )}`;
//     window.open(googleCalendarUrl, "_blank");
//   };

//   if (!event) {
//     return <div>Event not found.</div>;
//   }

//   const date = new Date(event.date.seconds * 1000);

//   // we extract year, month, and day
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");

//   const formattedDate = `${year}.${month}.${day}`;

//   return (
//     <>
//       <div className="container mx-auto py-8">
//         {/* // 1ta level orqaga qaytish buttoni */}
//         <div className="relative -mt-4 mb-8">
//           <BackButton size="md" onClick={() => console.log("went back")} />
//         </div>
//         {event.imageUrls?.length === 1 ? (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-3 flex flex-col items-start justify-start  gap-4 mb-4">
//               <div className="col-span-2 flex flex-col gap-4">
//                 <div
//                   className="col-span-3 relative h-72 sm:h-[500px] cursor-pointer overflow-hidden rounded-[8px] border border-[#505050]"
//                   onClick={() => openGallery(0)}
//                 >
//                   <img
//                     src={event.imageUrls[0]}
//                     alt={event.title}
//                     className="rounded-lg shadow-lg w-full h-full object-cover"
//                   />
//                 </div>
//               </div>
//               <div className="col-span-1 flex flex-col items-start justify-start gap-2 p-5 sm:p-[22px] w-full h-full rounded-[8px] border border-[#505050] bg-[#141414] overflow-hidden">
//                 <div className="mb-6 flex-grow">
//                   <h1 className="text-3xl text-blue-600 font-bold mt-1">
//                     {event.title}
//                   </h1>
//                   <p>
//                     <strong>By: {event.author}</strong>
//                   </p>
//                 </div>
//                 <div className="text-blue-100 w-full">
//                   <div className="mb-2 font-bold w-full">
//                     <p className="mb-2 flex items-center">
//                       <FaCalendarAlt className="inline-block mr-3 mb-1" />
//                       {formattedDate}
//                       <button
//                         onClick={handleAddToCalendar}
//                         className="inline-block ml-2 mb-1 text-lg text-blue-600 hover:text-blue-200 py-1 px-2 rounded-full"
//                         aria-label="Add to Calendar"
//                       >
//                         <BsArrowUpRightCircle />
//                       </button>
//                     </p>
//                     <p className="flex items-center mb-2">
//                       <BsPeopleFill className="inline-block mr-3 mb-1" />
//                       <strong>{event.seats}</strong>
//                     </p>
//                     <p className="flex items-center mb-2">
//                       <FaBowlFood className="inline-block mr-3 mb-1" />
//                       <strong>{event.snacks}</strong>
//                     </p>
//                     <p className="flex items-center mb-2">
//                       <FaParking className="inline-block mr-3 mb-1" />
//                       <strong>
//                         {event.parking ? " Available" : " Not Available"}
//                       </strong>
//                     </p>
//                     <p className="font-bold flex items-center mb-2">
//                       <FaLocationDot className="inline-block mr-3 mb-1" />
//                       {event.location}
//                     </p>
//                     <FaMapMarkedAlt className="inline-block mr-3 mb-1" />
//                     <a
//                       href={`https://map.kakao.com/link/search/${encodeURIComponent(
//                         event.location
//                       )}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="mr-3 mb-3 text-blue-500 hover:underline"
//                     >
//                       View on Kakao Map
//                     </a>

//                     <div className="flex flex-col w-full gap-2">
//                       {" "}
//                       {/* Added flex-col and w-full */}
//                       <div className="flex items-center mt-2 w-full">
//                         <div className="inline-flex items-center px-3 py-1 text-xs sm:text-sm bg-gray-700/80 text-gray-200 rounded-md border border-gray-600 shadow-sm">
//                           <span className="font-medium mr-1">Registered:</span>
//                           <span className="text-white font-semibold">
//                             {registeredCount}/{event?.maxSeats ?? 0}
//                           </span>
//                         </div>
//                       </div>
//                       <div className="w-full">
//                         <EventButton
//                           type={
//                             event?.date
//                               ? new Date(event.date.seconds * 1000) > new Date()
//                                 ? "upcoming"
//                                 : "past"
//                               : "past"
//                           }
//                           id={event?.id}
//                           title={event?.title}
//                           date={
//                             event?.date
//                               ? Timestamp.fromDate(
//                                   new Date(event.date.seconds * 1000)
//                                 )
//                               : undefined
//                           }
//                           author={event?.author}
//                           imageUrl={event.imageUrls?.[0]}
//                           eventRoom={event?.eventRoom}
//                           location={event?.location}
//                           isFull={registeredCount >= (event?.maxSeats ?? 0)}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         ) : (
//           // Ko'plab rasmlar bo'lgan holatda
//           <div className="grid grid-cols-1 flex flex-col items-start justify-start sm:grid-cols-3 gap-4 mb-4">
//             {/* ?? chap tomoni */}
//             <div className="col-span-2 flex flex-col gap-4">
//               {/*  Asosiy katta rasm*/}
//               <div
//                 className="relative h-72 sm:h-[450px] cursor-pointer overflow-hidden rounded-[8px] border border-[#505050]"
//                 onClick={() => openGallery(0)}
//               >
//                 <img
//                   src={event.imageUrls?.[0] ?? ""}
//                   alt={event.title}
//                   className="rounded-lg shadow-lg w-full h-full object-cover rounded-[8px] border border-[#505050]"
//                 />
//               </div>

//               {/* {/* uchta rasmni asosiy rasmni poasida korsatamiz */}
//             </div>

//             {/* Ong tomon tarafi */}
//             <div className="col-span-1 flex flex-col items-start justify-start gap-2 p-5 sm:p-[22px] w-full h-full rounded-[8px] border border-[#505050] bg-[#141414] overflow-hidden">
//               <div className="mb-4 flex-grow">
//                 <h1 className="text-3xl text-blue-600 font-bold mt-1">
//                   {event.title}
//                 </h1>
//                 <p>
//                   <strong>By: {event.author}</strong>
//                 </p>
//               </div>
//               <div className="text-blue-100 w-full">
//                 <div className="mb-2 font-bold w-full">
//                   <p className="mb-2 flex items-center">
//                     <FaCalendarAlt className="inline-block mr-3 mb-1" />
//                     {formattedDate}
//                     <button
//                       onClick={handleAddToCalendar}
//                       className="inline-block ml-2 mb-1 text-lg text-blue-600 hover:text-blue-200 py-1 px-2 rounded-full"
//                       aria-label="Add to Calendar"
//                     >
//                       <BsArrowUpRightCircle />
//                     </button>
//                   </p>
//                   <p className="flex items-center mb-2">
//                     <BsPeopleFill className="inline-block mr-3 mb-1" />
//                     <strong>{event.seats}</strong>
//                   </p>
//                   <p className="flex items-center mb-2">
//                     <FaBowlFood className="inline-block mr-3 mb-1" />
//                     <strong>{event.snacks}</strong>
//                   </p>
//                   <p className="flex items-center mb-2">
//                     <FaParking className="inline-block mr-3 mb-1" />
//                     <strong>
//                       {event.parking ? " Available" : " Not Available"}
//                     </strong>
//                   </p>
//                   <p className="font-bold flex items-center mb-2">
//                     <FaLocationDot className="inline-block mr-3 mb-1" />
//                     {event.location}
//                   </p>
//                   <FaMapMarkedAlt className="inline-block mr-3 mb-1" />
//                   <a
//                     href={`https://map.kakao.com/link/search/${encodeURIComponent(
//                       event.location
//                     )}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="mr-3 mb-3 text-blue-500 hover:underline"
//                   >
//                     View on Kakao Map
//                   </a>
//                   <div className="flex flex-col w-full gap-2">
//                     {" "}
//                     {/* Added flex-col and w-full */}
//                     <div className="flex items-center w-full">
//                       <div className="mt-2 inline-flex items-center px-3 py-1 text-xs sm:text-sm bg-gray-700/80 text-gray-200 rounded-md border border-gray-600 shadow-sm hover:bg-gray-600/90 transition-all duration-200">
//                         <span className="font-medium mr-1">Registered:</span>
//                         <span className="text-white font-semibold">
//                           {registeredCount}/{event?.maxSeats ?? 0}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="w-full">
//                       <EventButton
//                         type={
//                           event?.date
//                             ? new Date(event.date.seconds * 1000) > new Date()
//                               ? "upcoming"
//                               : "past"
//                             : "past"
//                         }
//                         id={event?.id}
//                         title={event?.title}
//                         date={
//                           event?.date
//                             ? Timestamp.fromDate(
//                                 new Date(event.date.seconds * 1000)
//                               )
//                             : undefined
//                         }
//                         author={event?.author}
//                         imageUrl={event.imageUrls?.[0]}
//                         eventRoom={event?.eventRoom}
//                         location={event?.location}
//                         isFull={registeredCount >= (event?.maxSeats ?? 0)}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//         {/* <div className="prose prose-lg text-white mb-8 mt-5">
//           <p>{event.description}</p>
//         </div> */}
//         <div className="flex flex-wrap items-baseline gap-2 mb-4 mt-10">
//           <h1 className="text-white font-bold text-3xl leading-none">
//             {event.headerTitle || "Focusing on the Backend Implementation"}
//           </h1>
//           {/* <h1 className="text-gray-500 font-bold text-3xl leading-none mx-2">
//             Backend Implementation
//           </h1> */}
//         </div>
//         <div className="w-full max-w-[750px] overflow-auto ">
//           {" "}
//           {/* Use max-w and w-full for responsiveness */}
//           <div className="col-span-2 prose prose-lg text-white flex-start ">
//             <p>{event.description}</p>
//           </div>
//           <div className="mt-4 grid grid-cols-3 gap-4">
//             {event.imageUrls?.slice(1, 4).map((image, index) => {
//               // If we're at the last slot and there are more images than show
//               const actualIndex = index + 1;
//               const isLastSlot = index === 2;
//               const totalImages = event.imageUrls.length;
//               if (isLastSlot && totalImages > 4) {
//                 // Show +more pageda esa rasmni dimmed qilib korsatamiz
//                 return (
//                   <div
//                     key={index}
//                     onClick={() => openGallery(actualIndex)}
//                     // className="relative h-20 sm:h-40 cursor-pointer flex items-center justify-center bg-gray-700 rounded-lg shadow-md"
//                     className="relative h-20 sm:h-40 cursor-pointer flex items-center justify-center rounded-lg shadow-md overflow-hidden rounded-[8px] border border-[#505050]"
//                     style={{
//                       backgroundImage: `url(${event.imageUrls[3]})`,
//                       backgroundSize: "cover",
//                       backgroundPosition: "center",
//                     }}
//                   >
//                     <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                       {/* Dimmed overlay */}
//                       <span className="text-white text-md font-bold">
//                         + {totalImages - 3} photos
//                       </span>
//                     </div>
//                   </div>
//                 );
//               } else {
//                 // normal rasm uchun
//                 return (
//                   <div
//                     key={index}
//                     className="relative h-20 sm:h-40 cursor-pointer overflow-hidden"
//                     onClick={() => openGallery(actualIndex)}
//                   >
//                     <img
//                       src={image}
//                       alt={`${event.title} - ${index + 2}`}
//                       className="rounded-lg shadow-md w-full h-full object-cover rounded-[8px] border border-[#505050]"
//                     />
//                   </div>
//                 );
//               }
//             })}
//           </div>
//           {speakers.length > 0 && eventSchedule && (
//             <EventSchedule schedule={eventSchedule} />
//           )}
//           <div className="mt-10"></div>
//           {speakers.length > 0 && (
//             <div className="mt-6">
//               <Speakers speakers={speakers} />
//             </div>
//           )}
//           <h2 className="text-3xl text-blue-600 font-bold mb-5 mt-3">
//             Event Location:{" "}
//           </h2>
//           <div className="flex items-center gap-2 mb-3">
//             {/* <FaMapMarkedAlt className="text-2xl text-blue-500" /> */}
//             <p className="text-xl text-gray-500 font-bold">{event.location}</p>
//           </div>
//           <KakaoMap address={event.location} eventRoom={event.eventRoom} />
//           <div className="bg-gray-800 p-6 rounded-lg text-gray-200 mt-8">
//             <h4 className="flex text-2xl font-bold text-blue-500 mb-2">
//               <FaNoteSticky className="inline-block text-2xl mr-2 mt-1" />
//               Note:
//             </h4>
//             <div className="overflow-x-auto">
//               <p className="text-gray-500 text-left">
//                 Please note that this event is for registered attendees only. If
//                 you have not registered yet, please do so before the event
//                 starts. Only registered attendees will be allowed to enter the
//                 event venue as we have limited seats. Thank you for your
//                 cooperation.
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="mt-10 flex justify-between"></div>

//         {/* GAllery View mode bu yerda */}
//         <AnimatePresence>
//           {isGalleryOpen && (
//             <motion.div
//               className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             >
//               <button
//                 onClick={closeGallery}
//                 className="absolute top-4 right-4 text-white text-lg bg-transparent"
//               >
//                 ✕
//               </button>
//               <button
//                 onClick={prevImage}
//                 className="absolute left-4 text-white text-xl bg-transparent z-10"
//               >
//                 &#8592;
//               </button>

//               <motion.div
//                 key={selectedImage}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.8 }}
//                 className="relative w-full max-w-3xl h-[80vh] flex items-center justify-center"
//               >
//                 {event.imageUrls && event.imageUrls[selectedImage] && (
//                   <img
//                     src={event.imageUrls[selectedImage]}
//                     alt={`Gallery Image ${selectedImage + 1}`}
//                     className="rounded-lg"
//                   />
//                 )}
//               </motion.div>
//               <button
//                 onClick={nextImage}
//                 className="absolute right-4 text-white text-xl bg-transparent z-10"
//               >
//                 &#8594;
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </>
//   );
// }
