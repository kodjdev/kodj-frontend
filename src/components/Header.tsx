import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/useAuth";
import { auth } from "../firebase/firebaseConfig";
import { FiLogOut, FiMenu, FiSettings, FiUser, FiX } from "react-icons/fi";
import { AiOutlineLogin } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

const tabs = [
  { id: "about", labelKey: "header.aboutUs", path: "/about" },
  { id: "news", labelKey: "header.news", path: "/news" },
  { id: "events", labelKey: "header.events", path: "/events" },
  { id: "mypage", labelKey: "header.myPage", path: "/mypage" },
  { id: "login", labelKey: "header.login", path: "/login" },
];

import FlipLogo from "./FlipLogo";
import Modal from "./ui/modal";
import { useTranslation } from "react-i18next";

export default function Tabs() {
  const location = useLocation();
  const { i18n, t } = useTranslation();

  const [activeTab, setActiveTab] = useState(
    tabs.find((tab) => location.pathname.startsWith(tab.path))?.id || ""
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const currentLanguage = i18n.language || "en";

  const profileMenuRef = useRef<HTMLDivElement>(null);
  // Reference to the mobile menu
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { user } = useAuth();

  useEffect(() => {
    setActiveTab(
      tabs.find((tab) => location.pathname.startsWith(tab.path))?.id || ""
    );
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutsideMenu = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutsideMyPage = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    // menu ni sortiga qarab event listener qo'shamiz
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutsideMenu);
    } else if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutsideMyPage);
    }

    // cleanup method ikkila event listenerlarni delte qilish uchun
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
      document.removeEventListener("mousedown", handleClickOutsideMyPage);
    };
  }, [isMobileMenuOpen, showProfileMenu]);

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
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const handleLogoutClick = async () => {
    setIsModalOpen(true);
  };

  //  we use toggle for control the state
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setLangMenuOpen(false);
  };

  return (
    <>
      {/* // mobile menu uchun  */}
      {isMobileMenuOpen ? (
        <div
          ref={menuRef}
          onClick={(e) => {
            if (e.target === menuRef.current) {
              setIsMobileMenuOpen(false);
            }
          }}
          // className="inset-0 z-[9999] bg-black bg-opacity-80 flex flex-col"
          // px-6 qo'shildi qaysiki 24 px ga tengdir for left and right padding
          className="inset-0 z-[9999] bg-black bg-opacity-80 flex flex-col px-6"
        >
          <div className="flex items-center justify-between px-6 py-4">
            <FlipLogo />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white focus:outline-none"
            >
              {/* <FiX size={24} /> */}
              &#x2715;
            </button>
          </div>
          <div className="flex flex-col space-y-4 p-5">
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
                        : "text-gray-300 dark:text-white"
                    }`}
                    style={{
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    {activeTab === tab.id && (
                      <motion.span
                        layoutId="bubble"
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
                        <BsPerson className="text-xl font-bold" />
                      </motion.span>
                    ) : (
                      t(tab.labelKey)
                    )}
                  </button>
                </Link>
              ))}
          </div>
        </div>
      ) : (
        <nav
          className={`px-6 md:px-[200px] flex items-center justify-between p-1 sticky top-0 z-50 transition-colors duration-100 ${
            isScrolled ? "bg-black shadow-lg" : "bg-transparent"
          }`}
        >
          <div className="flex items-center space-x-2">
            <div className="mr-auto">
              <FlipLogo />
            </div>
          </div>

          {/* mobile menu button */}
          <div className="md:hidden">
            <button
              ref={buttonRef}
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <FiX className="text-black dark:text-white" size={24} />
              ) : (
                <FiMenu className="text-black dark:text-white" size={24} />
              )}
            </button>
          </div>

          {/* desktop version */}
          <div className="hidden md:flex space-x-3 mr-5">
            {tabs
              .filter((tab) => {
                if (tab.id === "mypage" && !user) return false;
                if (tab.id === "login" && user) return false;
                return true;
              })
              .map((tab) => (
                <div key={tab.id} className="relative">
                  <Link to={tab.path}>
                    <button
                      onClick={(e) => {
                        if (tab.id === "mypage") {
                          e.preventDefault();
                          setShowProfileMenu(!showProfileMenu);
                        } else {
                          setActiveTab(tab.id);
                        }
                      }}
                      className={`relative rounded-full px-3 py-1.5 text-sm font-medium text-white outline-sky-400 transition focus-visible:outline-2 ${
                        activeTab === tab.id ? "text-black" : "text-white"
                      }`}
                      style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                      {activeTab === tab.id && (
                        <motion.span
                          layoutId="bubble"
                          className="absolute inset-0 z-10 bg-white mix-blend-difference"
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
                          {/* // desktop version */}
                          <BsPerson className="text-xl font-bold" />
                        </motion.span>
                      ) : (
                        t(tab.labelKey)
                      )}
                    </button>
                  </Link>

                  {/* Profile Dropdown Menu */}
                  {tab.id === "mypage" && showProfileMenu && (
                    <div
                      ref={profileMenuRef}
                      className="absolute right-0 mt-2 w-64 rounded-lg bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div className="p-4">
                        <div className="text-sm text-gray-300 border-b border-gray-700 pb-3">
                          Signed in as
                          <br />
                          <span className="font-medium text-white">
                            {user?.email}
                          </span>
                        </div>

                        <div className="py-2 mb-5">
                          <Link
                            to="/mypage"
                            className="flex items-center px-2 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                          >
                            <FiUser className="mr-3" />
                            My Page
                          </Link>
                          <Link
                            to="/settings"
                            className="flex items-center px-2 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                          >
                            <FiSettings className="mr-3" />
                            Profile Settings
                          </Link>
                        </div>

                        <div className="border-t border-gray-700 pt-2">
                          <button
                            onClick={handleLogoutClick}
                            className="flex w-full items-center px-3 py-2 text-sm bg-transparent hover:bg-gray-700 hover:text-white rounded-md"
                          >
                            <FiLogOut className="mr-3" />
                            Sign out
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            {/* Language Dropdown Toggle */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="bg-transparent text-white px-3 py-1.5 rounded-full focus:outline-none border border-blue-700"
              >
                {currentLanguage.toUpperCase()} <span className="ml-1">▼</span>
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                    onClick={() => handleLanguageChange("en")}
                  >
                    EN
                  </button>{" "}
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                    onClick={() => handleLanguageChange("uz")}
                  >
                    UZ
                  </button>
                </div>
              )}
            </div>
          </div>
          {isModalOpen && (
            <Modal onClose={() => setIsModalOpen(false)}>
              <div className="p-8 bg-gray-800">
                <h2 className="text-xl font-semibold text-white-400 mb-4">
                  Confirm Logout
                </h2>
                <p className="text-white mb-6">
                  Are you sure you want to log out?
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-transparent rounded-full text-blue-600 focus:outline-none focus:ring-0 transition-colors px-4 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-transparent rounded-full text-red-600 focus:outline-none focus:ring-0 transition-colors px-4 py-2"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </nav>
      )}
    </>
  );
}
