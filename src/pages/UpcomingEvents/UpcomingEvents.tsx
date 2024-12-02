import EventCard from "../../components/EventCard";
import { useEffect, useState } from "react";
import {collection, getDocs } from 'firebase/firestore';
import { db, storage } from "../../firebase/firebaseConfig";
import { ref, getDownloadURL} from 'firebase/storage';
import { EventForServer } from '../../types';
import { Link } from "react-router-dom";


export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<EventForServer[] | null>([]);
  const [loading, setLoading] = useState(true);

  const fetchdata = async () => {
    try {
      const eventCollectionRef = collection(db, 'upcomingEvents');
      const eventSnapshot = await getDocs(eventCollectionRef);

      console.log(`Fetched ${eventSnapshot.docs.length} events from Firestore.`);

      if (eventSnapshot.empty) {
        console.log('No documents found in the upcoming collection.');
      }

      const eventsData = eventSnapshot.docs.map((doc) => {
        const eventData = doc.data() as EventForServer;
        eventData.id = doc.id;
        console.log(`Event ID: ${eventData.id}`, eventData);
        return eventData;
      });

      // we fetch the image URL for each event
      const eventsWithImageUrls = await Promise.all(
        eventsData.map(async (eventData) => {
          if (eventData.images && eventData.images.length > 0) {
            try {
              const imageRef = ref(storage, eventData.images[0]);
              const url = await getDownloadURL(imageRef);
              // we only need the first image
              eventData.imageUrl = url;
              console.log(`Fetched image URL for event ${eventData.id}: ${url}`);
            } catch(imageError) {
              console.error(`Error fetching image for event ${eventData.id}:`, imageError);
              eventData.imageUrl = ''; 
            }
          }
          return eventData;
        })
      );
      setEvents(eventsWithImageUrls);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events data: ', error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-5 text-white">Upcoming Events</h1>
      <h4 className="font-semibold text-white mb-9">
        Check out our upcoming events below:
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-center md:justify-start pb-40">
        {events && events.length > 0 ? (
          <>
            {events && events.map((event, index) => (
              <Link to={`/events/upcoming/details/${event.id}`} key={event.id}>
                <EventCard
                  key={index}
                  title={event.title}
                  description={event.description} 
                  date={typeof event.date === 'string' ? event.date : new Date(event.date.seconds * 1000).toDateString()}
                  author={event.author}
                  imageUrl={event.imageUrl}
                />
              </Link>
            ))}
            <EventCard isPlaceholder />
          </>
        ) : (
          // if no events we show the empty placeholder
        <EventCard isPlaceholder />
      )}
      </div>
    </div>
  );
}