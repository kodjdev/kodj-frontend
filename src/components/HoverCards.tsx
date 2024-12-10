import { HoverEffect } from "./ui/card-hover-effect";

export function CardHoverEffect() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "AI & ML Events",
    description:
      "A platform for discovering and sharing AI and machine learning events in Uzbekistan and South Korea.",
    link: "https://aiandmlevents.uz",
  },
  {
    title: "DevFest Seoul 2024",
    description:
      " A community-led developer conference hosted by KODJ community, featuring talks, workshops, and networking opportunities.",
    link: "https://devfest.gdg.uz",
  },
  {
    title: "Dev Hackathon",
    description:
      " A hackathon event for developers to collaborate and build projects using the latest technologies and tools.",
    link: "https://gdg.uz",
  },
  {
    title: "IT Park Uzbekistan",
    description:
      "A technology park in Tashkent, Uzbekistan, providing infrastructure and support for startups and tech companies.",
    link: "https://itpark.uz",
  },
  {
    title: "Mobile Development Meetup",
    description:
      "A community of uzbek mobile developers in South Korea , organizing meetups and events to share knowledge and network.",
    link: "https://kodj.dev",
  },
  {
    title: "Startup Grind",
    description:
      "A global community of entrepreneurs, hosting events and programs to help startups grow and succeed.",
    link: "https://startupgrind.uz",
  },
];
