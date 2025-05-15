import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import { FaCalendarAlt, FaUser, FaPen, FaSignOutAlt } from 'react-icons/fa';
import Button from '@/components/Button/Button';

enum PageSection {
    EVENTS = 'events',
    BLOGS = 'blogs',
    ACCOUNT = 'account',
}

type NavItemButtonProps = {
    active?: boolean;
};

type SidebarProps = {
    activeSection: PageSection;
    onSectionChange: (section: PageSection) => void;
    onLogout: () => void;
};

const SidebarContainer = styled.div`
    background-color: transparent;
    border: none;
    overflow: visible;
`;

const ProfileSection = styled.div`
    padding: ${themeColors.spacing.md};
    background-color: ${themeColors.colors.gray.background};
    border: 1px solid ${themeColors.cardBorder.color};
    border-radius: ${themeColors.cardBorder.md};
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.md};
    margin-bottom: ${themeColors.spacing.xl};
`;

const ProfileImage = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
`;

const ProfileInfo = styled.div`
    flex: 1;
`;

const ProfileName = styled.h3`
    margin: 0;
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    font-weight: 600;
`;

const ProfileEmail = styled.p`
    margin: 4px 0 0;
    color: ${themeColors.colors.gray.text};
    font-size: ${themeColors.typography.body.small.fontSize}px;
`;

const ProfileJoined = styled.span`
    display: block;
    font-size: ${themeColors.typography.body.xsmall.fontSize}px;
    color: ${themeColors.colors.gray.label};
    margin-top: 4px;
`;

const NavSection = styled.nav`
    display: flex;
    flex-direction: column;
    margin-top: 0;
`;

const NavItemButton = styled(Button)<NavItemButtonProps>`
    width: 100%;
    margin-bottom: 8px;

    &:focus,
    &:active,
    &:focus-visible {
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
    }
`;

const NavText = styled.span`
    font-size: ${themeColors.typography.body.medium.fontSize}px;
`;

const SignOutButton = styled(Button)`
    text-transform: none;
    justify-content: flex-start;
    margin-top: 16px;
    width: 100%;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: transparent;
    }

    svg {
        color: ${themeColors.colors.status.error.text};
        margin-right: ${themeColors.spacing.md};
    }
`;

/**
 * Sidebar Component - Sub Molecule Component
 * Navigation sidebar for the MyPage section, allowing users to
 * switch between different sections and sign out.
 */
export default function Sidebar({ activeSection, onSectionChange, onLogout }: SidebarProps) {
    return (
        <SidebarContainer>
            <ProfileSection>
                <ProfileImage src="/api/placeholder/60/60" alt="Profile" />
                <ProfileInfo>
                    <ProfileName>Behzod Olimov</ProfileName>
                    <ProfileEmail>example@example.com</ProfileEmail>
                    <ProfileJoined>KO'DJ joined: 12.12.2024</ProfileJoined>
                </ProfileInfo>
            </ProfileSection>

            <NavSection>
                <NavItemButton
                    variant={activeSection === PageSection.EVENTS ? 'navItemActive' : 'navItem'}
                    fullWidth={true}
                    onClick={() => onSectionChange(PageSection.EVENTS)}
                >
                    <FaCalendarAlt />
                    <NavText>Events - Registered</NavText>
                </NavItemButton>

                <NavItemButton
                    variant={activeSection === PageSection.BLOGS ? 'navItemActive' : 'navItem'}
                    fullWidth={true}
                    onClick={() => onSectionChange(PageSection.BLOGS)}
                >
                    <FaPen />
                    <NavText>My Blogs</NavText>
                </NavItemButton>

                <NavItemButton
                    variant={activeSection === PageSection.ACCOUNT ? 'navItemActive' : 'navItem'}
                    fullWidth={true}
                    onClick={() => onSectionChange(PageSection.ACCOUNT)}
                >
                    <FaUser />
                    <NavText>Personal Info</NavText>
                </NavItemButton>
            </NavSection>

            <SignOutButton variant="signOut" onClick={onLogout}>
                <FaSignOutAlt />
                <NavText>Sign out</NavText>
            </SignOutButton>
        </SidebarContainer>
    );
}
