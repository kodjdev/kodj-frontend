import { pastEventsAtom, upcomingEventsAtom } from "@/atoms/events";
import { db, storage } from "@/firebase/firebaseConfig";
import { EventForServer } from "@/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

export function useEventFetcher() {
  const setUpcomingEvents = useSetRecoilState(upcomingEventsAtom);
  const setPastEvents = useSetRecoilState(pastEventsAtom);

  const fetchEventsData = useCallback(async () => {
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

      filteredUpcomingEvents.forEach((event) => {
        if (!event.rawDate || !(event.rawDate instanceof Date)) {
          event.rawDate = event.date.toDate();
        }
      });

      filteredPastEvents.forEach((event) => {
        if (!event.rawDate || !(event.rawDate instanceof Date)) {
          event.rawDate = event.date.toDate();
        }
      });

      filteredUpcomingEvents.sort(
        (a, b) => (a.rawDate as Date).getTime() - (b.rawDate as Date).getTime()
      );
      filteredPastEvents.sort(
        (a, b) => (b.rawDate as Date).getTime() - (a.rawDate as Date).getTime()
      );

      setUpcomingEvents(filteredUpcomingEvents);
      setPastEvents(filteredPastEvents);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching events data: ", error);
    }
  }, [setUpcomingEvents, setPastEvents]);

  const moveOldEvents = useCallback(async () => {
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
        await fetchEventsData();
      }
    } catch (error) {
      console.error("Error moving events:", error);
    }
  }, [fetchEventsData]);

  return { fetchEventsData, moveOldEvents };
}
