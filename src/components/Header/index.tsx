import { useMediaQuery } from 'react-responsive';
import HeaderDesktop from '@/components/Header/HeaderDesktop';
import HeaderMobile from '@/components/Header/HeaderMobile';
import themeColors from '@/tools/themeColors';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import useAuth from '@/context/useAuth';
import ConfirmModal from '@/components/Modal/ModalTypes/ConfirmModal';
import useModal from '@/hooks/useModal';

/**
 * Header Root Component:
 * Here we wrap the mobile and desktop headers.
 * This root components renders either the desktop or mobile
 * header based on the viewport width.
 */
export default function Header() {
    const langMenuRef = useRef<HTMLDivElement>(null);
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const { i18n } = useTranslation();
    const { isAuthenticated, logout } = useAuth();
    const { isOpen, openModal, closeModal } = useModal();

    const isMobile = useMediaQuery({
        query: `(max-width: ${themeColors.breakpoints.mobile})`,
    });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
                setLangMenuOpen(false);
            }
        };

        if (langMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [langMenuOpen]);

    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
        setLangMenuOpen(false);
    };

    const toggleMenu = () => {
        setLangMenuOpen(!langMenuOpen);
    };

    const handleLogoutClick = () => {
        if (isAuthenticated) {
            openModal();
        }
    };

    const handleConfirmedLogout = async () => {
        closeModal();

        setTimeout(async () => {
            await logout();
        }, 50);
    };

    const authProps = {
        isAuthenticated: !!isAuthenticated,
        onLogout: handleLogoutClick,
    };

    return (
        <>
            {isMobile ? (
                <HeaderMobile
                    handleLangChange={handleLanguageChange}
                    currentLang={i18n.language}
                    langMenuOpen={langMenuOpen}
                    toggleLangMenu={toggleMenu}
                    langMenuRef={langMenuRef}
                    {...authProps}
                />
            ) : (
                <HeaderDesktop
                    handleLangChange={handleLanguageChange}
                    currentLang={i18n.language}
                    langMenuOpen={langMenuOpen}
                    toggleLangMenu={toggleMenu}
                    langMenuRef={langMenuRef}
                    {...authProps}
                />
            )}
            {
                <ConfirmModal
                    isOpen={isOpen}
                    onClose={closeModal}
                    title={'Confirm Logout'}
                    message={'Are you sure you want to log out?'}
                    onConfirm={handleConfirmedLogout}
                    confirmLabel={'Yes, log out'}
                    cancelLabel={'Cancel'}
                    size="sm"
                />
            }
        </>
    );
}
