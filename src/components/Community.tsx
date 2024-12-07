import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FaUsers, FaChalkboardTeacher, FaNetworkWired, FaHandshake, FaLightbulb, FaRocket } from "react-icons/fa";
import { LuGoal } from "react-icons/lu";
import career from '../assets/icons/career.png';
import networking from '../assets/icons/networking.png';
import communication from '../assets/icons/communication.png';
import collaborate from '../assets/icons/collaborate.png';
import creativity from '../assets/icons/creativity.png';
import workshop from '../assets/icons/workshop.png';
import AnimatedTitle from "./AnimatedTitle";


gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    title: "Networking Opportunities",
    description: "Expand your professional network by connecting with like-minded individuals, industry experts, and potential collaborators.",
    icon: <FaUsers className="text-3xl text-blue-500" />,
    imageUrl: networking,
  },
  {
    title: "Expert Talks",
    description: "Learn directly from tech leaders and innovators as they share insights, trends, and practical knowledge and experience in the field.",
    icon: <FaChalkboardTeacher className="text-3xl text-green-500" />,
    imageUrl: communication,
  },
  {
    title: "Hands-on Workshops",
    description: "Participate in interactive workshops designed to provide practical, real-world experience and enhance your skills with hands-on learning.",
    icon: <FaNetworkWired className="text-3xl text-purple-500" />,
    imageUrl: workshop,
  },
  {
    title: "Collaboration Opportunities",
    description: "Collaborate on innovative projects with a supportive and talented community of developers.",
    icon: <FaHandshake className="text-3xl text-red-500" />,
    imageUrl: collaborate,
  },
  {
    title: "Inspiration and Innovation",
    description: "Discover new ideas, get inspired by success stories, and ignite your creativity to innovate.",
    icon: <FaLightbulb className="text-3xl text-yellow-500" />,
    imageUrl: creativity,
  },
  {
    title: "Career Growth",
    description: "Boost your career by learning in-demand skills, finding mentorship opportunities, and staying ahead in your field.",
    icon: <FaRocket className="text-3xl text-pink-500" />,
    imageUrl: career,
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
            Who is <span className="text-4xl font-bold text-blue-600 mb-6 bg-gray-200">&nbsp;KO'DJ&nbsp;</span> ?
          </h2>
          <p className=" text-left text-gray-400 text-lg">
            At KO&apos;DJ, we are passionate about creating a thriving developer community in Uzbekistan.
            Our events are designed to empower developers, inspire creativity, and foster collaboration.
            We believe in the power of community and the impact it can have on individual growth and success.
            <p className="text-left text-blue-500 text-lg hover:text-gray-500 mt-4"> 
                <LuGoal className="inline-block text-1xl mr-2 mt-1 mb-2" />
                We strongly believe that the best way to learn is by doing, and our events are designed to provide 
                hands-on experience and practical knowledge that can be applied in real-world scenarios. 
            </p>
          </p>
        </div>
        <div className="flex flex-col text-center mb-8">
            <h2 className=" text-left text-2xl font-bold text-blue-400 mb-6">
                What are the Benefits of joining  <span className="text-2xl font-bold text-blue-600 mb-6 bg-gray-200">&nbsp;KO&apos;DJ&nbsp;</span> ?
            </h2>
            <p className=" text-left text-gray-400 text-lg">
                By joining KO&apos;DJ, you&apos;ll gain access to a wide range of benefits that can help you grow as a developer and advance your career.
                Whether you&apos;re looking to expand your network, learn new skills, or find inspiration, KO&apos;DJ has something to offer you, 
                <p className="text-left text-blue-500 text-lg hover:text-gray-500"> 
                    <LuGoal className="inline-block text-1xl mr-2 mt-1 mb-2" />
                    Our events are designed to provide you with the tools, resources, and support you need to succeed in the tech industry.
                </p>
            </p>
        </div>

        {/* Benefits Grid */}
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="benefit-card bg-gray-700 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center mb-4">
                {benefit.icon}
                <h3 className="text-xl font-semibold ml-3 text-gray-200">{benefit.title}</h3>
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
            At KO&apos;DJ, we believe in the power of collaboration and innovation. Our events are more than just meetups; they are platforms for transformative learning, meaningful connections, and groundbreaking ideas.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            By participating in KO&apos;DJ events, you&apos;re not just attending an event—you&apos;re becoming part of a movement to elevate Uzbekistan&apos;s tech community to new heights. Let’s create, learn, and grow together.
          </p>
        </div>
      </div>
    </div>
  );
}
