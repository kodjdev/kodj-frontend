import EventCard from "../../components/Event/EventContainer";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, storage } from "../../firebase/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import { EventForServer } from "../../types";
import { Link } from "react-router-dom";
import { Spin } from "antd";

export default function UpcomingEventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState<EventForServer[] | null>(
    []
  );
  const [pastEvents, setPastEvents] = useState<EventForServer[] | null>([]);

  const [loading, setLoading] = useState(true);

  const fetchdata = async () => {
    try {
      const upcomingEventCollectionRef = collection(db, "upcomingEvents");
      const pastEventCollectionRef = collection(db, "pastEvents");

      // parallel tarzda 2 ta endpointga fetch call qilamiz
      const [upcomingEventSnapshot, pastEventSnapshot] = await Promise.all([
        getDocs(upcomingEventCollectionRef),
        getDocs(pastEventCollectionRef),
      ]);

      if (upcomingEventSnapshot.empty || pastEventSnapshot.empty) {
        console.log("No data found in the colleection.");
      }

      const upcomingEventsData = upcomingEventSnapshot.docs.map((doc) => {
        const eventData = doc.data() as EventForServer;
        eventData.id = doc.id;
        return eventData;
      });

      const pastEventsData = pastEventSnapshot.docs.map((doc) => {
        const eventData = doc.data() as EventForServer;
        eventData.id = doc.id;
        return eventData;
      });

      // we fetch registration count and image for an event
      const fetchEventDetails = async (eventData: EventForServer) => {
        if (!eventData.images?.length) return eventData;

        try {
          //we fetch registration count
          const registrationsQuery = query(
            collection(db, "registrations"),
            where("eventId", "==", eventData.id)
          );
          const registrationSnapshot = await getDocs(registrationsQuery);
          eventData.registeredCount = registrationSnapshot.size;

          // then we fetch image URL
          const imageRef = ref(storage, eventData.images[0]);
          eventData.imageUrl = await getDownloadURL(imageRef);

          return eventData;
        } catch (error) {
          console.error(
            `Error fetching details for event ${eventData.id}:`,
            error
          );
          eventData.imageUrl = "";
          eventData.registeredCount = 0;
          return eventData;
        }
      };

      // then we process upcoming and past events in parallel
      const [processedUpcomingEvents, processedPastEvents] = await Promise.all([
        Promise.all(upcomingEventsData.map(fetchEventDetails)),
        Promise.all(pastEventsData.map(fetchEventDetails)),
      ]);

      // then we filter out any invalid events based on event type
      const filteredUpcomingEvents = processedUpcomingEvents.filter(
        (event): event is EventForServer =>
          event !== undefined && typeof event !== "string"
      );

      const filteredPastEvents = processedPastEvents.filter(
        (event): event is EventForServer =>
          event !== undefined && typeof event !== "string"
      );

      // // we fetch the upcomoing event image URL for each event
      // const eventsWithPastImageUrls = await Promise.all(
      //   pastEventsData.map(async (eventData) => {
      //     if (eventData.images && eventData.images.length > 0) {
      //       try {
      //         const imageRef = ref(storage, eventData.images[0]);
      //         const url = await getDownloadURL(imageRef);
      //         eventData.imageUrl = url;
      //       } catch (imageError) {
      //         console.error(
      //           `Error fetching image for event ${eventData.id}:`,
      //           imageError
      //         );
      //         eventData.imageUrl = "";
      //       }
      //     }
      //     return eventData;
      //   })
      // );

      setUpcomingEvents(filteredUpcomingEvents);
      setPastEvents(filteredPastEvents);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events data: ", error);
    }
  };

  const moveOldEvents = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_FIREBASE_MOVE_EVENTS_URL,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (response.ok && data.movedCount > 0) {
        await fetchdata();
      }
    } catch (error) {
      console.error("Error moving events:", error);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        const dataPromise = fetchdata();
        if (import.meta.env.DEV) {
          await Promise.all([dataPromise, moveOldEvents()]);
        } else {
          await dataPromise;
        }
      } catch (error) {
        console.log("Error initializing data: ", error);
      }
      // // this method will now run for all users
      // await moveOldEvents();
      // await fetchdata();
    };

    initializeData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50 text-blue-600 text-md">
        <Spin tip="Wait a little bit" size="large"></Spin>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-wrap items-baseline gap-2 mb-5">
        <h1 className="text-white font-bold text-3xl leading-none">Upcoming</h1>
        <h1 className="text-gray-500 font-bold text-3xl leading-none mx-2">
          Events
        </h1>
      </div>
      <h4 className="font-semibold text-white mb-9">
        Check out our past events below:
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-center md:justify-start pb-40">
        {upcomingEvents && upcomingEvents.length > 0 ? (
          <>
            {upcomingEvents &&
              upcomingEvents.map((event, index) => (
                <Link
                  to={`/events/upcoming/details/${event.id}`}
                  key={event.id}
                >
                  <EventCard
                    key={index}
                    title={event.title}
                    description={event.description}
                    date={
                      typeof event.date === "string"
                        ? event.date
                        : new Date(event.date.seconds * 1000).toDateString()
                    }
                    author={event.author}
                    imageUrl={event.imageUrl}
                    isUpcoming={true}
                    registeredCount={event.registeredCount}
                    maxSeats={event.maxSeats}
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
      <div className="flex flex-wrap items-baseline gap-2 mb-5">
        <h1 className="text-white font-bold text-3xl leading-none">Past</h1>
        <h1 className="text-gray-500 font-bold text-3xl leading-none mx-2">
          Events
        </h1>
      </div>
      <h4 className="font-semibold text-white mb-9">
        Check out our past events below:
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-center md:justify-start pb-40">
        {pastEvents && pastEvents.length > 0 ? (
          pastEvents.map((event) => (
            <Link to={`/events/past/details/${event.id}`} key={event.id}>
              <EventCard
                title={event.title}
                description={event.description}
                date={
                  typeof event.date === "string"
                    ? event.date
                    : new Date(event.date.seconds * 1000).toDateString()
                }
                author={event.author}
                imageUrl={event.imageUrl}
                isUpcoming={false}
                registeredCount={event.registeredCount}
                maxSeats={event.maxSeats}
              />
            </Link>
          ))
        ) : (
          <EventCard isPlaceholder />
        )}
      </div>
    </div>
  );
}
