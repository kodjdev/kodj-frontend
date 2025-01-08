// import { Dispatch, SetStateAction, RefObject } from "react";
// import { motion } from "framer-motion";
// import { AiOutlineLogin } from "react-icons/ai";
// import { BsPerson } from "react-icons/bs";
// import { FiLogOut, FiSettings, FiUser } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import { TFunction } from "i18next";
// import { User } from "firebase/auth";

// interface DesktopMenuProps {
//   tabs: { id: string; labelKey: string; path: string }[];
//   t: TFunction;
//   user: User | null;
//   activeTab: string;
//   setActiveTab: (tabId: string) => void;
//   showProfileMenu: boolean;
//   setShowProfileMenu: Dispatch<SetStateAction<boolean>>;
//   profileMenuRef: RefObject<HTMLDivElement>;
//   handleLogoutClick: () => void;
//   currentLanguage: string;
//   langMenuOpen: boolean;
//   setLangMenuOpen: Dispatch<SetStateAction<boolean>>;
//   handleLanguageChange: (lang: string) => void;
// }

// export default function DesktopMenu({
//   tabs,
//   t,
//   user,
//   activeTab,
//   setActiveTab,
//   showProfileMenu,
//   setShowProfileMenu,
//   profileMenuRef,
//   handleLogoutClick,
//   currentLanguage,
//   langMenuOpen,
//   setLangMenuOpen,
//   handleLanguageChange,
// }: DesktopMenuProps) {
//   return (
//     <div className="hidden md:flex space-x-3 mr-5">
//       {/* // buyerda biz tablarni mapping qilamiz va har bir tab uchun button yaratamiz */}
//       {tabs
//         .filter((tab) => {
//           if (tab.id === "mypage" && !user) return false;
//           if (tab.id === "login" && user) return false;
//           return true;
//         })
//         .map((tab) => (
//           <div key={tab.id} className="relative">
//             <Link to={tab.path}>
//               <button
//                 onClick={(e) => {
//                   if (tab.id === "mypage") {
//                     e.preventDefault();
//                     setShowProfileMenu(!showProfileMenu);
//                   } else {
//                     setActiveTab(tab.id);
//                   }
//                 }}
//                 className={`relative rounded-full px-3 py-1.5 text-sm font-medium text-white outline-sky-400 transition focus-visible:outline-2 ${
//                   activeTab === tab.id ? "text-black" : "text-white"
//                 }`}
//                 style={{ WebkitTapHighlightColor: "transparent" }}
//               >
//                 {activeTab === tab.id && (
//                   <motion.span
//                     layoutId="bubble"
//                     className="absolute inset-0 z-10 bg-white mix-blend-difference"
//                     style={{ borderRadius: 9999 }}
//                     transition={{
//                       type: "spring",
//                       bounce: 0.2,
//                       duration: 0.6,
//                     }}
//                   />
//                 )}

//                 {tab.id === "login" && !user ? (
//                   <motion.span
//                     whileHover={{ scale: 1.1, rotate: 15 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                   >
//                     <AiOutlineLogin className="text-xl font-bold" />
//                   </motion.span>
//                 ) : tab.id === "mypage" && user ? (
//                   <motion.span
//                     whileHover={{ scale: 1.1, rotate: 15 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                   >
//                     <BsPerson className="text-xl font-bold" />
//                   </motion.span>
//                 ) : (
//                   // buyerda esa tarjima qilamiz
//                   t(tab.labelKey, { defaultValue: tab.labelKey })
//                 )}
//               </button>
//             </Link>

//             {/* // profil uchun dropdown menu */}
//             {tab.id === "mypage" && showProfileMenu && (
//               <div
//                 ref={profileMenuRef}
//                 className="absolute right-0 mt-2 w-64 rounded-lg bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
//               >
//                 <div className="p-4">
//                   <div className="text-sm text-gray-300 border-b border-gray-700 pb-3">
//                     Signed in as
//                     <br />
//                     <span className="font-medium text-white">
//                       {user?.email}
//                     </span>
//                   </div>

//                   <div className="py-2 mb-5">
//                     <Link
//                       to="/mypage"
//                       className="flex items-center px-2 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
//                     >
//                       <FiUser className="mr-3" />
//                       My Page
//                     </Link>
//                     <Link
//                       to="/settings"
//                       className="flex items-center px-2 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
//                     >
//                       <FiSettings className="mr-3" />
//                       Profile Settings
//                     </Link>
//                   </div>

//                   <div className="border-t border-gray-700 pt-2">
//                     <button
//                       onClick={handleLogoutClick}
//                       className="flex w-full items-center px-3 py-2 text-sm bg-transparent hover:bg-gray-700 hover:text-white rounded-md"
//                     >
//                       <FiLogOut className="mr-3" />
//                       Sign out
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}

//       {/* til uchun dropdown menu */}
//       <div className="relative">
//         <button
//           onClick={() => setLangMenuOpen(!langMenuOpen)}
//           className="bg-transparent text-white px-3 py-1 rounded-full focus:outline-none border border-blue-700"
//         >
//           {currentLanguage.toUpperCase()} <span className="ml-1">▼</span>
//         </button>
//         {langMenuOpen && (
//           <div className="absolute right-0 mt-2 w-24 bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//             <button
//               className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
//               onClick={() => handleLanguageChange("en")}
//             >
//               en
//             </button>
//             <button
//               className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
//               onClick={() => handleLanguageChange("uz")}
//             >
//               uz
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { Dispatch, SetStateAction, RefObject } from "react";
import { motion } from "framer-motion";
import { AiOutlineLogin } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { Link } from "react-router-dom";
import { TFunction } from "i18next";
import { User } from "firebase/auth";
import { ProfileDropdown } from "@/components/Header/ProfileDropdown";
import { HeaderButton } from "@/atoms/header/HeaderButton";

interface DesktopMenuProps {
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
  handleLogoutClick,
  currentLanguage,
  langMenuOpen,
  setLangMenuOpen,
  handleLanguageChange,
}: DesktopMenuProps) {
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
                className="text-sm font-medium text-white outline-sky-400 transition focus-visible:outline-2"
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

            {tab.id === "mypage" && showProfileMenu && (
              <ProfileDropdown
                user={user}
                dropdownRef={profileMenuRef}
                onLogoutClick={handleLogoutClick}
              />
            )}
          </div>
        ))}

      {/* Language Dropdown */}
      <div className="relative">
        <button
          onClick={() => setLangMenuOpen(!langMenuOpen)}
          className="bg-transparent text-white px-3 py-1 rounded-full focus:outline-none border border-blue-700"
        >
          {currentLanguage.toUpperCase()} <span className="ml-1">▼</span>
        </button>
        {langMenuOpen && (
          <div className="absolute right-0 mt-2 w-24 bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <button
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
              onClick={() => handleLanguageChange("en")}
            >
              en
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
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
