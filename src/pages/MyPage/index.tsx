import { useState } from 'react';
import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import AccountDetails from '@/pages/MyPage/AccountDetails';
import MyEvents from '@/pages/MyPage/MyEvents';
import BlogEditor from '@/pages/MyPage/BlogEditor';
import Sidebar from '@/pages/MyPage/SideBar';
import ConfirmModal from '@/components/Modal/ModalTypes/ConfirmModal';
import useAuth from '@/context/useAuth';
import useModal from '@/hooks/useModal';
import JobPosting from '@/pages/MyPage/JobPosting/index';
import { useTranslation } from 'react-i18next';

enum PageSection {
    EVENTS = 'events',
    JOB_POSTING = 'jobPosting',
    BLOGS = 'blogs',
    ACCOUNT = 'account',
}

const PageContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    color: ${themeColors.colors.neutral.white};
`;

const ContentLayout = styled.div`
    display: flex;
    gap: ${themeColors.spacing.xxl};

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        flex-direction: column;
        gap: ${themeColors.spacing.md};
    }
`;

const LeftColumn = styled.div`
    flex: 2;
    max-width: 300px;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        max-width: 100%;
        margin-bottom: ${themeColors.spacing.md};
    }
`;

const RightColumn = styled.div`
    flex: 5;
    min-height: 600px;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        margin-bottom: ${themeColors.spacing.md};
    }
`;

const SectionContainer = styled.div<{ showBorder?: boolean }>`
    border-radius: ${themeColors.cardBorder.md};
    border: ${(props) => (props.showBorder ? `1px solid ${themeColors.cardBorder.color}` : 'none')};
    padding: ${(props) => (props.showBorder ? themeColors.spacing.lg : '0')};
    margin-bottom: ${themeColors.spacing.lg};
    overflow: hidden;
    min-height: 500px;
`;

/**
 * MyPage Component - Root Page Component
 * Main component for user's personal page where they can view their events,
 * manage blogs, and update account details.
 */
export default function MyPage() {
    const { t } = useTranslation('mypage');
    const { isAuthenticated, logout } = useAuth();
    const { isOpen, openModal, closeModal } = useModal();

    const [activeSection, setActiveSection] = useState<PageSection>(PageSection.EVENTS);
    const [isJobPostingFormActive, setIsJobPostingFormActive] = useState(false);

    /* render the content based on active section */
    const renderContent = () => {
        switch (activeSection) {
            case PageSection.EVENTS:
                return <MyEvents />;
            case PageSection.BLOGS:
                return <BlogEditor />;
            case PageSection.JOB_POSTING:
                return <JobPosting onFormStateChange={setIsJobPostingFormActive} />;
            case PageSection.ACCOUNT:
                return <AccountDetails />;
            default:
                return <MyEvents />;
        }
    };

    const handleLogoutClick = () => {
        if (isAuthenticated) {
            openModal();
        }
    };

    const handleConfirmedLogout = () => {
        closeModal();

        setTimeout(async () => {
            await logout();
        });
    };

    const autProps = {
        onLogout: handleLogoutClick,
    };

    const shouldShowBorder = activeSection === PageSection.JOB_POSTING && isJobPostingFormActive;

    return (
        <>
            <PageContainer>
                <ContentLayout>
                    <LeftColumn>
                        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} {...autProps} />
                    </LeftColumn>
                    <RightColumn>
                        <SectionContainer showBorder={shouldShowBorder}>{renderContent()}</SectionContainer>
                    </RightColumn>
                </ContentLayout>
            </PageContainer>
            <ConfirmModal
                isOpen={isOpen}
                onClose={closeModal}
                title={t('logout.confirmTitle')}
                message={t('logout.confirmMessage')}
                onConfirm={handleConfirmedLogout}
                confirmLabel={t('logout.confirmButton')}
                cancelLabel={t('logout.cancelButton')}
                size="sm"
            />
        </>
    );
}
