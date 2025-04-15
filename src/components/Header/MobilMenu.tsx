import { AiOutlineLogin } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TFunction } from "i18next";
import { User } from "firebase/auth";
import { HeaderButton } from "@/components/Header/HeaderButton";
import { Button } from "../Button/Button";

export type MobileMenuProps = {
  tabs: { id: string; labelKey: string; path: string }[];
  t: TFunction;
  user: User | null;
  activeTab: string;
  setActiveTab: (id: string) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
  handleLogoutClick: () => void;
};

export function MobileMenu({
  tabs,
  t,
  user,
  activeTab,
  setActiveTab,
  setIsMobileMenuOpen,
  handleLogoutClick: triggerLogoutModal,
}: MobileMenuProps) {

  // we call this function to close the modal
  const handleLogoutClick = () => {
    triggerLogoutModal();
    setIsMobileMenuOpen(false);
  };
  return (
    <div className="inset-0 z-[9999] flex flex-col px-6">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-white outline-sky-400 transition focus-visible:outline-2 bg-gray-700 px-4 py-2"
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
            <div key={tab.id}>
              <Link
                to={tab.path}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileMenuOpen(false);
                }}
              >
                <HeaderButton
                  isActive={activeTab === tab.id}
                  className="text-white"
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
            </div>
          ))}
        {user && (
          <div className="flex justify-start">
            <Button
              size="sm"
              disabled={false}
              color="link"
              textColor="white"
              
              fullWidth={false}
              onClick={handleLogoutClick}
              className="text-white"
            >
              Sign out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
