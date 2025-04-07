import { motion } from "framer-motion";
import { FaPeopleGroup } from "react-icons/fa6";
import sardorImage from "@/static/assets/avatars/sardor.png"; 
import behzodImg from "@/static/assets/avatars/bekhzod.png";
import javokhirImg from "@/static/assets/avatars/javokhir.jpg";
import oybekImg from "@/static/assets/avatars/oybek.jpg";


const organizers = [
  {
    name: "Behzod Halil",
    title: "Founder & Organizer",
    description:
      "Dedicated to fostering a welcoming and inclusive environment ...",
    imageUrl: behzodImg,
    githubUrl: "https://github.com/behzodhalil",
    jobtags: "Android Developer",
  },
  {
    name: "Sardor Madaminov",
    title: "Co-Founder & Organizer",
    description:
      "Passionate about organizing events that bring people together ...",
    imageUrl: sardorImage,
    githubUrl: "https://github.com/Sardor-M",
    jobtags: "Software Developer",
  },
  {
    name: "Javokhir Khakimjonov",
    title: "Moderator & Organizer",
    description:
      "Ensuring smooth event operations and engaging discussions ...",
    imageUrl: javokhirImg,
    githubUrl: "https://kr.linkedin.com/in/jaykhakim/en",
    jobtags: "Software Developer",
  },
  {
    name: "Oybek Kholiqov",
    title: "UI/UX Designer",
    description:
      "Creating intuitive and engaging designs to enhance user experience ...",
    imageUrl: oybekImg,
    githubUrl: "https://www.linkedin.com/in/oybek-kholikov-b354b6258/",
    jobtags: "UI/UX Designer",
  },
];

export function Organizers() {
  return (
    <div className="max-w-7xl mx-auto p-4 pt-8">
      <div className="flex flex-col text-center mb-12">
        <h1 className="text-left text-4xl font-bold text-blue-400 mb-4">
          <FaPeopleGroup className="inline-block text-4xl mr-2 mb-2" />
          Event Organizers:
        </h1>
        <p className="text-left text-gray-400">
          Behind every successful event is a team of dedicated individuals. Get
          to know the people making it all happen.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {organizers.map((organizer, index) => (
          <a
            key={index}
            href={organizer.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-start h-full cursor-pointer group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col sm:flex-row items-start min-w-0">
              <div className="relative w-28 h-28 mr-4 rounded-full overflow-hidden bg-white flex-shrink-0 flex items-center justify-center">
                  <img
                    src={organizer.imageUrl}
                    alt={organizer.name}
                    width={116}
                    height={116}
                    className="rounded-full object-cover w-full h-full"

                  />
                </div>
                <div className="flex flex-col">
                  <h2
                    className="text-xl font-bold text-blue-400 text-left mb-2 whitespace-normal break-words overflow-hidden"
                    title={organizer.name}
                  >
                    {organizer.name}
                  </h2>
                  <h3 className="text-sm text-gray text-left font-bold">
                    {organizer.title}
                  </h3>
                  <span className="text-left text-[10px] text-gray-300 mt-4 px-2 py-1 rounded-full bg-gray-700 break-words w-fit">
                    👨🏻‍💻 {organizer.jobtags}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-400 text-left">
                  {organizer.description}
                </p>
              </div>
            </motion.div>
          </a>
        ))}

        <div className="bg-gray-700 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex justify-center items-center cursor-pointer group">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-400 group-hover:hidden">
              We hope to grow our community leaders soon 🌱
            </p>
            <p className="text-lg font-bold text-blue-400 hidden group-hover:block">
              Future Community Organizers 🌱
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
