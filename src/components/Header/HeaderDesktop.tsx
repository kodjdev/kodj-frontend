import styled from 'styled-components';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import kodjLogo from '@/static/icons/kodj_new.jpg';
import themeColors from '@/tools/themeColors';
import Button from '@/components/Button/Button';
import { HeaderProps } from '@/types';
import useAuth from '@/context/useAuth';
import { Globe, User2 } from 'lucide-react';
import Card from '@/components/Card/Card';
import { useTranslation } from 'react-i18next';

type LanguageMenuProps = {
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
    z-index: 1000;
    overflow-x: visible;
`;

const HeaderInnerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: ${themeColors.breakpoints.laptop};
    padding: 10px ${themeColors.spacing.md} 20px;
    margin: 0 auto;
    margin-bottom: -15px;
    width: 100%;
    box-sizing: border-box;
`;

const LogoContainer = styled.div`
    flex-shrink: 0;
`;

const Logo = styled.img`
    height: 32px;
    display: block;
`;

const Navigation = styled.nav`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
    flex-wrap: nowrap;
    margin-left: ${themeColors.spacing.xl};
    margin-right: ${themeColors.spacing.xl};
    padding: 0 ${themeColors.spacing.md};
    gap: ${themeColors.spacing.lg};
    height: 100%;
    padding-bottom: 0;
`;

const NavLink = styled(RouterNavLink)`
    color: ${themeColors.colors.neutral.white};
    text-decoration: none;
    font-size: ${themeColors.typography.body.medium.fontSize || 16}px;
    position: relative;

    &:after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: ${themeColors.colors.primary.main};
        transition: width 0.3s ease-in-out;
    }

    &:hover:after,
    &.active:after {
        width: 100%;
    }

    &.active {
        font-weight: ${themeColors.typography.headings.desktop.h2.fontWeight};
    }
`;

const AuthButtons = styled.div`
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.xs || '1rem'};
`;

const LanguageToggle = styled.div`
    position: relative;
    margin-right: 8px;
`;

const LanguageButton = styled(Button)`
    padding: 6px 12px;
    min-width: 80px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    text-transform: none;
    font-weight: normal;
    border-radius: 50px;
`;

const LanguageMenu = styled(Card)<LanguageMenuProps>`
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    z-index: 1000;
    min-width: 90px;
    width: 100%;
    padding: 0;
    margin: 0;
    border-radius: 15px;
    overflow: hidden;
    background-color: transparent;
    border: 1px solid ${themeColors.colors.primary.main};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

    && {
        background-color: transparent;
    }
`;

const LanguageOption = styled(Button)<{ isActive: boolean }>`
    width: 100%;
    text-align: center;
    justify-content: center;
    padding: 12px;
    background-color: transparent !important;
    color: ${({ isActive }) => (isActive ? themeColors.colors.status.info : themeColors.colors.neutral.white)};
    font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
    border-radius: 0;
    font-size: ${themeColors.typography.body.xsmall.fontSize}px;
    border: none;

    &:hover {
        background-color: ${themeColors.colors.primary.main} !important;
    }
`;

const UserAvatar = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const BetaBadge = styled.span`
    background-color: ${themeColors.colors.status.beta.main};
    color: ${themeColors.colors.neutral.black};
    font-size: 9px;
    font-weight: 600;
    padding: 2px 9px;
    border-radius: 4px;
    position: absolute;
    top: -14px;
    right: -25px;
    border: 0.5px solid ${themeColors.colors.status.beta.main};
`;

/**
 * Desktop Header component
 * @param handleLangChange - Callback function to handle language changes
 * @param currentLang - Current active language code
 * @param langMenuOpen - Boolean indicating if language menu is open
 * @param toggleLangMenu - Function to toggle language menu visibility
 */
export default function HeaderDesktop({
    handleLangChange,
    currentLang,
    langMenuOpen,
    toggleLangMenu,
    isAuthenticated,
    langMenuRef,
}: HeaderProps) {
    const { t } = useTranslation('home');

    const { user } = useAuth();
    return (
        <HeaderOuterContainer>
            <HeaderInnerContainer>
                <LogoContainer>
                    <Link to="/">
                        <Logo src={kodjLogo} alt="KO'DJ" />
                    </Link>
                </LogoContainer>

                <Navigation>
                    <NavLink to="/about">{t('header.nav.aboutUs')}</NavLink>
                    <NavLink to="/news">{t('header.nav.news')}</NavLink>
                    <NavLink to="/events">{t('header.nav.events')}</NavLink>
                    <NavLink to="/jobs" style={{ position: 'relative' }}>
                        {t('header.nav.jobs')}
                        <BetaBadge>NEW</BetaBadge>
                    </NavLink>
                </Navigation>

                <AuthButtons>
                    <LanguageToggle ref={langMenuRef}>
                        <LanguageButton variant="text" size="mini" onClick={toggleLangMenu}>
                            <Globe size={16} />
                            {currentLang === 'en' ? t('header.languages.english') : t('header.languages.uzbek')}
                        </LanguageButton>

                        {langMenuOpen && (
                            <LanguageMenu isOpen={langMenuOpen} padding="0">
                                <LanguageOption
                                    variant="text"
                                    size="mini"
                                    onClick={() => handleLangChange('en')}
                                    isActive={currentLang === 'en'}
                                >
                                    {t('header.languages.english')}
                                </LanguageOption>
                                <LanguageOption
                                    variant="text"
                                    size="mini"
                                    onClick={() => handleLangChange('uz')}
                                    isActive={currentLang === 'uz'}
                                >
                                    {t('header.languages.uzbek')}
                                </LanguageOption>
                            </LanguageMenu>
                        )}
                    </LanguageToggle>
                    {isAuthenticated ? (
                        <Link to={'/mypage'}>
                            <UserAvatar>
                                {user?.imageUrl ? (
                                    <img src={user.imageUrl} alt={`${user.firstName || 'User'}'s Avatar`} />
                                ) : (
                                    <User2
                                        size={20}
                                        color={themeColors.colors.neutral.white}
                                        style={{ padding: '4px' }}
                                    />
                                )}
                            </UserAvatar>
                        </Link>
                    ) : (
                        <Button asLink to="/login" variant="light" size="mini">
                            {t('header.auth.login')}
                        </Button>
                    )}
                </AuthButtons>
            </HeaderInnerContainer>
        </HeaderOuterContainer>
    );
}
