import { RefObject } from "react";
import { motion } from "framer-motion";
import { AiOutlineLogin } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { Link } from "react-router-dom";
import FlipLogo from "../FlipLogo";
import type { TFunction } from "i18next";
import { User } from "firebase/auth";

interface MobileMenuProps {
  tabs: { id: string; labelKey: string; path: string }[];
  t: TFunction;
  user: User | null;
  menuRef: RefObject<HTMLDivElement>;
  buttonRef?: RefObject<HTMLButtonElement>;
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function MobileMenu({
  tabs,
  t,
  user,
  menuRef,
  activeTab,
  setActiveTab,
  setIsMobileMenuOpen,
}: MobileMenuProps) {
  return (
    <div
      ref={menuRef}
      className="inset-0 z-[9999] bg-black bg-opacity-80 flex flex-col px-6"
      onClick={(e) => {
        // agar user tashqariga click qilsa menu yopiladi
        if (e.target === menuRef.current) {
          setIsMobileMenuOpen(false);
        }
      }}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <FlipLogo />
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-white focus:outline-none"
        >
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
                style={{ WebkitTapHighlightColor: "transparent" }}
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
                  // buyerda esa translation uchun fallback qilindi
                  t(tab.labelKey, { defaultValue: tab.labelKey })
                )}
              </button>
            </Link>
          ))}
      </div>
    </div>
  );
}
