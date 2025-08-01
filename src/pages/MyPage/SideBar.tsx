import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import { FaCalendarAlt, FaUser, FaPen, FaSignOutAlt, FaBriefcase } from 'react-icons/fa';
import Button from '@/components/Button/Button';
import useAuth from '@/context/useAuth';
import defaultUserImage from '@/static/icons/default.jpg';
import useFormatDate from '@/hooks/useFormatDate';
import { useTranslation } from 'react-i18next';

enum PageSection {
    EVENTS = 'events',
    BLOGS = 'blogs',
    JOB_POSTING = 'jobPosting',
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
    min-width: 0;
    overflow: hidden;
`;

const ProfileImage = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
`;

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${themeColors.spacing.xs};
    flex: 1;
    min-width: 0;
    overflow: hidden;
`;
const ProfileName = styled.h3`
    margin: 0;
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    font-weight: ${themeColors.typography.body.medium.lineHeight};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ProfileEmail = styled.p`
    margin: 0;
    color: ${themeColors.colors.gray.text};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ProfileJoined = styled.span`
    color: ${themeColors.colors.gray.text};
    font-size: ${themeColors.typography.body.xsmall.fontSize}px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const NavSection = styled.nav`
    display: flex;
    flex-direction: column;
    margin-top: 0;
    border-bottom: 1px solid ${themeColors.cardBorder.color};
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
    margin-top: 12px;
    width: 100%;
    transition: background-color 0.2s ease;

    &:focus,
    &:active,
    &:focus-visible {
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
    }
`;

/**
 * Sidebar Component - Sub Molecule Component
 * Navigation sidebar for the MyPage section, allowing users to
 * switch between different sections and sign out.
 */
export default function Sidebar({ activeSection, onSectionChange, onLogout }: SidebarProps) {
    const { t } = useTranslation('mypage');
    const { formatDate } = useFormatDate();
    const { user } = useAuth();

    return (
        <SidebarContainer>
            <ProfileSection>
                <ProfileImage src={user?.imageUrl || defaultUserImage} alt="Profile" />
                <ProfileInfo>
                    <ProfileName>{user?.username || t('sidebar.anonymous')}</ProfileName>
                    <ProfileEmail>{user?.email || t('sidebar.noEmailGiven')}</ProfileEmail>
                    <ProfileJoined>
                        {t('sidebar.joined')} {formatDate(user?.createdAt)}
                    </ProfileJoined>
                </ProfileInfo>
            </ProfileSection>

            <NavSection>
                <NavItemButton
                    variant={activeSection === PageSection.EVENTS ? 'navItemActive' : 'navItem'}
                    fullWidth={true}
                    onClick={() => onSectionChange(PageSection.EVENTS)}
                >
                    <FaCalendarAlt />
                    <NavText>{t('navigation.events')}</NavText>
                </NavItemButton>

                <NavItemButton
                    variant={activeSection === PageSection.BLOGS ? 'navItemActive' : 'navItem'}
                    fullWidth={true}
                    onClick={() => onSectionChange(PageSection.BLOGS)}
                >
                    <FaPen />
                    <NavText>{t('navigation.blogs')}</NavText>
                </NavItemButton>

                <NavItemButton
                    variant={activeSection === PageSection.JOB_POSTING ? 'navItemActive' : 'navItem'}
                    fullWidth={true}
                    onClick={() => onSectionChange(PageSection.JOB_POSTING)}
                >
                    <FaBriefcase />
                    <NavText>{t('navigation.jobPosting')}</NavText>
                </NavItemButton>

                <NavItemButton
                    variant={activeSection === PageSection.ACCOUNT ? 'navItemActive' : 'navItem'}
                    fullWidth={true}
                    onClick={() => onSectionChange(PageSection.ACCOUNT)}
                >
                    <FaUser />
                    <NavText>{t('navigation.account')}</NavText>
                </NavItemButton>
            </NavSection>

            <SignOutButton variant="navItem" fullWidth={true} onClick={onLogout}>
                <FaSignOutAlt />
                <NavText>{t('sidebar.signOut')}</NavText>
            </SignOutButton>
        </SidebarContainer>
    );
}
