import EventCard from "../../components/Event/EventContainer";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { pastEventsAtom, upcomingEventsAtom } from "@/atoms/events";
import { useEventFetcher } from "@/hooks/event/useEventFetch";
import { useRecoilValue } from "recoil";
import { Event } from "@/types";

export default function EventsList() {
  const { fetchEventsData, moveOldEvents } = useEventFetcher();

  // ** Read-Only** faqat (atomdan oqiymiz)
  const upcomingEvents = useRecoilValue(upcomingEventsAtom);
  const pastEvents = useRecoilValue(pastEventsAtom);

  const [loading, setLoading] = useState(true);

  // memozie qildik, chunki bir marta calucalte qilishimiz yetadi
  const shouldRunMoveOldEvents = useMemo(() => {
    const currTime = new Date();

    // this checks for the 10:00 pm time
    const isTenPmNow = currTime.getHours() === 22;

    if (!isTenPmNow) {
      return false;
    }
    const lastRunEventString = localStorage.getItem("moveOldEventsLastRun");

    if (!lastRunEventString) {
      // agar topilmasa demak hali run qilmadik, shuning uchun true
      return true;
    }

    const lastRun = new Date(Number(lastRunEventString));
    // if last run is today, we skip
    return lastRun.toDateString() === currTime.toDateString();
  }, []);

  useEffect(() => {
    let isMounted = true;
    const initializeData = async () => {
      try {
        await fetchEventsData();

        if (shouldRunMoveOldEvents) {
          await moveOldEvents();
          localStorage.setItem("moveOldEventsLastRun", Date.now().toString());
        }
      } catch (error) {
        console.log("Error initializing data: ", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeData();

    return () => {
      isMounted = false;
    };
  }, [fetchEventsData, moveOldEvents, shouldRunMoveOldEvents]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50 text-blue-600 text-md">
        <Spin tip="Wait a little bit" size="large"></Spin>
      </div>
    );
  }

  // 2 xil turdagi eventlarni render qilish uchun custom function
  const renderEventCard = (event: Event, isUpcoming: boolean) => (
    <Link
      to={`/events/${isUpcoming ? "upcoming" : "past"}/details/${event.id}`}
      key={event.id}
    >
      {" "}
      <EventCard
        title={event.title}
        description={event.description}
        date={
          typeof event.date === "string"
            ? event.date
            : event.date ? new Date(event.date.seconds * 1000).toDateString() : "Date not available"
        }
        author={event.author}
        imageUrl={event.imageUrl}
        isUpcoming={isUpcoming}
        registeredCount={event.registeredCount}
        maxSeats={event.maxSeats}
      />
    </Link>
  );

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 justify-center md:justify-start pb-40">
        {upcomingEvents && upcomingEvents.length > 0 ? (
          <>
            {upcomingEvents &&
              upcomingEvents.map((event) => renderEventCard(event, true))}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 justify-center md:justify-start pb-40">
        {pastEvents && pastEvents.length > 0 ? (
          pastEvents.map((event) => renderEventCard(event, false))
        ) : (
          <EventCard isPlaceholder />
        )}
      </div>
    </div>
  );
}
