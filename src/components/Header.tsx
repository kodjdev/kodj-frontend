import styled from "styled-components";
import { Link, NavLink as RouterNavLink } from "react-router-dom";
import kodjLogo from "@/static/assets/avatars/kodj_new.jpg";
import themeColors from "@/tools/themeColors";
import Button from "./Button/Button";

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
  max-width: ${themeColors.breakpoints.laptop || "1140px"};
  padding: 10px ${themeColors.spacing.md} 20px;
  margin: 0 auto;
  margin-bottom: -15px;
  width: 100%;

  @media (max-width: ${themeColors.breakpoints.mobile}) {
    padding: 10px 20px;
  }
`;

const LogoContainer = styled.div`
  flex-shrink: 0;
`;

const Logo = styled.img`
  height: 36px;
  display: block;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
  flex-basis: 0;
  flex-wrap: nowrap;
  margin-left: ${themeColors.spacing.xl };
  margin-right: ${themeColors.spacing.xl };
  padding: 0 ${themeColors.spacing.xl };
  gap: ${themeColors.spacing.xl };

  @media (max-width: ${themeColors.breakpoints.mobile || "768px"}) {
    display: none; // mobile uchun esa hamburger menyu qilishim kerak
  }
`;

const NavLink = styled(RouterNavLink)`
  color: ${themeColors.colors.neutral.white || "white"};
  text-decoration: none;
  font-size: ${themeColors.typography.body.medium.fontSize || 16}px;
  position: relative;
  padding-bottom: 6px;

  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${themeColors.colors.primary.main || "white"};
    transition: width 0.3s ease-in-out;
  }

  // we add  underline on hover or when the link is active
  &:hover:after,
  &.active:after {
    // react-router-dom adds the 'active' class
    width: 100%;
  }

  &.active {
    font-weight: "bold";
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${themeColors.spacing.md || "1rem"};
`;

/**
 * Header component - Organism
 *
 * Main navigation header for the application that displays the logo,
 * navigation links, and authentication controls, aligned with main content.
 *
 * @returns a styled header component.
 */

export default function Header() {
  return (
    <HeaderOuterContainer>
      {/* inner container content uchun tasir qiladi */}
      <HeaderInnerContainer>
        <LogoContainer>
          <Link to="/">
            <Logo src={kodjLogo} alt="KO'DJ" />
          </Link>
        </LogoContainer>

        <Navigation>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/news">News</NavLink>
          <NavLink to="/events">Events</NavLink>
        </Navigation>

        <AuthButtons>
          {/* <Button asLink to="/signup" variant="text" size="md">
            Sign up
          </Button> */}
          <Button asLink to="/login" variant="light" size="sm">
            Login
          </Button>
        </AuthButtons>
      </HeaderInnerContainer>
    </HeaderOuterContainer>
  );
}
