import { useMediaQuery } from "react-responsive";
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";
import themeColors from "@/tools/themeColors";
import { useTranslation } from "react-i18next";
import { useState } from "react";

/**
 * Header Root Component
 *
 * Here we wrap the mobile and desktop headers.
 * This root components renders either the desktop or mobile
 * header based on the viewport width.
 */

export default function Header() {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { i18n, t } = useTranslation();

  const isMobile = useMediaQuery({
    query: `(max-width: ${themeColors.breakpoints.mobile})`,
  });

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setLangMenuOpen(false);
  };

  const toggleMenu = () => {
    setLangMenuOpen(!langMenuOpen);
  };

  return isMobile ? (
    <HeaderMobile
      handleLangChange={handleLanguageChange}
      currentLang={i18n.language}
      langMenuOpen={langMenuOpen}
      toggleLangMenu={toggleMenu}
    />
  ) : (
    <HeaderDesktop
      handleLangChange={handleLanguageChange}
      currentLang={i18n.language}
      langMenuOpen={langMenuOpen}
      toggleLangMenu={toggleMenu}
    />
  );
}
