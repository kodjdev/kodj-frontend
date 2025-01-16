import { useEffect, useRef, useState } from "react"
import { useAuth } from "@/context/useAuth"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"
import { HeaderContainer } from "@/components/Header/HeaderContainer"
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