import { useAuth } from "../../context/useAuth";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { CardContent } from "../../components/ui/card";
import { Event } from "../../types";
import { FiLogOut } from "react-icons/fi";
import { FaPersonRays } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate(); // Use useNavigate hook
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [fetching, setFetching] = useState(true);

  if (!loading && !user) {
    navigate("/login");
  }

  useEffect(() => {
    const fetchEvents = async () => {
      if (user) {
        try {
          // we fetch all registrations for the current user
          const registrationsQuery = query(
            collection(db, "registrations"),
            where("uid", "==", user.uid)
          );
          const registrationsSnapshot = await getDocs(registrationsQuery);
          const registrationsData = registrationsSnapshot.docs.map((doc) =>
            doc.data()
          );

          const pastEventsData: Event[] = [];
          const upcomingEventsData: Event[] = [];

          for (const registration of registrationsData) {
            const eventDetails = registration.eventDetails;
            const eventDate = new Date(eventDetails.date);
            const now = new Date();

            const event: Event = {
              id: registration.eventId || "",
              title: eventDetails.title,
              date: eventDate.toDateString(),
              location: eventDetails.location,
              imageUrl: eventDetails.imageUrl || "/pastEvents/past1.jpeg",
            };

            if (eventDate < now) {
              pastEventsData.push(event);
            } else {
              upcomingEventsData.push(event);
            }
          }

          setPastEvents(pastEventsData);
          setUpcomingEvents(upcomingEventsData);
          setFetching(false);
        } catch (error) {
          console.error("Error fetching events:", error);
          setFetching(false);
        }
      }
    };
    fetchEvents();
  }, [user]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  if (loading || fetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    // <div className="flex flex-col flex-grow">
    <div className="container mx-auto py-8 px-4 sm:px-8 flex flex-col flex-grow">
      <div className="flex justify-between items-center mb-8">
        {/* User info will go here */}
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-200">
            <FaPersonRays className="text-3xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{"User"}</h1>
            <p className="text-gray-400">{user?.email ?? "No Email found"}</p>
          </div>
        </div>
        <Button
          onClick={handleLogout}
          className="flex items-center space-x-1.5 bg-blue-600 hover:bg-red-600 hover:text-black rounded-full px-3 text-sm font-medium text-white"
        >
          <FiLogOut />
          <span>Logout</span>
        </Button>
      </div>

      {/* // upcoming events list */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4">
          Registered Upcoming Events
        </h2>
        {upcomingEvents.length === 0 ? (
          <p className="text-gray-400">
            You have not registered for any upcoming events.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={
                    (Array.isArray(event.imageUrl)
                      ? event.imageUrl[0]
                      : event.imageUrl) || "/placeholder.jpg"
                  }
                  alt={event.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardContent>
                  <h3 className="text-xl font-semibold text-white">
                    {event.title}
                  </h3>
                  <p className="text-gray-400">{event.date?.toString()}</p>
                  <p className="text-gray-400">{event.location}</p>
                </CardContent>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* // past events list */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-400 mb-4">
          Attended Past Events
        </h2>
        {pastEvents.length === 0 ? (
          <p className="text-gray-400">
            You have not attended any past events.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={
                    (Array.isArray(event.imageUrl)
                      ? event.imageUrl[0]
                      : event.imageUrl) || "/placeholder.jpg"
                  }
                  alt={event.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardContent>
                  <h3 className="text-xl font-semibold text-white">
                    {event.title}
                  </h3>
                  <p className="text-gray-400">{event.date?.toString()}</p>
                  <p className="text-gray-400">{event.location}</p>
                </CardContent>
              </motion.div>
            ))}
          </div>
        )}
      </section>
      {/* </div> */}
    </div>
  );
}
