import { pastEventsAtom, upcomingEventsAtom } from "@/atoms/events";
import { db, storage } from "@/firebase/firebaseConfig";
import { EventForServer } from "@/types";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
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

      const limitedUpcomingEventCollectionRef = query(upcomingEventCollectionRef, limit(10));
      const limitedPastEventCollectionRef = query(pastEventCollectionRef, limit(10));

      // parallel tarzda 2 ta endpointga fetch call qilamiz
      const [upcomingEventSnapshot, pastEventSnapshot] = await Promise.all([
        getDocs(limitedUpcomingEventCollectionRef),
        getDocs(limitedPastEventCollectionRef),
      ]);

      if (upcomingEventSnapshot.empty || pastEventSnapshot.empty) {
        console.log("No data found in the colleection.");
      }

      const upcomingEventsData = upcomingEventSnapshot.docs.map((doc) => {
        const eventData = doc.data() as EventForServer;
        eventData.id = doc.id;

        eventData.imageUrl = "";
        eventData.registeredCount = 0;

        if(!eventData.rawDate || !(eventData.rawDate instanceof Date)){
          eventData.rawDate = eventData.date.toDate();
        }

        return eventData;
      });

      const pastEventsData = pastEventSnapshot.docs.map((doc) => {
        const eventData = doc.data() as EventForServer;
        eventData.id = doc.id;

        eventData.imageUrl = "";
        eventData.registeredCount = 0;

        if(!eventData.rawDate || !(eventData.rawDate instanceof Date)){
          eventData.rawDate = eventData.date.toDate();
        }

        return eventData;
      });

     // sort qilamiz eventlarni oldinroq
     const sortedUpcomingEvents= [...upcomingEventsData].sort(
        (a, b) => (a.rawDate as Date).getTime() - (b.rawDate as Date).getTime()
      );
      const sortedPastEventsData = [...pastEventsData].sort(
        (a, b) => (b.rawDate as Date).getTime() - (a.rawDate as Date).getTime()
      );

      setUpcomingEvents(sortedUpcomingEvents);
      setPastEvents(sortedPastEventsData);

      // qoshimcha malumotlarni backgrounda fetch qilamiz
      const enhanceEvent = async (eventData: EventForServer) => {
        if (!eventData.images?.length) return eventData;

        try {
          // parallel tarzda 2 ta fetch call qilamiz
          const [registrationSnapshot, imageUrl] = await Promise.all([
            // fetch qilamiz registrationlarni
            getDocs(query(
              collection(db, "registrations"),
              where("eventId", "==", eventData.id)
            )),
            
            // image urlni fetch qilamiz
            eventData.images[0] ? getDownloadURL(ref(storage, eventData.images[0])) : Promise.resolve("")
          ]);
          
          return {
            ...eventData,
            registeredCount: registrationSnapshot.size,
            imageUrl: imageUrl
          };
        } catch (error) {
          console.error(`Error enhancing event ${eventData.id}:`, error);
          return eventData;
        }
      };

      // upcoming eventlarni batch qilib fetch qilamiz
      const enhanceEventsBatch = async (events: EventForServer[], isUpcoming: boolean, batchSize = 2) => {
        const result = [...events];
        for (let i = 0; i < events.length; i += batchSize) {
          const batch = events.slice(i, i + batchSize);
          const enhancedBatch = await Promise.all(batch.map(enhanceEvent));
          
          // har bir eventni enhanced versiyasini result arrayiga joylaymiz
          enhancedBatch.forEach((enhancedEvent, index) => {
            result[i + index] = enhancedEvent;
          });

          if(isUpcoming){
            setUpcomingEvents([...result]);
          } else {
            setPastEvents([...result]);
          }
        }
        return result;
      };

      // backgroundda eventlarni enahnce qilamiz
      Promise.all([
       enhanceEventsBatch(sortedUpcomingEvents, true),
       enhanceEventsBatch(sortedPastEventsData, false)
      ]).then(([enhancedUpcoming, enhancedPast]) => {
        setUpcomingEvents(enhancedUpcoming);
        setPastEvents(enhancedPast);
      })

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
