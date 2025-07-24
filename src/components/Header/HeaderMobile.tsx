import { useState } from 'react';
import styled from 'styled-components';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import themeColors from '@/tools/themeColors';
import Button from '@/components/Button/Button';
import { HeaderProps } from '@/types';
import kodjLogo from '@/static/icons/kodj_new.jpg';
import useAuth from '@/context/useAuth';
import { User2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type MobileMenuProps = {
    isOpen: boolean;
};

const HeaderOuterContainer = styled.header`
    padding: 1rem 0;
    position: sticky;
    top: 0;
    background-color: ${themeColors.colors.neutral.black || '#000'};
    color: ${themeColors.colors.neutral.white || 'white'};
    width: 100%;
    min-width: 320px;
    z-index: 1001;
    overflow-x: hidden;
`;

const HeaderInnerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px ${themeColors.spacing.md || '16px'};
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding-left: ${themeColors.spacing.lg || '16px'};
        padding-right: ${themeColors.spacing.lg || '16px'};
    }
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
    z-index: 1002;
`;

const MobileMenuOverlay = styled.div<MobileMenuProps>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    z-index: 999;
`;

const MobileMenu = styled.div<MobileMenuProps>`
    position: fixed;
    top: 0;
    right: 0;
    width: 90%;
    height: 60vh;
    background-color: ${themeColors.colors.neutral.black};
    display: flex;
    flex-direction: column;
    padding: 60px 20px 20px;
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
    border-bottom: 0.5px solid ${themeColors.cardBorder.color};
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
`;

const MobileNavigation = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 40px;
    flex-shrink: 0;
`;

const MobileNavLink = styled(RouterNavLink)`
    color: ${themeColors.colors.neutral.white};
    text-decoration: none;
    font-size: 18px;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    gap: 8px;

    &.active {
        color: ${themeColors.colors.primary.main};
        font-weight: bold;
    }

    &:hover {
        color: ${themeColors.colors.primary.main};
        transition: color 0.2s ease;
    }

    .beta-badge {
        background-color: ${themeColors.colors.status.beta.main};
        color: ${themeColors.colors.neutral.black};
        font-size: 9px;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 4px;
        border: 0.5px solid ${themeColors.colors.status.beta.main};
        white-space: nowrap;
        flex-shrink: 0;
    }
`;

const BottomSection = styled.div`
    margin-top: 0;
    margin-bottom: 0;
    padding-bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 16px;
`;

const LanguageSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex-shrink: 0;
`;

const LanguageTitle = styled.p`
    color: ${themeColors.colors.gray.main};
    font-size: 14px;
    margin: 0;
`;

const LanguageToggle = styled.div`
    position: relative;
    width: fit-content;
`;

const LanguageButton = styled.button`
    background: transparent;
    border: 1px solid ${themeColors.colors.primary.main};
    border-radius: 50px;
    color: ${themeColors.colors.neutral.white};
    font-size: 14px;
    padding: 8px 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-width: 100px;
    transition: all 0.2s ease;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

const LanguageDropdown = styled.div<{ isOpen: boolean }>`
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    width: 100%;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    background-color: ${themeColors.colors.neutral.black};
    border: 1px solid ${themeColors.colors.primary.main};
    border-radius: 15px;
    overflow: hidden;
    z-index: 1001;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const LanguageOption = styled.button<{ isActive: boolean }>`
    width: 100%;
    background: transparent;
    border: none;
    color: ${({ isActive }) => (isActive ? themeColors.colors.primary.main : themeColors.colors.neutral.white)};
    font-size: 14px;
    padding: 12px 16px;
    cursor: pointer;
    text-align: center;
    font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
    transition: background-color 0.2s ease;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    &:not(:last-child) {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
`;

const AuthSection = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-shrink: 0;
`;

const UserAvatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${themeColors.colors.gray.main};
    border: 2px solid ${themeColors.colors.primary.main};
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.05);
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const StyledLoginButton = styled(Button)`
    width: 100%;
    max-width: 120px;
`;

/**
 * Mobile Header component
 * @param handleLangChange - Callback function to handle language changes
 * @param currentLang - Current active language code
 */
export default function HeaderMobile({
    handleLangChange,
    currentLang,
    isAuthenticated,
    langMenuRef,
    langMenuOpen,
    toggleLangMenu,
}: HeaderProps) {
    const { t } = useTranslation('home');

    const { user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleLanguageSelect = (lang: string) => {
        handleLangChange(lang);
    };

    return (
        <HeaderOuterContainer>
            <HeaderInnerContainer>
                <LogoContainer>
                    <Link to="/">
                        <Logo src={kodjLogo} alt="KO'DJ" />
                    </Link>
                </LogoContainer>

                <HamburgerButton onClick={toggleMenu}>{isMenuOpen ? '✕' : '☰'}</HamburgerButton>

                <MobileMenuOverlay isOpen={isMenuOpen} onClick={closeMenu} />

                <MobileMenu isOpen={isMenuOpen}>
                    <MobileNavigation>
                        <MobileNavLink to="/about" onClick={closeMenu}>
                            {t('header.nav.aboutUs')}
                        </MobileNavLink>
                        <MobileNavLink to="/news" onClick={closeMenu}>
                            {t('header.nav.news')}
                        </MobileNavLink>
                        <MobileNavLink to="/events" onClick={closeMenu}>
                            {t('header.nav.events')}
                        </MobileNavLink>
                        <MobileNavLink to="/jobs" onClick={closeMenu}>
                            {t('header.nav.jobs')}
                            <span className="beta-badge">NEW</span>
                        </MobileNavLink>
                    </MobileNavigation>

                    <BottomSection>
                        <LanguageSection>
                            <LanguageTitle>{t('header.languages.title')}</LanguageTitle>
                            <LanguageToggle ref={langMenuRef}>
                                <LanguageButton onClick={toggleLangMenu}>
                                    {currentLang === 'en' ? t('header.languages.english') : t('header.languages.uzbek')}
                                </LanguageButton>

                                <LanguageDropdown isOpen={langMenuOpen}>
                                    <LanguageOption
                                        isActive={currentLang === 'en'}
                                        onClick={() => handleLanguageSelect('en')}
                                    >
                                        {t('header.languages.english')}
                                    </LanguageOption>
                                    <LanguageOption
                                        isActive={currentLang === 'uz'}
                                        onClick={() => handleLanguageSelect('uz')}
                                    >
                                        {t('header.languages.uzbek')}
                                    </LanguageOption>
                                </LanguageDropdown>
                            </LanguageToggle>
                        </LanguageSection>

                        <AuthSection>
                            {isAuthenticated ? (
                                <Link to={'/mypage'} onClick={closeMenu} style={{ textDecoration: 'none' }}>
                                    <UserAvatar>
                                        {user?.imageUrl ? (
                                            <img src={user.imageUrl} alt={`${user.firstName || 'User'}'s Avatar`} />
                                        ) : (
                                            <User2 size={28} color={themeColors.colors.neutral.white} />
                                        )}
                                    </UserAvatar>
                                </Link>
                            ) : (
                                <StyledLoginButton asLink to="/login" variant="light" size="sm" onClick={closeMenu}>
                                    {t('header.auth.login')}
                                </StyledLoginButton>
                            )}
                        </AuthSection>
                    </BottomSection>
                </MobileMenu>
            </HeaderInnerContainer>
        </HeaderOuterContainer>
    );
}
