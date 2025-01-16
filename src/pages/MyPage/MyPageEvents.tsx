import { motion } from "framer-motion";
import { CardContent } from "../../components/Event/EventCard";
import { Event } from "../../types";

interface MyPageEventsProps {
  upcomingEvents: Event[];
  pastEvents: Event[];
  onCancelAttendance: (docId: string) => void;
}

export default function MyPageEvents({
  upcomingEvents,
  pastEvents,
  onCancelAttendance,
}: MyPageEventsProps) {
  return (
    <>
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
            {upcomingEvents.map((event) => {
              const imageUrl =
                Array.isArray(event.images) && event.images.length > 0
                  ? event.images[0]
                  : "/placeholder.jpg";

              return (
                <motion.div
                  key={event.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                >
                  <img
                    src={imageUrl}
                    alt={event.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {event.title}
                      </h3>
                      <p className="text-gray-400">
                        {event.date?.toString()}
                      </p>
                      <p className="text-gray-400">{event.location}</p>
                    </div>
                    <button
                      onClick={() => onCancelAttendance(event.docId as string)}
                      className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-full hover:bg-red-700 transition"
                    >
                      Cancel
                    </button>
                  </CardContent>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

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
            {pastEvents.map((event) => {
              const imageUrl = Array.isArray(event.imageUrl)
                ? event.imageUrl[0]
                : event.imageUrl || "/placeholder.jpg";

              return (
                <motion.div
                  key={event.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                >
                  <img
                    src={imageUrl}
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
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
