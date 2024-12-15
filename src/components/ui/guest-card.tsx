import { motion } from "framer-motion";
import { Speaker } from "../../types";

export function SpeakerCard({
  name,
  position,
  speakerImg,
  linkedinUrl,
}: Speaker) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-transparent rounded-lg shadow-lg p-4 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300"
    >
      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-full">
        <div className="relative w-full h-0 pb-[100%]">
          <img
            src={speakerImg}
            alt={`${name}'s photo`}
            className="absolute inset-0 w-30 h-30 sm:w-30 sm:h-30 rounded-full object-cover"
          />
        </div>
      </a>
      <div className="flex items-center justify-between w-full space-x-0 mt-4"> 
        <h2 className="text-lg flex-start font-semibold text-white-800 text-left">
          {name}
        </h2>
      </div>
      <div className="flex-grow w-full">
      <p className="flex-start text-left w-full text-[14px] text-blue-400 mb-5">
        {/* <p className="flex-start text-left w-full text-sm text-blue-400 mb-5"> */}
          {position}
        </p>
      </div>
      <div className="flex flex-wrap gap-1 mt-auto">
      </div>
    </motion.div>
  );
}