// import { useEffect, useRef, useState } from "react";
// import { useAuth } from "../../context/useAuth";
// import { auth } from "../../firebase/firebaseConfig";
// import { useLocation } from "react-router-dom";

// const tabs = [
//   { id: "about", labelKey: "header.aboutUs", path: "/about" },
//   { id: "news", labelKey: "header.news", path: "/news" },
//   { id: "events", labelKey: "header.events", path: "/events" },
//   { id: "mypage", labelKey: "header.myPage", path: "/mypage" },
//   { id: "login", labelKey: "header.login", path: "/login" },
// ];

// import FlipLogo from "../FlipLogo";
// import Modal from "../ui/modal";
// import { useTranslation } from "react-i18next";
// import MobileMenu from "./MobilMenu";
// import DesktopMenu from "./DesktopMenu";
// import { FiMenu, FiX } from "react-icons/fi";

// export default function Tabs() {
//   const location = useLocation();
//   const { i18n, t } = useTranslation();

//   const [activeTab, setActiveTab] = useState(
//     tabs.find((tab) => location.pathname.startsWith(tab.path))?.id || ""
//   );
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [langMenuOpen, setLangMenuOpen] = useState(false);

//   const profileMenuRef = useRef<HTMLDivElement>(null);

//   // Reference to the mobile menu
//   const menuRef = useRef<HTMLDivElement>(null);
//   const buttonRef = useRef<HTMLButtonElement>(null);
//   // const langMenuRef = useRef<HTMLDivElement>(null);

//   const currentLanguage = i18n.language || "en";

//   const { user } = useAuth();

//   useEffect(() => {
//     setActiveTab(
//       tabs.find((tab) => location.pathname.startsWith(tab.path))?.id || ""
//     );
//   }, [location.pathname]);

//   useEffect(() => {
//     const handleClickOutsideMenu = (event: MouseEvent) => {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(event.target as Node) &&
//         buttonRef.current &&
//         !buttonRef.current.contains(event.target as Node)
//       ) {
//         setIsMobileMenuOpen(false);
//       }
//     };

//     const handleClickOutsideMyPage = (event: MouseEvent) => {
//       if (
//         profileMenuRef.current &&
//         !profileMenuRef.current.contains(event.target as Node)
//       ) {
//         setShowProfileMenu(false);
//       }
//     };

//     // menu ni sortiga qarab event listener qo'shamiz
//     if (isMobileMenuOpen) {
//       document.addEventListener("mousedown", handleClickOutsideMenu);
//     } else if (showProfileMenu) {
//       document.addEventListener("mousedown", handleClickOutsideMyPage);
//     }

//     // cleanup method ikkila event listenerlarni delte qilish uchun
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutsideMenu);
//       document.removeEventListener("mousedown", handleClickOutsideMyPage);
//     };
//   }, [isMobileMenuOpen, showProfileMenu]);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 0);
//     };
//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await auth.signOut();
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Error logging out:", error);
//       alert("Failed to log out. Please try again.");
//     }
//   };

//   const handleLogoutClick = async () => {
//     setIsModalOpen(true);
//   };

