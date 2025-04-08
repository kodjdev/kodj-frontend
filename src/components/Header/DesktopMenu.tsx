import { Dispatch, SetStateAction, RefObject, useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlineLogin } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { Link } from "react-router-dom";
import { TFunction } from "i18next";
import { User } from "firebase/auth";
import { ProfileDropdown } from "@/components/Header/ProfileDropdown";
import { HeaderButton } from "@/components/Header/HeaderButton";

export type DesktopMenuProps = {
  tabs: { id: string; labelKey: string; path: string }[];
  t: TFunction;
  user: User | null;
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  showProfileMenu: boolean;
  setShowProfileMenu: Dispatch<SetStateAction<boolean>>;
  profileMenuRef: RefObject<HTMLDivElement>;
  handleLogoutClick: () => void;
  currentLanguage: string;
  langMenuOpen: boolean;
  setLangMenuOpen: Dispatch<SetStateAction<boolean>>;
  handleLanguageChange: (lang: string) => void;
}

export default function DesktopMenu({
  tabs,
  t,
  user,
  activeTab,
  setActiveTab,
  showProfileMenu,
  setShowProfileMenu,
  profileMenuRef,
  handleLogoutClick: triggerLogoutModal,
  currentLanguage,
  langMenuOpen,
  setLangMenuOpen,
  handleLanguageChange,
}: DesktopMenuProps) {
  // modal close handler outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showProfileMenu) {
        const target = event.target as Node;

        const isOutSideDropdown =
          profileMenuRef.current && !profileMenuRef.current.contains(target);
        const isOutsideButton =
          profileMenuRef.current && !profileMenuRef.current.contains(target);

        if (isOutSideDropdown && isOutsideButton) {
          setShowProfileMenu(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // clean qilamiz
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu, setShowProfileMenu, profileMenuRef]);

  return (
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
              <HeaderButton
                onClick={(e) => {
                  if (tab.id === "mypage") {
                    e.preventDefault();
                    setShowProfileMenu(!showProfileMenu);
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
                isActive={activeTab === tab.id}
                className="text-white"
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="bubble"
                    className="absolute inset-0 z-10 bg-white mix-blend-difference"
                    style={{  borderRadius: '8px'  }}
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
                  t(tab.labelKey, { defaultValue: tab.labelKey })
                )}
              </HeaderButton>
            </Link>

            {tab.id === "mypage" && showProfileMenu && (
              <div className="relative">
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowProfileMenu(false)}
                />
                <div className="relative z-50">
                  <ProfileDropdown
                    user={user}
                    dropdownRef={profileMenuRef}
                    onLogoutClick={triggerLogoutModal}
                  />
                </div>
              </div>
            )}
          </div>
        ))}

      {/* Language Dropdown */}
      <div className="relative">
        <button
          onClick={() => setLangMenuOpen(!langMenuOpen)}
          className="bg-gray-700 text-white px-3 py-1 rounded-xl focus:outline-none border border-gray-700"
        >
          {currentLanguage.toUpperCase()} <span className="ml-1">▼</span>
        </button>
        {langMenuOpen && (
          <div className="absolute right-0 mt-2 w-24 bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <button
              className="w-full text-left px-4 py-2 text-sm text-white bg-gray-800 hover:bg-gray-700"
              onClick={() => handleLanguageChange("en")}
            >
              en
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-white bg-gray-800 hover:bg-gray-700"
              onClick={() => handleLanguageChange("uz")}
            >
              uz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
