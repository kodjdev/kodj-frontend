import { HoverEffect } from "./ui/card-hover-effect";
import { FaRobot, FaLaptopCode, FaCode, FaBuilding, FaMobile, FaRocket } from "react-icons/fa6";

const projects = [
  {
    title: "AI & ML Events",
    description:
      "A platform for discovering and sharing AI and machine learning events in Uzbekistan and South Korea.",
    link: "https://aiandmlevents.uz",
    icon: <FaRobot className="w-6 h-6 text-blue-500" />
  },
  {
    title: "DevFest Seoul 2024",
    description:
      "A community-led developer conference hosted by KODJ community, featuring talks, workshops, and networking opportunities.",
    link: "https://devfest.gdg.uz",
    icon: <FaLaptopCode className="w-6 h-6 text-purple-500" />
  },
  {
    title: "Dev Hackathon",
    description:
      "A hackathon event for developers to collaborate and build projects using the latest technologies and tools.",
    link: "https://gdg.uz",
    icon: <FaCode className="w-6 h-6 text-green-500" />
  },
  {
    title: "IT Park Uzbekistan",
    description:
      "A technology park in Tashkent, Uzbekistan, providing infrastructure and support for startups and tech companies.",
    link: "https://itpark.uz",
    icon: <FaBuilding className="w-6 h-6 text-yellow-500" />
  },
  {
    title: "Mobile Development Meetup",
    description:
      "A community of uzbek mobile developers in South Korea, organizing meetups and events to share knowledge and network.",
    link: "https://kodj.dev",
    icon: <FaMobile className="w-6 h-6 text-red-500" />
  },
  {
    title: "Startup Grind",
    description:
      "A global community of entrepreneurs, hosting events and programs to help startups grow and succeed.",
    link: "https://startupgrind.uz",
    icon: <FaRocket className="w-6 h-6 text-orange-500" />
  },
]


export function CardHoverEffect() {
  return <HoverEffect items={projects} />;
}


