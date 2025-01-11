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
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { Spin, message } from "antd";
import { Event, EventDetails } from "../../types";
import Modal from "../../components/ui/modal";

import MyPageProfile from "./MyPageProfile";
import MyPageEvents from "./MyPageEvents";

interface Registration {
  id: string;
  uid: string;
  eventDetails: EventDetails;
  eventId: string;
}

export default function MyPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [fetching, setFetching] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // If user not logged in, go to login
  if (!loading && !user) {
    navigate("/login");
  }
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
        })) as Registration[];

        const upcoming: Event[] = [];
        const past: Event[] = [];

        for (const reg of registrations) {
          const eDate = new Date(
            reg.eventDetails.date.seconds * 1000 +
              reg.eventDetails.date.nanoseconds / 1_000_000
          );
          const eventDocRef = doc(db, "upcomingEvents", reg.eventId);
          const eventDocSnap = await getDoc(eventDocRef);
          const eventData = eventDocSnap.data();

          const item: Event = {
            id: reg.eventId || "",
            title: reg.eventDetails.title,
            date: eDate.toDateString(),
            location: reg.eventDetails.eventLocation,
            images: eventData?.images || "No img found",
            docId: reg.id,
          };
          if (eDate < new Date()) past.push(item);
          else upcoming.push(item);
        }
        setUpcomingEvents(upcoming);
        setPastEvents(past);
        setFetching(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setFetching(false);
      }
    };
    fetchEvents();
  }, [user]);
  const handleCancelAttendance = async (docId: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "registrations", docId));
      setUpcomingEvents((prev) => prev.filter((e) => e.docId !== docId));
      messageApi.success("You successfully canceled registration.");
    } catch (error) {
      if (error instanceof FirebaseError) {
        messageApi.error("Failed to cancel attendance.");
      }
    }
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (err) {
      messageApi.error("Failed to log out.");
    }
  };
  if (loading || fetching) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50 text-blue-600 text-md">
        <Spin tip="Wait a little bit" size="large"></Spin>
      </div>
    );
  }

  return (
    <>
      {contextHolder}
      <div className="container mx-auto py-8 px-4 sm:px-8 flex flex-col flex-grow">
        <MyPageProfile user={user} onLogoutClick={handleLogoutClick} />
        <MyPageEvents
          upcomingEvents={upcomingEvents}
          pastEvents={pastEvents}
          onCancelAttendance={handleCancelAttendance}
        />
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-8 bg-gray-800">
            <h2 className="text-xl font-semibold text-white-400 mb-4">
              Confirm Logout
            </h2>
            <p className="text-white mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-transparent rounded-full text-blue-600 focus:outline-none focus:ring-0 transition-colors px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="bg-transparent rounded-full text-red-600 focus:outline-none focus:ring-0 transition-colors px-4 py-2"
              >
                Logout
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
