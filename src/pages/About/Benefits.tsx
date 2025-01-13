import { motion } from "framer-motion";
import { RefObject } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import {
  FaHandshake,
  FaLightbulb,
  FaNetworkWired,
  FaPeopleGroup,
  FaRocket,
  FaUsers,
} from "react-icons/fa6";
import { LuGoal } from "react-icons/lu";

const benefitsData = [
  {
    title: "Networking Opportunities",
    description:
      "Expand your professional network by connecting with like-minded individuals, industry experts, and potential collaborators.",
    icon: <FaUsers className="text-3xl text-blue-500" />,
    imageUrl: <FaNetworkWired className="text-3xl text-blue-500" />,
  },
  {
    title: "Expert Talks",
    description:
      "Learn directly from tech leaders and innovators as they share insights, trends, and practical knowledge and experience in the field.",
    icon: <FaChalkboardTeacher className="text-3xl text-green-500" />,
    imageUrl: <FaPeopleGroup className="text-3xl text-green-500" />,
  },
  {
    title: "Hands-on Workshops",
    description:
      "Participate in interactive workshops designed to provide practical, real-world experience and enhance your skills with hands-on learning.",
    icon: <FaNetworkWired className="text-3xl text-purple-500" />,
    imageUrl: <FaNetworkWired className="text-3xl text-purple-500" />,
  },
  {
    title: "Collaboration Opportunities",
    description:
      "Collaborate on innovative projects with a supportive and talented community of developers.",
    icon: <FaHandshake className="text-3xl text-red-500" />,
    imageUrl: <FaHandshake className="text-3xl text-red-500" />,
  },
  {
    title: "Inspiration and Innovation",
    description:
      "Discover new ideas, get inspired by success stories, and ignite your creativity to innovate.",
    icon: <FaLightbulb className="text-3xl text-yellow-500" />,
    imageUrl: <FaLightbulb className="text-3xl text-yellow-500" />,
  },
  {
    title: "Career Growth",
    description:
      "Boost your career by learning in-demand skills, finding mentorship opportunities, and staying ahead in your field.",
    icon: <FaRocket className="text-3xl text-pink-500" />,
    imageUrl: <FaRocket className="text-3xl text-pink-500" />,
  },
];

type BenefitsProps = {
  sectionRef: RefObject<HTMLDivElement>;
};

export function Benefits({ sectionRef }: BenefitsProps) {
  return (
    <>
      <div className="flex flex-col text-center mb-8">
        <h2 className="text-left text-2xl font-bold text-blue-400 mb-6">
          What are the Benefits of joining{" "}
          <span className="text-2xl font-bold text-blue-600 mb-6 bg-gray-200">
            &nbsp;KO&apos;DJ&nbsp;
          </span>
          ?
        </h2>
        <p className="text-left text-gray-400 text-lg">
          By joining KO&apos;DJ, you&apos;ll gain access to a wide range of
          benefits that can help you grow as a developer and advance your
          career. Whether you&apos;re looking to expand your network, learn new
          skills, or find inspiration, KO&apos;DJ has something to offer you,
          <p className="text-left text-blue-500 text-lg hover:text-gray-500">
            <LuGoal className="inline-block text-1xl mr-2 mt-1 mb-2" />
            Our events are designed to provide you with the tools, resources,
            and support you need to succeed in the tech industry.
          </p>
        </p>
      </div>

      <div
        ref={sectionRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {benefitsData.map((benefit, index) => (
          <motion.div
            key={index}
            className="benefit-card bg-gray-700 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center mb-4">
              {benefit.icon}
              <h3 className="text-xl font-semibold ml-3 text-gray-200">
                {benefit.title}
              </h3>
            </div>
            <p className="text-gray-400 mb-4">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
}
