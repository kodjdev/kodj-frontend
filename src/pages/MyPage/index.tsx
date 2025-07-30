import { useEffect, useState } from 'react';
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
import useApiService from '@/services';
import { message } from 'antd';
import { EventCardProps } from '@/components/Card/EventCard';
import { TokenStorage } from '@/utils/tokenStorage';
import { ModalLoading } from '@/components/Loading/LoadingAnimation';

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
    const [activeSection, setActiveSection] = useState<PageSection>(PageSection.EVENTS);
    const [isJobPostingFormActive, setIsJobPostingFormActive] = useState(false);
    const [registeredEvents, setRegisteredEvents] = useState<EventCardProps[]>([]);
    const [eventsLoading, setEventsLoading] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();

    const { t } = useTranslation('mypage');
    const { isAuthenticated, logout, user, isLoading } = useAuth();
    const { isOpen, openModal, closeModal } = useModal();
    const apiService = useApiService();

    useEffect(() => {
        const fetchRegisteredEvents = async () => {
            const accessToken = TokenStorage.getAccessToken();

            if (!accessToken) {
                if (isAuthenticated) {
                    messageApi.error('Access token not found. Please log in again.');
                }
                return;
            }

            if (!user) return;

            try {
                setEventsLoading(true);

                const response = await apiService.getUserRegisteredEvents(accessToken);

                if (response.statusCode === 200 && response.data) {
                    const eventsArray = Array.isArray(response.data) ? response.data : [response.data];
                    const transformedEvents =
                        eventsArray.map((event) => ({
                            id: event.id,
                            title: event.title,
                            imageUrl: event.imageURL,
                            registeredCount: event.maxSeats - event.availableSeats,
                            maxSeats: event.maxSeats,
                            date: event.meetupDate,
                            startTime: event.startTime,
                            endTime: event.endTime,
                            cancelled: event.cancelled,
                            canCancel: !event.cancelled && new Date(event.meetupDate) > new Date(),
                        })) || [];

                    setRegisteredEvents(transformedEvents);
                }
            } catch (apiError) {
                messageApi.error(apiError instanceof Error ? apiError.message : 'Failed to load registered events');
            } finally {
                setEventsLoading(false);
            }
        };

        if (activeSection === PageSection.EVENTS && isAuthenticated && !isLoading) {
            fetchRegisteredEvents();
        }
    }, [user, messageApi, activeSection, isAuthenticated, isLoading]);

    const handleCancelEvent = async (eventId: number) => {
        const accessToken = TokenStorage.getAccessToken();

        if (!accessToken) {
            if (isAuthenticated) {
                messageApi.error('Access token not found. Please log in again.');
            }
            return;
        }

        if (!user) return;

        try {
            const response = await apiService.cancelEventRegistration(accessToken, eventId);

            if (response.statusCode === 200) {
                messageApi.success('Event registration cancelled successfully');
                setRegisteredEvents((prev) =>
                    prev.map((event) =>
                        event.id === eventId ? { ...event, cancelled: true, canCancel: false } : event,
                    ),
                );
            } else {
                messageApi.error('Failed to cancel event registration');
            }
        } catch (apiError) {
            messageApi.error(apiError instanceof Error ? apiError.message : 'Failed to cancel event registration');
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

    const renderContent = () => {
        switch (activeSection) {
            case PageSection.EVENTS:
                return (
                    <MyEvents
                        registeredEvents={registeredEvents}
                        loading={eventsLoading}
                        onCancelEvent={handleCancelEvent}
                    />
                );
            case PageSection.BLOGS:
                return <BlogEditor />;
            case PageSection.JOB_POSTING:
                return <JobPosting onFormStateChange={setIsJobPostingFormActive} />;
            case PageSection.ACCOUNT:
                return <AccountDetails />;
            default:
                return (
                    <MyEvents
                        registeredEvents={registeredEvents}
                        loading={eventsLoading}
                        onCancelEvent={handleCancelEvent}
                    />
                );
        }
    };

    const shouldShowBorder = activeSection === PageSection.JOB_POSTING && isJobPostingFormActive;

    if (isLoading) {
        return (
            <PageContainer>
                <ModalLoading message="Loading your page..." />
            </PageContainer>
        );
    }

    return (
        <>
            {contextHolder}
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
