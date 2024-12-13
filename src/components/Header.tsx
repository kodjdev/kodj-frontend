import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/useAuth";
import { auth } from "../firebase/firebaseConfig";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { AiOutlineLogin } from "react-icons/ai";
import { BsFillPersonBadgeFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

const tabs = [
  { id: "about", label: "About Us", path: "/about" },
  { id: "news", label: "News", path: "/news" },
  { id: "events", label: "Events", path: "/events" },
  { id: "mypage", label: "My Page", path: "/mypage" },
  { id: "login", label: "Login", path: "/login" },
];

import FlipLogo from "./FlipLogo";

export default function Tabs() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    tabs.find((tab) => location.pathname.startsWith(tab.path))?.id || ""
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null); // Reference to the mobile menu
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { user } = useAuth();

  useEffect(() => {
    setActiveTab(
      tabs.find((tab) => location.pathname.startsWith(tab.path))?.id || ""
    );
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  //  we use toggle for control the state
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`flex items-center justify-between p-5 sticky top-0 z-50 transition-colors duration-100 ${
        isScrolled ? "bg-black shadow-lg" : "bg-transparent"
      }`}
    >
      <div>
        <FlipLogo />
      </div>
      {/* Bu yerda biz hide menu on small screens, show as flex on medium and larger screens  */}
      <div className="hidden md:flex space-x-1 mr-5">
        {tabs
          .filter((tab) => {
            if (tab.id === "mypage" && !user) return false;
            if (tab.id === "login" && user) return false;
            return true;
          })
          .map((tab) => (
            <Link to={tab.path} key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`relative rounded-full px-3 py-1.5 text-sm font-medium text-white outline-sky-400 transition focus-visible:outline-2 ${
                  activeTab === tab.id ? "text-black" : "text-white"
                }`}
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
                ) : tab.id === "mypage" && user ? (
                  <motion.span
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <BsFillPersonBadgeFill className="text-xl font-bold" />
                  </motion.span>
                ) : (
                  tab.label
                )}
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

      {/* mobile menu button */}
      <div className="md:hidden">
        <button
          ref={buttonRef}
          onClick={toggleMobileMenu}
          className="text-white focus:outline-none"
        >
          {/* {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />} */}
          {isMobileMenuOpen ? (
            <FiX className="text-black dark:text-white" size={24} />
          ) : (
            <FiMenu className="text-black dark:text-white" size={24} />
          )}
        </button>
      </div>

      {/* and we render the mobile  menu only when it's open */}
      {isMobileMenuOpen && (
        <div
          ref={menuRef}
          // className="absolute top-16 right-5 bg-black bg-opacity-90 rounded-lg p-5 flex flex-col space-y-4 md:hidden"
          className="absolute top-16 right-5 bg-black dark:bg-black bg-opacity-90 rounded-lg p-5 flex flex-col space-y-4 md:hidden"
        >
          {tabs
            .filter((tab) => {
              if (tab.id === "mypage" && !user) return false;
              if (tab.id === "login" && user) return false;
              return true;
            })
            .map((tab) => (
              <Link
                to={tab.path}
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileMenuOpen(false);
                }}
              >
                <button
                  className={`w-full text-left relative rounded-full px-3 py-1.5 text-sm font-medium outline-sky-400 transition focus-visible:outline-2 ${
                    activeTab === tab.id
                      ? "bg-gray-400 text-white dark:bg-black dark:text-white"
                      : "text-gray-300 dark:text-white-"
                  }`}
                  style={{
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {activeTab === tab.id && (
                    <motion.span
                      layoutId="bubble"
                      // className="absolute inset-0 z-10 bg-white mix-blend-difference"
                      className="absolute inset-0 z-10 bg-gray-300 dark:bg-black rounded-full hidden md:block"
                      style={{ borderRadius: 9999 }}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  {tab.id === "login" && !user ? (
                    <motion.span
                      whileHover={{ scale: 1.1, rotate: 15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <AiOutlineLogin className="text-xl font-bold" />
                    </motion.span>
                  ) : tab.id === "mypage" && user ? (
                    <motion.span
                      whileHover={{ scale: 1.1, rotate: 15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <BsFillPersonBadgeFill className="text-xl font-bold" />
                    </motion.span>
                  ) : (
                    tab.label
                  )}
                </button>
              </Link>
            ))}
          {user && (
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center space-x-1.5 bg-blue-600 hover:bg-red-600 hover:text-black rounded-full px-3 py-1.5 text-sm font-medium text-white "
            >
              <FiLogOut />
              {/* <span>Logout</span> */}
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
