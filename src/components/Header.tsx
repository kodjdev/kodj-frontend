import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedTitle from "./AnimatedTitle";
import { useAuth } from "../context/useAuth";
import { auth } from "../firebase/firebaseConfig";
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineLogin } from "react-icons/ai";
import { BsFillPersonBadgeFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

const tabs = [
  { id: "about", label: "About us", path: "/about" },
  { id: "pastEvents", label: "Past Events", path: "/events/past" },
  { id: "upcomingEvents", label: "Upcoming Events", path: "/events/upcoming" },
  { id: "organizers", label: "Organizers", path: "/organizers" },
  { id: "mypage", label: "My Page", path: "/mypage" },
  { id: "login", label: "Login", path: "/login" },
];

export default function Tabs() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(tabs.find((tab) => location.pathname.startsWith(tab.id))?.id || "");
  const [isScrolled, setIsScrolled] = useState(false);

  const {user} = useAuth();

  useEffect(() => {
    setActiveTab(
      tabs.find((tab) => location.pathname.startsWith(tab.path))?.id || ""
    );
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Optionally, redirect to the homepage after logout
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <div 
      className={`flex items-center justify-between p-5 sticky top-0 z-50 transition-colors duration-100 ${
        isScrolled ? "bg-black shadow-lg" : "bg-transparent"
      }`}
      >
      <div className="flex-1">
        <Link to="/">
          <AnimatedTitle />
        </Link>
      </div>
      <div className="flex space-x-1 mr-5">
        {tabs
          .filter((tab) => {
            if(tab.id === "mypage" && !user)  return false;
            if(tab.id === "login" && user)  return false;
            return true;
          })
          .map((tab) => (
          <Link to={tab.path} key={tab.id}>
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id ? "" : "text-balack"
              } relative rounded-full px-3 py-1.5 text-sm font-medium text-white outline-sky-400 transition focus-visible:outline-2`}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 z-10 bg-white mix-blend-difference"
                  style={{ borderRadius: 9999 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
               {tab.id === "login" && !user ? (
                <motion.span
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <AiOutlineLogin className="text-xl font-bold" />
                </motion.span>
              ) : (tab.id === "mypage" && user ? (
                <motion.span
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <BsFillPersonBadgeFill className="text-xl font-bold" />
                </motion.span>
              ) : (
                tab.label
              ))}
            </button>
          </Link>
        ))}
        {user && (
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 bg-blue-600 hover:bg-red-600 hover:text-black rounded-full px-3 py-1.5 text-sm font-medium text-white " 
          >
            <FiLogOut />
            {/* <span>Logout</span> */}
          </button>
        )}
      </div>
    </div>
  );
}
