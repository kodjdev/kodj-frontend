import { t } from "i18next";
import { HoverEffect } from "./ui/card-hover-effect";
import {
  FaRobot,
  FaLaptopCode,
  FaCode,
  FaBuilding,
  FaMobile,
  FaRocket,
} from "react-icons/fa6";

const projects = [
  {
    title: "affiliateCardsPage.projects.project1.title",
    description: "affiliateCardsPage.projects.project1.description",
    link: "https://aiandmlevents.uz",
    icon: <FaRobot className="w-6 h-6 text-blue-500" />,
  },
  {
    title: "affiliateCardsPage.projects.project2.title",
    description: "affiliateCardsPage.projects.project2.description",
    link: "https://devfest.gdg.uz",
    icon: <FaLaptopCode className="w-6 h-6 text-purple-500" />,
  },
  {
    title: "affiliateCardsPage.projects.project3.title",
    description: "affiliateCardsPage.projects.project3.description",
    link: "https://gdg.uz",
    icon: <FaCode className="w-6 h-6 text-green-500" />,
  },
  {
    title: "affiliateCardsPage.projects.project4.title",
    description: "affiliateCardsPage.projects.project4.description",
    link: "https://itpark.uz",
    icon: <FaBuilding className="w-6 h-6 text-yellow-500" />,
  },
  {
    title: "affiliateCardsPage.projects.project5.title",
    description: "affiliateCardsPage.projects.project5.description",
    link: "https://kodj.dev",
    icon: <FaMobile className="w-6 h-6 text-red-500" />,
  },
  {
    title: "affiliateCardsPage.projects.project6.title",
    description: "affiliateCardsPage.projects.project6.description",
    link: "https://startupgrind.uz",
    icon: <FaRocket className="w-6 h-6 text-orange-500" />,
  },
];

// "affiliateCardsPage": {
//   "headingTitle": "Come and see ",
//   "headingTitleGray": "what we have to offer",
//   "projects": {
//     "project1": {
//       "title": "AI & ML Events",
//       "description": "A platform for discovering and sharing AI and machine learning events in Uzbekistan and South Korea."
//     },
export function CardHoverEffect() {
  return (
    <>
      <h2 className="text-4xl font-bold text-white mb-[30px] mt-[90px]">
        {t("affiliateCardsPage.headingTitle")}{" "}
        <span className="text-neutral-500">
          {t("affiliateCardsPage.headingTitleGray")}
        </span>
      </h2>
      <HoverEffect items={projects} />;
    </>
  );
}
