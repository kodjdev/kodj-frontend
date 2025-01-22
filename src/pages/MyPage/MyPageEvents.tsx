import { motion } from "framer-motion";
import { CardContent } from "../../components/Event/EventCard";
import { Event } from "@/atoms/events";
import { Button } from "@/components/Button/Button";
import theme from "@/tools/theme";

interface MyPageEventsProps {
  upcomingEvents: Event[];
  pastEvents: Event[];
  onCancelAttendance: (registrationId: string) => void;
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
              const imageUrl = Array.isArray(event.images) 
                ? event.images[0]
                : event.images || "/placeholder.jpg";

              return (
                <motion.div
                  key={event.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col"
                >
                  <img
                    src={imageUrl}
                    alt={event.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="flex flex-col justify-between p-4 h-full">
                    <div>
                      <h3 className="text-xl font-semibold text-white ">
                        {event.title}
                      </h3>
                      <div className="flex justify-between text-gray-400 text-sm">
                        <p>{event.date?.toString()}</p>
                      </div>
                      <div className="text-gray-400 text-sm">
                        <p>{event.location}</p>
                      </div>
                    </div>
                    <div className="mt-[-60px] flex justify-end">
                      {event.registrationId && (
                        <Button
                          onClick={() => {
                            console.log(
                              "Cancelling registration:",
                              event.registrationId
                            );
                            if (event.registrationId) {
                              onCancelAttendance(event.registrationId);
                            }
                          }}
                          size="sm"
                          color="red"
                          textColor={theme.white}
                          fullWidth={false}
                          radius="md"
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
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
                  <CardContent className="items-start space-y-2 p-4">
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
