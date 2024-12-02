import { Card, CardTitle, CardDescription, CardContent, CardFooter } from "../../src/components/ui/card";
import { CiCalendarDate } from "react-icons/ci";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
// import { usePathname } from "next/navigation";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { useLocation } from "react-router-dom";

type EventCardProps = {
  title?: string;
  description?: string;
  date?: string;
  author?: string;
  imageUrl?: string;
  isPlaceholder?: boolean;
};

export default function EventCard({ title, description, date, author, imageUrl, isPlaceholder }: EventCardProps) {

  const location = useLocation();
  const pathname = location.pathname;

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
                <FaPlus className="inline-block text-blue-500 mr-2 ml-2 "/>
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
          transition: { duration: 0.3 }
        }}
        className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden max-w-[90%] mx-auto sm:max-w-full"
      >
        <Card>
          <div className="relative w-full h-48 sm:h-60">
            <img src={imageUrl ?? ""} alt={title ?? "Image"} className="rounded-t-lg" />
          </div>
          <CardContent className="p-4 sm:p-5">
            <CardTitle className="text-lg sm:text-xl font-semibold text-blue-600">{title}</CardTitle>
            <div className="flex items-center">
              <CiCalendarDate className="inline-block text-blue-600 mr-1" />
              <CardDescription className="text-sm text-gray-500 text-left">{date}</CardDescription>
            </div>
            <p className="text-sm sm:text-base text-gray-900 line-clamp-2 mt-2 text-left">{description}</p>
            <div className="mt-2 text-xs text-gray-700 text-left flex items-center">
              By: <p className="text-gray-800 font-bold ml-1">{author}</p>
            </div>
          </CardContent>
            { pathname.includes("events/past") ? (
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
                  <button className="text-sm text-blue-600 hover:underline">More details...</button>
                  <Button className="text-sm text-white bg-blue-700 border border-blue-700 px-3 py-1 rounded-2xl flex items-center hover:bg-white hover:text-blue-700 transition-colors duration-300 space-x-1">
                    <FaArrowUpRightFromSquare className="flex-none text-xs" />
                    <span>Register</span>
                  </Button>
                </CardFooter>
            )}
        </Card>
    </motion.div>
  );
}
