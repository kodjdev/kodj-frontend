import { useState } from "react";
import styled from "styled-components";
import { Link, NavLink as RouterNavLink } from "react-router-dom";
import kodjLogo from "@/static/assets/avatars/kodj_new.jpg";
import themeColors from "@/tools/themeColors";
import Button from "@/components/Button/Button";
import { HeaderProps } from "@/types";

type MobileMenuProps = {
  isOpen: boolean;
};

const HeaderOuterContainer = styled.header`
  padding: 1rem 0;
  position: sticky;
  top: 0;
  background-color: ${themeColors.colors.neutral.black || "#000"};
  color: ${themeColors.colors.neutral.white || "white"};
  width: 100%;
  min-width: 320px;
  z-index: 1000;
  overflow-x: hidden;
`;

const HeaderInnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  margin: 0 auto;
  width: 100%;
`;

const LogoContainer = styled.div`
  flex-shrink: 0;
`;

const Logo = styled.img`
  height: 28px;
  display: block;
`;

const HamburgerButton = styled.button`
  background: transparent;
  border: none;
  color: ${themeColors.colors.neutral.white};
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  z-index: 1001;
`;

const MobileMenu = styled.div<MobileMenuProps>`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background-color: ${themeColors.colors.neutral.black};
  display: flex;
  flex-direction: column;
  padding: 80px 20px 20px;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
`;

const MobileNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
`;

const MobileNavLink = styled(RouterNavLink)`
  color: ${themeColors.colors.neutral.white};
  text-decoration: none;
  font-size: 20px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &.active {
    color: ${themeColors.colors.primary.main};
    font-weight: bold;
  }
`;

const MobileAuthButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: auto;
`;

const LanguageSection = styled.div`
  margin-bottom: 24px;
`;

const LanguageTitle = styled.p`
  color: ${themeColors.colors.gray.main};
  font-size: 14px;
  margin-bottom: 12px;
`;

const LanguageOptions = styled.div`
  display: flex;
  gap: 12px;
`;

const LanguageButton = styled.button<{ isActive: boolean }>`
  background: ${({ isActive }) =>
    isActive ? themeColors.colors.primary.main : "transparent"};
  border: 1px solid
    ${({ isActive }) =>
      isActive
        ? themeColors.colors.primary.main
        : themeColors.colors.gray.line};
  border-radius: 4px;
  color: ${({ isActive }) =>
    isActive
      ? themeColors.colors.neutral.white
      : themeColors.colors.neutral.white};
  font-size: 16px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? themeColors.colors.primary.main : "rgba(255, 255, 255, 0.1)"};
  }
`;

/**
 * Mobile Header component
 *
 * Displays the header for mobile viewports with a hamburger menu
 * that reveals navigation links and authentication buttons when clicked.
 */

export default function HeaderMobile({
  handleLangChange,
  currentLang,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderOuterContainer>
      <HeaderInnerContainer>
        <LogoContainer>
          <Link to="/">
            <Logo src={kodjLogo} alt="KO'DJ" />
          </Link>
        </LogoContainer>

        <HamburgerButton onClick={toggleMenu}>
          {isMenuOpen ? "✕" : "☰"}
        </HamburgerButton>

        <MobileMenu isOpen={isMenuOpen}>
          <MobileNavigation>
            <MobileNavLink to="/about" onClick={() => setIsMenuOpen(false)}>
              About Us
            </MobileNavLink>
            <MobileNavLink to="/news" onClick={() => setIsMenuOpen(false)}>
              News
            </MobileNavLink>
            <MobileNavLink to="/events" onClick={() => setIsMenuOpen(false)}>
              Events
            </MobileNavLink>
          </MobileNavigation>

          <LanguageSection>
            <LanguageTitle>lang</LanguageTitle>
            <LanguageOptions>
              <LanguageButton
                isActive={currentLang === "en"}
                onClick={() => handleLangChange("en")}
              >
                eng
              </LanguageButton>
              <LanguageButton
                isActive={currentLang === "uz"}
                onClick={() => handleLangChange("uz")}
              >
                uz
              </LanguageButton>
            </LanguageOptions>
          </LanguageSection>

          <MobileAuthButtons>
            <Button
              asLink
              to="/login"
              variant="light"
              size="md"
              onClick={() => setIsMenuOpen(false)}
              style={{ width: "100%" }}
            >
              Login
            </Button>
          </MobileAuthButtons>
        </MobileMenu>
      </HeaderInnerContainer>
    </HeaderOuterContainer>
  );
}
