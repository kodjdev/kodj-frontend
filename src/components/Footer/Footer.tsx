import styled from "styled-components";
import themeColor from "@/tools/themeColors";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa6";

const FooterContainer = styled.footer`
  background-color: ${themeColor.colors.gray.dark};
  color: ${themeColor.colors.neutral.white};
  padding: ${themeColor.spacing.lg} ${themeColor.spacing.xl};
  padding-bottom: ${themeColor.spacing.xxxl};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-shrink: 0;
`;

const CopyrightText = styled.p`
  margin-top: 35px;
  font-size: ${themeColor.typography.body.small.fontSize}px;
  margin-bottom: ${themeColor.spacing.md};
`;

const BrandText = styled.span`
  font-weight: 700;
  color: ${themeColor.colors.primary.main};
`;

const PolicyLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${themeColor.spacing.lg};
`;

const PolicyLink = styled.a`
  color: ${themeColor.colors.neutral.white};
  text-decoration: none;
  font-size: ${themeColor.typography.body.xsmall.fontSize}px;
  transition: color ${themeColor.animation.duration.fast};

  &:hover {
    color: ${themeColor.colors.primary.main};
    text-decoration: underline;
  }
`;

const Separator = styled.span`
  margin: 0 ${themeColor.spacing.xs};
  color: ${themeColor.colors.gray.main};
`;

const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${themeColor.spacing.md};
`;

const SocialLink = styled.a`
  color: ${themeColor.colors.neutral.white};
  font-size: 24px;
  transition: color ${themeColor.animation.duration.fast};

  &:hover {
    color: ${themeColor.colors.primary.main};
  }

  & > svg {
    width: 24px;
    height: 24px;
  }
`;

/**
 * Footer component - A Part of the Layout
 *
 * The main footer component that displays copyright information,
 * policy links, and social media icons.
 *
 * @returns A styled footer with copyright text and social links
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <CopyrightText>
        &copy; {currentYear} <BrandText>KO'DJ</BrandText> Developer Community.
        All rights reserved.
      </CopyrightText>

      <PolicyLinks>
        <PolicyLink href="/terms">Terms of Service</PolicyLink>
        <Separator>|</Separator>
        <PolicyLink href="/privacy">Privacy Policy</PolicyLink>
      </PolicyLinks>

      <SocialIcons>
        <SocialLink
          href="https://t.me/+0fApPXUN5WNjNjg9"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
        >
          <FaTelegram />
        </SocialLink>

        <SocialLink
          href="https://twitter.com/kodjdev"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <FaTwitter />
        </SocialLink>

        <SocialLink
          href="https://www.instagram.com/kodj_uz/?igsh=MWd0N3I4dTlsemQzcQ%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram />
        </SocialLink>

        <SocialLink
          href="https://www.linkedin.com/company/ko-dj/about"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </SocialLink>

        <SocialLink
          href="https://github.com/kodjdev"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub />
        </SocialLink>
      </SocialIcons>
    </FooterContainer>
  );
}