//   //  we use toggle for control the state
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const handleLanguageChange = (lang: string) => {
//     i18n.changeLanguage(lang);
//     setLangMenuOpen(false);
//   };

//   return (
//     <>
//       {/* // mobile menu uchun  */}
//       {isMobileMenuOpen ? (
//         <MobileMenu
//           tabs={tabs}
//           t={t}
//           user={user}
//           menuRef={menuRef}
//           buttonRef={buttonRef}
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//           setIsMobileMenuOpen={setIsMobileMenuOpen}
//         />
//       ) : (
//         <nav
//           className={`px-6 md:px-[200px] flex items-center justify-between p-1 sticky top-0 z-50 transition-colors duration-100 ${
//             isScrolled ? "bg-black shadow-lg" : "bg-transparent"
//           }`}
//         >
//           <div className="flex items-center space-x-2">
//             <div className="mr-auto">
//               <FlipLogo />
//             </div>
//           </div>

//           {/* mobile menu button */}
//           <div className="md:hidden">
//             <button
//               ref={buttonRef}
//               onClick={toggleMobileMenu}
//               className="text-white focus:outline-none"
//             >
//               {isMobileMenuOpen ? (
//                 <FiX className="text-black dark:text-white" size={24} />
//               ) : (
//                 <FiMenu className="text-black dark:text-white" size={24} />
//               )}
//             </button>
//             xw
//           </div>

//           {/* desktop version */}
//           <DesktopMenu
//             tabs={tabs}
//             t={t}
//             user={user}
//             activeTab={activeTab}
//             setActiveTab={setActiveTab}
//             showProfileMenu={showProfileMenu}
//             setShowProfileMenu={setShowProfileMenu}
//             profileMenuRef={profileMenuRef}
//             handleLogoutClick={handleLogoutClick}
//             currentLanguage={currentLanguage}
//             langMenuOpen={langMenuOpen}
//             setLangMenuOpen={setLangMenuOpen}
//             handleLanguageChange={handleLanguageChange}
//           />
//           {isModalOpen && (
//             <Modal onClose={() => setIsModalOpen(false)}>
//               <div className="p-8 bg-gray-800">
//                 <h2 className="text-xl font-semibold text-white-400 mb-4">
//                   Confirm Logout
//                 </h2>
//                 <p className="text-white mb-6">
//                   Are you sure you want to log out?
//                 </p>
//                 <div className="flex justify-end space-x-4">
//                   <button
//                     onClick={() => setIsModalOpen(false)}
//                     className="bg-transparent rounded-full text-blue-600 focus:outline-none focus:ring-0 transition-colors px-4 py-2"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleLogout}
//                     className="bg-transparent rounded-full text-red-600 focus:outline-none focus:ring-0 transition-colors px-4 py-2"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </Modal>
//           )}
//         </nav>
//       )}
//     </>
//   );
// }


import { useEffect, useRef, useState } from "react"
import { useAuth } from "@/context/useAuth"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"
import { HeaderContainer } from "@/atoms/header/HeaderContainer"
import DesktopMenu from "@/components/Header/DesktopMenu"
import { MobileMenu } from "@/components/Header/MobilMenu"
import FlipLogo from "@/components/FlipLogo" 
import Modal from "@/components/ui/modal"
import { auth } from "@/firebase/firebaseConfig"

const tabs = [
  { id: "about", labelKey: "header.aboutUs", path: "/about" },
  { id: "news", labelKey: "header.news", path: "/news" },
  { id: "events", labelKey: "header.events", path: "/events" },
  { id: "mypage", labelKey: "header.myPage", path: "/mypage" },
  { id: "login", labelKey: "header.login", path: "/login" },
]

export default function Header() {
  const location = useLocation()
  const { i18n, t } = useTranslation()
  const { user } = useAuth()

  const [activeTab, setActiveTab] = useState(() => {
    const match = tabs.find((tab) => location.pathname.startsWith(tab.path))
    return match?.id || ""
  })

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)

  const profileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setActiveTab(
      tabs.find((tab) => location.pathname.startsWith(tab.path))?.id || ""
    )
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = async () => {
    try {
      await auth.signOut()
      setIsModalOpen(false)
    } catch (error) {
      console.error("Error logging out:", error)
      alert("Failed to log out. Please try again.")
    }
  }

  const handleLogoutClick = () => {
    setIsModalOpen(true)
  }

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang)
    setLangMenuOpen(false)
  }

  return (
    <>
      <HeaderContainer
        className={isScrolled ? "bg-black shadow-lg" : "bg-transparent"}
      >
        <div className="flex items-center space-x-2">
          <div className="mr-auto">
            <FlipLogo />
          </div>
        </div>
        {/* // this is mobikle toogler  */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-white focus:outline-none"
          >
            ☰
          </button>
        </div>
        <DesktopMenu
          tabs={tabs}
          t={t}
          user={user}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showProfileMenu={showProfileMenu}
          setShowProfileMenu={setShowProfileMenu}
          profileMenuRef={profileMenuRef}
          handleLogoutClick={handleLogoutClick}
          currentLanguage={i18n.language || "en"}
          langMenuOpen={langMenuOpen}
          setLangMenuOpen={setLangMenuOpen}
          handleLanguageChange={handleLanguageChange}
        />
      </HeaderContainer>
      {isMobileMenuOpen && (
        <MobileMenu
          tabs={tabs}
          t={t}
          user={user}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      )}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-8 bg-gray-800">
            <h2 className="text-xl font-semibold text-white-400 mb-4">
              {t("logout.confirmTitle", { defaultValue: "Confirm Logout" })}
            </h2>
            <p className="text-white mb-6">
              {t("logout.confirmMessage", {
                defaultValue: "Are you sure you want to log out?",
              })}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-transparent rounded-full text-blue-600 focus:outline-none focus:ring-0 transition-colors px-4 py-2"
              >
                {t("common.cancel", { defaultValue: "Cancel" })}
              </button>
              <button
                onClick={handleLogout}
                className="bg-transparent rounded-full text-red-600 focus:outline-none focus:ring-0 transition-colors px-4 py-2"
              >
                {t("common.logout", { defaultValue: "Logout" })}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}