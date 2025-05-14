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
    text-transform: none;
    justify-content: flex-start;
    width: 100%;
    border: none;
    background-color: ${(props) => (props.active ? '#272727' : 'transparent')};
    border-radius: 8px;

    &:focus,
    &:active,
    &:focus-visible {
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
    }

    &:hover {
        background-color: ${(props) => (props.active ? '#272727' : 'transparent')};
    }

    svg {
        color: ${(props) => (props.active ? themeColors.colors.primary.main : themeColors.colors.gray.text)};
        margin-right: ${themeColors.spacing.md};
    }
`;

const NavText = styled.span`
    font-size: ${themeColors.typography.body.medium.fontSize}px;
`;

const SignOutButton = styled(Button)`
    text-transform: none;
    justify-content: flex-start;
    border: 1px solid ${themeColors.cardBorder.color};
    margin-top: 16px;
    width: 100%;
    transition: background-color 0.2s ease;
    border-radius: ${themeColors.cardBorder.md};

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
export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
    const handleSignOut = () => {
        console.log('Signing out...');
    };

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
                    variant="text"
                    fullWidth={true}
                    active={activeSection === PageSection.EVENTS}
                    onClick={() => onSectionChange(PageSection.EVENTS)}
                >
                    <FaCalendarAlt />
                    <NavText>Events</NavText>
                </NavItemButton>

                <NavItemButton
                    variant="text"
                    fullWidth={true}
                    active={activeSection === PageSection.BLOGS}
                    onClick={() => onSectionChange(PageSection.BLOGS)}
                >
                    <FaPen />
                    <NavText>Blogs (not now)</NavText>
                </NavItemButton>

                <NavItemButton
                    variant="text"
                    fullWidth={true}
                    active={activeSection === PageSection.ACCOUNT}
                    onClick={() => onSectionChange(PageSection.ACCOUNT)}
                >
                    <FaUser />
                    <NavText>Personal Info</NavText>
                </NavItemButton>
            </NavSection>

            <SignOutButton variant="text" onClick={handleSignOut}>
                <FaSignOutAlt />
                <NavText>Sign out</NavText>
            </SignOutButton>
        </SidebarContainer>
    );
}
