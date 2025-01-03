import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaNetworkWired,
  FaHandshake,
  FaLightbulb,
  FaRocket,
} from "react-icons/fa";
import { LuGoal } from "react-icons/lu";
import AnimatedTitle from "./AnimatedTitle";
import { GoGoal } from "react-icons/go";
import sardorImage from "../assets/avatars/sardor.png";
import behzodImage from "../assets/avatars/bekhzod.png";
import { FaPeopleGroup } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
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

const organizers = [
  {
    name: "Behzod Halil",
    title: "Founder & Organizer",
    description:
      "Dedicated to fostering a welcoming and inclusive environment for all attendees, speakers, and sponsors. Building a community of learners and creators.",
    imageUrl: behzodImage,
    githubUrl: "https://github.com/behzodhalil",
    jobtags: "Andoroid Developer",
  },
  {
    name: "Sardor M",
    title: "Co-Founder & Organizer",
    description:
      "Passionate about organizing events that bring people together to share ideas and innovate, with a focus on building a strong community.",
    imageUrl: sardorImage,
    githubUrl: "https://github.com/Sardor-M",
    jobtags: "Software Developer",
  },
];

export default function BenefitsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".benefit-card");
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 p-10 text-gray-200 rounded-lg">
      <div className="container mx-auto py-10 px-6 max-w-6xl">
        {/* Section Title */}
        <div className="flex flex-col text-center mb-12">
          <div className="pb-5">
            <AnimatedTitle />
          </div>
          <h2 className=" text-left text-4xl font-bold text-blue-400 mb-6">
            Who is{" "}
            <span className="text-4xl font-bold text-blue-600 mb-6 bg-gray-200">
              &nbsp;KO'DJ&nbsp;
            </span>{" "}
            ?
          </h2>
          <p className=" text-left text-gray-400 text-lg">
            At KO&apos;DJ, we are passionate about creating a thriving developer
            community in Uzbekistan. Our events are designed to empower
            developers, inspire creativity, and foster collaboration. We believe
            in the power of community and the impact it can have on individual
            growth and success.
            <p className="text-left text-blue-500 text-lg hover:text-gray-500 mt-4">
              <LuGoal className="inline-block text-1xl mr-2 mt-1 mb-2" />
              We strongly believe that the best way to learn is by doing, and
              our events are designed to provide hands-on experience and
              practical knowledge that can be applied in real-world scenarios.
            </p>
          </p>
        </div>
        <div className="flex flex-col text-center mb-8">
          <h2 className=" text-left text-2xl font-bold text-blue-400 mb-6">
            What are the Benefits of joining{" "}
            <span className="text-2xl font-bold text-blue-600 mb-6 bg-gray-200">
              &nbsp;KO&apos;DJ&nbsp;
            </span>{" "}
            ?
          </h2>
          <p className=" text-left text-gray-400 text-lg">
            By joining KO&apos;DJ, you&apos;ll gain access to a wide range of
            benefits that can help you grow as a developer and advance your
            career. Whether you&apos;re looking to expand your network, learn
            new skills, or find inspiration, KO&apos;DJ has something to offer
            you,
            <p className="text-left text-blue-500 text-lg hover:text-gray-500">
              <LuGoal className="inline-block text-1xl mr-2 mt-1 mb-2" />
              Our events are designed to provide you with the tools, resources,
              and support you need to succeed in the tech industry.
            </p>
          </p>
        </div>

        {/* Benefits Grid */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((benefit, index) => (
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
              <div className="relative w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
                {/* <img
                src={benefit.imageUrl}
                alt={benefit.title}
                className="object-cover object-center h-10 w-10"
              /> */}
              </div>
            </motion.div>
          ))}
        </div>

        {/* mission Section */}
        <div className="mt-16 bg-gray-700 p-10 rounded-3xl text-gray-200">
          <h3 className="text-3xl font-bold text-blue-400 mb-4">
            Why Join Us?
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            At KO&apos;DJ, we believe in the power of collaboration and
            innovation. Our events are more than just meetups; they are
            platforms for transformative learning, meaningful connections, and
            groundbreaking ideas.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            By participating in KO&apos;DJ events, you&apos;re not just
            attending an event—you&apos;re becoming part of a movement to
            elevate Uzbekistan&apos;s tech community to new heights. Let’s
            create, learn, and grow together.
          </p>
        </div>
        {/* <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 p-8 text-gray-200 rounded-lg"> */}
        <div className="max-w-7xl mx-auto p-4 pt-8">
          <div className="flex flex-col text-center mb-12">
            <h1 className="text-left text-4xl font-bold text-blue-400 mb-4">
              <FaPeopleGroup className="inline-block text-4xl mr-2 mb-2" />
              Event Organizers:
            </h1>
            <p className="text-left text-gray-400">
              Behind every successful event is a team of dedicated individuals.
              Get to know the people making it all happen.
            </p>
          </div>
          {/* Organizers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {organizers.map((organizer, index) => (
              <a
                key={index}
                href={organizer.githubUrl} // we link to the organizer's github
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div
                  key={index}
                  className="bg-gray-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300  transition-shadow duration-300 flex flex-col items-start h-full cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row items-start">
                    <div className="relative w-28 h-28 mr-4 rounded-full overflow-hidden bg-white flex-shrink-0">
                      {/* <div className="relative w-28 h-28 mr-4 rounded-full overflow-hidden bg-white flex-shrink-0 sm:w-28 sm:h-28">  */}
                      <img
                        src={organizer.imageUrl}
                        alt={organizer.name}
                        // layout="fill"
                        width={116}
                        height={116}
                        // objectFit="cover" // we ensure the image scales properly
                        className="rounded-full" // we keep corners rounded for a clean look
                      />
                    </div>
                    <div className="flex flex-col">
                      <h2
                        className="text-xl font-bold text-blue-400 text-left mb-2 whitespace-nowrap truncate overflow-hidden"
                        title={organizer.name}
                      >
                        {organizer.name}
                      </h2>
                      <h3 className="text-sm text-gray text-left mb-2 font-bold">
                        {organizer.title}
                      </h3>
                      <div className="flex flex-wrap gap-1 mt-auto">
                        {/* {organizer.jobtags.map((jobag, index) => ( */}
                        <span
                          key={index}
                          className="text-left text-[10px] text-gray-300 mt-4 px-2 py-1 rounded-full bg-gray-700 break-words"
                        >
                          {" "}
                          👨🏻‍💻 {organizer.jobtags}
                        </span>
                        {/* ))} */}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-400 text-left overflow-hidden text-ellipsis">
                      {organizer.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
            {/* // empty placeholder grid */}
            {Array.from({ length: 3 - (organizers.length % 3) }).map(
              (_, index) => (
                <div
                  key={`placeholder-${index}`}
                  className="bg-gray-700 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex justify-center items-center cursor-pointer group"
                >
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-400 group-hover:hidden">
                      We hope to grow our community leaders soon 🌱
                    </p>
                    <p className="text-lg font-bold text-blue-400 hidden group-hover:block">
                      Future Community Organizers 🌱
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
          {/* Mission Section */}
          <div className="bg-gray-800 p-8 rounded-3xl shadow-lg mt-12">
            <h2 className="text-3xl font-bold text-blue-400 mb-4">
              <GoGoal className="inline-block text-3xl mr-2 mb-2" />
              Our Mission
            </h2>
            <p className="text-gray-400">
              Our mission is to create a platform for collaboration, learning,
              and inspiration. We believe in the power of community and
              innovation to drive positive change. Join us as we work together
              to make a difference.
            </p>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
