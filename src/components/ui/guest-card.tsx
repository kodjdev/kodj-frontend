import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { Speaker } from "../../types";

export function SpeakerCard({
  name,
  position,
  expertises,
  speakerImg,
  linekdinUrl,
}: Speaker) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center text-center border border-gray-200 hover:shadow-xl transition-all duration-300"
    >
      <img
        src={speakerImg}
        alt={`${name}'s photo`}
        width={250}
        height={250}
        className="rounded-lg mb-1"
      />
      <div className="flex items-center justify-between w-full">
        <h2 className="text-lg flex-start font-semibold text-gray-800 text-left">
          {name}
        </h2>
        {linekdinUrl && (
          <a
            href={linekdinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="m-2 text-blue-500 hover:text-blue-700"
          >
            <FaLinkedin className="text-xl" />
          </a>
        )}
      </div>
      <div className="flex-grow w-full">
        <p className="flex-start text-left w-full text-sm text-gray-500 mb-5">
          {position}
        </p>
      </div>
      <div className="flex flex-wrap gap-1 mt-auto">
        {expertises.map((expertise, index) => (
          <span
            key={index}
            className="flex-start text-left w text-xs text-gray-400 mt-2 px-2 py-1 rounded-full bg-gray-100"
          >
            {expertise}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
