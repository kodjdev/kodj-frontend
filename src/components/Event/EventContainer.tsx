import { Card, CardTitle, CardDescription, CardContent } from "./EventCard";
import { BiSolidCalendar, BiGroup } from "react-icons/bi";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { Image } from "antd";
import { EventCardProps } from "../../types";

export default function EventContainer({
  title,
  description,
  date,
  imageUrl,
  isPlaceholder,
  isUpcoming,
  registeredCount,
  maxSeats,
}: EventCardProps) {
  if (isPlaceholder) {
    return (
      <div
        // key={`placeholder-${index}`}
        className="bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex justify-center items-center cursor-pointer group"
      >
        <div className="text-center">
          <p className="text-lg font-bold text-gray-400 group-hover:hidden">
            <span className="font-white">
              Stay tuned for more events
              <FaPlus className="inline-block text-blue-500 mr-2 ml-2 " />
            </span>
          </p>
          <p className="text-lg font-bold text-blue-400 hidden group-hover:block">
            New events coming soon 🌱
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
      // className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden max-w-[90%] mx-auto sm:max-w-full"
      className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden max-w-full sm:max-w-full md:max-w-md lg:max-w-lg mx-auto"
    >
      <Card>
        <div className="w-full aspect-video overflow-hidden">
          <img
            width="100%"
            height="100%"
            src={imageUrl ?? ""}
            alt={title ?? "Image"}
            className="object-center"
            // preview={false}
            loading="lazy"
            onLoad={(e) => {
              (e.target as HTMLImageElement).classList.add('laoded')
            }}
            // className="object-cover w-full h-full"
          />
        </div>
        <CardContent className="p-4 sm:p-4 bg-neutral-900">
          <CardTitle className="text-lg sm:text-2xl font-semibold text-white">
            {title}
          </CardTitle>
          <p className="text-sm sm:text-base text-gray-400 overflow-hidden whitespace-nowrap text-ellipsis mt-2 text-left mb-3">
            {description}
          </p>
          <div className="flex items-center">
            <BiSolidCalendar className="inline-block text-white mr-2" />
            <CardDescription className="text-sm sm:text-md text-white text-left">
            {typeof date === 'string' ? date : date?.seconds?.toString()}
            </CardDescription>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BiGroup className="inline-block text-white mr-2" />
              <CardDescription className="text-sm sm:text-md text-white text-left">
                {/* {typeof date === 'string' ? date : date?.seconds?.toString()} */}
                <span className="mr-1">Registered:</span>
                <span className="text-white">
                  {registeredCount || 0}/{maxSeats ?? 0}
                </span>
              </CardDescription>
            </div>
            <div className="flex items-center">
              {isUpcoming && (
                <span className="text-sm font-medium px-2.5 py-1 bg-blue-600/10 text-blue-400 rounded-md hover:bg-blue-600/20 transition-all duration-200 cursor-default border border-blue-600/20">
                  # Free
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
