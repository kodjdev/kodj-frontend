import styled from 'styled-components';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import kodjLogo from '@/static/assets/kodj_new.jpg';
import themeColors from '@/tools/themeColors';
import Button from '@/components/Button/Button';
import { HeaderProps } from '@/types';

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
        font-weight: 'bold';
    }
`;

const AuthButtons = styled.div`
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.md || '1rem'};
`;

const LanguageToggle = styled.div`
    position: relative;
    margin-right: 8px;
`;

const LanguageButton = styled.button`
    background: transparent;
    border: none;
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    cursor: pointer;
    padding: 4px 6px;
    display: flex;
    align-items: center;
    border-radius: 4px;

    &:hover {
        background-color: ${themeColors.colors.gray.hover};
    }
`;

const LanguageMenu = styled.div<LanguageMenuProps>`
    position: absolute;
    top: 100%;
    right: 0;
    background-color: ${themeColors.colors.neutral.black};
    border: 0.5px solid ${themeColors.colors.gray.line};
    border-radius: 4px;
    padding: 8px 0;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    z-index: 1000;
    min-width: 120px;
    margin-top: 8px;
`;

const LanguageOption = styled.button<{ isActive: boolean }>`
    width: 100%;
    text-align: left;
    background: transparent;
    border: none;
    color: ${({ isActive }) => (isActive ? themeColors.colors.primary.main : themeColors.colors.neutral.white)};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    cursor: pointer;
    padding: 8px 16px;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

/**
 * Desktop Header component
 * @param handleLangChange - Callback function to handle language changes
 * @param currentLang - Current active language code
 * @param langMenuOpen - Boolean indicating if language menu is open
 * @param toggleLangMenu - Function to toggle language menu visibility
 */
export default function HeaderDesktop({ handleLangChange, currentLang, langMenuOpen, toggleLangMenu }: HeaderProps) {
    return (
        <HeaderOuterContainer>
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
                    <LanguageToggle>
                        <LanguageButton onClick={toggleLangMenu}>{currentLang.toUpperCase()}</LanguageButton>
                        <LanguageMenu isOpen={langMenuOpen}>
                            <LanguageOption isActive={currentLang === 'en'} onClick={() => handleLangChange('en')}>
                                en
                            </LanguageOption>
                            <LanguageOption isActive={currentLang === 'uz'} onClick={() => handleLangChange('uz')}>
                                uz
                            </LanguageOption>
                        </LanguageMenu>
                    </LanguageToggle>
                    <Button asLink to="/login" variant="light" size="mini">
                        login
                    </Button>
                </AuthButtons>
            </HeaderInnerContainer>
        </HeaderOuterContainer>
    );
}
