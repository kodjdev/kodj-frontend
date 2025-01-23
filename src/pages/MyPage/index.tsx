import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Spin, message } from "antd";
import { EventDetails } from "../../types";

import MyPageProfile from "./MyPageProfile";
import MyPageEvents from "./MyPageEvents";
import { useRecoilState } from "recoil";
import { Event, upcomingEventsAtom } from "@/atoms/events";
import { pastEventsAtom } from "@/atoms/events";
import Calendar from "./Calendar";

export type Registration = {
  id: string;
  uid: string;
  eventDetails: EventDetails;
  eventId: string;
  createdAt: Timestamp;
};

const convertTimestampToDate = (
  timestamp: Timestamp | { seconds: number; nanoseconds?: number } | null
): Date => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  if (timestamp && typeof timestamp.seconds === "number") {
    return new Date(
      timestamp.seconds * 1000 + (timestamp.nanoseconds || 0) / 1_000_000
    );
  }
  return new Date();
};

const formatEventDate = (date: Date): string => {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default function MyPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [pastEvents, setPastEvents] = useRecoilState(pastEventsAtom);
  const [upcomingEvents, setUpcomingEvents] =
    useRecoilState(upcomingEventsAtom);

  const [fetchStatus, setFetchStatus] = useState({
    loading: true,
    error: null as string | null,
    dataFetched: false,
  });

  const [isMobileView, setIsMobileView] = useState(false);
  // If user not logged in, go to login
  if (!loading && !user) {
    navigate("/login");
  }

  useEffect(() => {
    const handleSizeChange = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    handleSizeChange();

    window.addEventListener("resize", handleSizeChange);

    // we remove the event listener
    return () => {
      window.removeEventListener("resize", handleSizeChange);
    };
  }, []);

  // Fetch events on mount
  useEffect(() => {
    const fetchEvents = async () => {
      if (!user) return;
      try {
        const regsQuery = query(
          collection(db, "registrations"),
          where("uid", "==", user.uid)
        );
        const snapshot = await getDocs(regsQuery);
        const registrations = snapshot.docs.map((doc) => ({
          id: doc.id,
          uid: doc.data().uid,
          eventDetails: doc.data().eventDetails,
          eventId: doc.data().eventId,
          createdAt: doc.data().createdAt,
        })) as Registration[];

        const upcoming: Event[] = [];
        const past: Event[] = [];

        await Promise.all(
          registrations.map(async (reg) => {
            const eventDate = convertTimestampToDate(reg.eventDetails.date);

            const eventDocRef = doc(db, "upcomingEvents", reg.eventId);
            const eventDocSnap = await getDoc(eventDocRef);
            const eventData = eventDocSnap.data();

            if (!eventData) return; // we skip if no event data
            // const eDate = new Date(
            //   reg.eventDetails.date.seconds * 1000 +
            //     reg.eventDetails.date.nanoseconds / 1_000_000
            // );

            const item: Event = {
              id: reg.eventId || "",
              title: reg.eventDetails.title,
              date: formatEventDate(eventDate),
              // date: eDate.toDateString(),
              location: reg.eventDetails.eventLocation,
              images: eventData?.images || "No img found",
              docId: reg.id,
              rawDate: eventDate,
              formattedDate: formatEventDate(eventDate),
              registrationId: reg.id, // we store the registration id
            };

            if (eventDate < new Date()) {
              past.push(item);
            } else {
              upcoming.push(item);
            }
          })
        );

        upcoming.sort(
          (a, b) =>
            (a.rawDate as Date).getTime() - (b.rawDate as Date).getTime()
        );
        past.sort(
          (a, b) =>
            (b.rawDate as Date).getTime() - (a.rawDate as Date).getTime()
        );

        setUpcomingEvents(upcoming);
        setPastEvents(past);
        setFetchStatus({
          loading: false,
          error: null,
          dataFetched: true,
        });
      } catch (err) {
        console.error("Error fetching events:", err);
        setFetchStatus({
          loading: false,
          error: null,
          dataFetched: true,
        });
      }
    };
    if (user) {
      fetchEvents();
    }
  }, [user, setUpcomingEvents, setPastEvents]);

  const createdDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime)
    : new Date();

  const handleCancelAttendance = async (registrationId: string) => {
    if (!user || !registrationId) return;

    try {
      // First verify the registration exists
      const registrationRef = doc(db, "registrations", registrationId);
      const registrationDoc = await getDoc(registrationRef);

      if (!registrationDoc.exists()) {
        console.error("Registration document not found");
        messageApi.error("Registration not found");
        return;
      }

      // Delete the registration
      await deleteDoc(registrationRef);

      // then we update local state
      setUpcomingEvents((prevEvents) => {
        const updatedEvents = prevEvents.filter(
          (event) => event.registrationId !== registrationId
        );
        // console.log("Updated events:", updatedEvents);
        return updatedEvents;
      });

      messageApi.success("Successfully cancelled registration");
    } catch (error) {
      console.error("Error cancelling registration:", error);
      messageApi.error("Failed to cancel registration. Please try again.");
    }
  };

  if (loading || !fetchStatus.dataFetched) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50 text-blue-600 text-md">
        <Spin tip="Wait a little bit" size="large"></Spin>
      </div>
    );
  }

  return (
    <>
      {contextHolder}
      <div className="container w-full h-full">
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-8">
          {/* // left side of the page */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <MyPageProfile
                user={user}
                // onLogoutClick={triggerLogoutModal}
                isMobileView={isMobileView}
                createdAt={createdDate}
              />
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Calendar
              </h2>
              {/* // here will add the calendar component */}
              <Calendar
                upcomingEvents={upcomingEvents}
                pastEvents={pastEvents}
              />
            </div>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <MyPageEvents
                upcomingEvents={upcomingEvents}
                pastEvents={pastEvents}
                onCancelAttendance={handleCancelAttendance}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
