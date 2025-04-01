import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/useAuth";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { HeaderContainer } from "@/components/Header/HeaderContainer";
import DesktopMenu from "@/components/Header/DesktopMenu";
import { MobileMenu } from "@/components/Header/MobilMenu";
import FlipLogo from "@/components/FlipLogo";
import { useLogout } from "../Modal/LogoutModal";

export default function Header() {
  const location = useLocation();
  const { i18n, t } = useTranslation();
  const { user, isLogin, loading } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const triggerLogoutModal = useLogout();

  const generateTabs = () => {
    const baseTabs = [
      { id: "about", labelKey: "header.aboutUs", path: "/about" },
      { id: "news", labelKey: "header.news", path: "/news" },
      { id: "events", labelKey: "header.events", path: "/events" },
      { id: "speakers", labelKey: "header.speakers", path: "/speakers" },
    ];

    isLogin
      ? baseTabs.push({
          id: "login",
          labelKey: "header.login",
          path: "/login",
        })
      : baseTabs.push({
          id: "mypage",
          labelKey: "header.myPage",
          path: "/mypage",
        });

    return baseTabs;
  };

  const [tabs, setTabs] = useState(generateTabs());
  const [activeTab, setActiveTab] = useState(() => {
    const match = tabs.find((tab) => location.pathname.startsWith(tab.path));
    return match?.id || "";
  });

  // dynamically change the tabs when the state changes
  useEffect(() => {
    const newTabs = generateTabs();
    setTabs(newTabs);

    // we update active tab based on current path
    const match = newTabs.find((tab) => location.pathname.startsWith(tab.path));
    if (match) {
      setActiveTab(match.id);
    }
  }, [isLogin, location.pathname]);

  // scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setLangMenuOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
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
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-sm font-medium text-white bg-gray-700 outline-sky-400 transition focus-visible:outline-2"
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
          handleLogoutClick={triggerLogoutModal}
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
          handleLogoutClick={triggerLogoutModal}
        />
      )}
    </>
  );
}
