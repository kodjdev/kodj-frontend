import { AiOutlineLogin } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TFunction } from "i18next";
import { User } from "firebase/auth";
import { HeaderButton } from "@/components/Header/HeaderButton";

type MobileMenuProps = {
  tabs: { id: string; labelKey: string; path: string }[];
  t: TFunction;
  user: User | null;
  activeTab: string;
  setActiveTab: (id: string) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
};

export function MobileMenu({
  tabs,
  t,
  user,
  activeTab,
  setActiveTab,
  setIsMobileMenuOpen,
}: MobileMenuProps) {
  return (
    <div className="inset-0 z-[9999] bg-black bg-opacity-80 flex flex-col px-6">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-sm font-medium text-gray-900 dark:text-white outline-sky-400 transition focus-visible:outline-2"
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
              <HeaderButton
                isActive={activeTab === tab.id}
                // active bulganda backgroudni oq qilib textni qora qilamiz
                // className="relative rounded-full px-3 py-1.5 text-sm font-medium text-white outline-sky-400 transition focus-visible:outline-2"
                className="text-sm font-medium text-gray-900 dark:text-white outline-sky-400 transition focus-visible:outline-2"

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
                    <BsPerson className="text-xl font-bold" />
                  </motion.span>
                ) : (
                  t(tab.labelKey, { defaultValue: tab.labelKey })
                )}
              </HeaderButton>
            </Link>
          ))}
      </div>
    </div>
  );
}
