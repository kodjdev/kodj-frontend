import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../src/components/ui/card";
import { CiCalendarDate } from "react-icons/ci";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { Image } from "antd";
import { EventCardProps } from "../types";

export default function EventCard({
  title,
  description,
  date,
  imageUrl,
  isPlaceholder,
  isUpcoming
}: EventCardProps) {
  // const location = useLocation();
  // const pathname = location.pathname;

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
      className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
    >
      <Card className="border-none">
        {/* <div className="w-70 h-70 rounded-lg overflow-hidden justify-center"> */}
        <div className="w-full h-48 sm:h-64 md:h-72 overflow-hidden flex justify-center">
          <Image
            width={370}
            height={300}
            src={imageUrl ?? ""}
            alt={title ?? "Image"}
            className="object-center"
            // className="object-cover w-full h-full"
          />
        </div>
        <CardContent className="p-2 sm:p-4 bg-neutral-900">
          <CardTitle className="text-lg sm:text-2xl font-semibold text-white">
            {title}
          </CardTitle>
          <p className="text-sm sm:text-base text-gray-400 line-clamp-2 mt-2 text-left mb-3">
            {description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CiCalendarDate className="inline-block text-blue-600 mr-1" />
              <CardDescription className="text-sm sm:text-md text-blue-600 text-left">
                {date}
              </CardDescription>
            </div>
            <div className="flex items-center">
              {isUpcoming && (
              <span className="text-sm font-medium px-2.5 py-1 bg-blue-600/10 text-blue-400 rounded-full hover:bg-blue-600/20 transition-all duration-200 cursor-default border border-blue-600/20">
                # Free
              </span>
              )}
            </div>
          </div>
        </CardContent>
        {/* { pathname.includes("events/past") ? (
                <CardFooter className="px-5 flex justify-between text-left">
                    <div className="flex flex-wrap gap-1 mt-auto">
                      <span className="flex-start text-left w text-xs text-gray-400 mt-2 px-2 py-1 rounded-full bg-gray-200">
                        # past events
                      </span>
                    </div>
                   <Button className="text-sm text-white bg-blue-700 border border-blue-700 px-3 py-1 rounded-2xl flex items-center hover:bg-white hover:text-blue-700 transition-colors duration-300">
                    <AiOutlinePlus className="flex-none text-xs" />
                    <span>Details</span>
                  </Button>
                </CardFooter>
              ) : (
                <CardFooter className="px-5 flex justify-between text-left">
                    <button
                        className="text-sm text-blue-600 bg-gray-300 hover:bg-gray-100 px-3 py-1 rounded-full transition-colors duration-300"
                        title="More details about the organizer"
                    >
                        More details...
                    </button>
                    <Button className="text-sm text-white bg-blue-700 border border-blue-700 px-3 py-1 rounded-2xl flex items-center hover:bg-white hover:text-blue-700 transition-colors duration-300 space-x-1">
                        <FaArrowUpRightFromSquare className="flex-none text-xs" />
                        <span>Register</span>
                    </Button>
              </CardFooter>
            )} */}
      </Card>
    </motion.div>
  );
}
