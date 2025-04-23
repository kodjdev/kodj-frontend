import { useEffect, useState } from 'react';
import styled from 'styled-components';
import themeColors from '@/tools/themeColors';

type TimeLeftType = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

type EventType = {
    name: string;
    date: Date;
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: ${themeColors.breakpoints.laptop};
    padding: 32px 48px;
    margin: 1rem auto;
    border-radius: 8px;
    border: 1px solid ${themeColors.cardBorder.color};
    background-color: ${themeColors.colors.gray.dark};
    overflow: hidden;
    @media (min-width: ${themeColors.breakpoints.mobile}) {
        padding: 32px;
    }

    @media (min-width: ${themeColors.breakpoints.tablet}) {
        padding: 32px 48px;
        max-width: ${themeColors.breakpoints.laptop};
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    @media (min-width: ${themeColors.breakpoints.mobile}) {
        flex-direction: row;
        gap: 0;
    }
`;

const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.625rem;
    width: 100%;
    flex-shrink: 0;

    @media (min-width: ${themeColors.breakpoints.mobile}) {
        width: 486px;
    }
`;

const AlertContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

const IconWrapper = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
`;

const AlertText = styled.p`
    color: ${themeColors.colors.gray.text};
    font-size: 18px;
    line-height: 1;
    margin: 0;
`;

const TimeInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    width: 100%;

    @media (min-width: ${themeColors.breakpoints.mobile}) {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: baseline;
    }
`;

const TimeLeftText = styled.p`
    color: ${themeColors.colors.neutral.white};
    font-weight: ${themeColors.typography.headings.desktop.h2};
    font-size: 20px;
    line-height: 41.6px;
    margin: 0 5px;

    @media (min-width: ${themeColors.breakpoints.mobile}) {
        font-size: 28px;
    }
`;

const UntilNextText = styled.p`
    color: ${themeColors.colors.gray.main};
    font-weight: ${themeColors.typography.headings.desktop.h2};
    font-size: 20px;
    line-height: 1;
    margin: 0 0.5rem;

    @media (min-width: ${themeColors.breakpoints.mobile}) {
        font-size: 28px;
    }
`;

const EventNameText = styled.p`
    color: ${themeColors.colors.gray.main};
    font-weight: bold;
    font-size: 20px;
    line-height: 1;
    margin: 0;

    @media (min-width: ${themeColors.breakpoints.mobile}) {
        font-size: 28px;
    }
`;

const TimerContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr); // 2 columns on small screens
    gap: 0.25rem;
    width: 100%;
    margin-top: 1rem;

    @media (min-width: ${themeColors.breakpoints.mobile}) {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: auto;
        gap: 1rem;
        margin-top: 0;
    }

    @media (min-width: ${themeColors.breakpoints.tablet}) {
        gap: 1.5rem;
    }
`;

const TimeUnit = styled.div`
    text-align: center;
`;

const TimeValue = styled.p`
    color: ${themeColors.colors.neutral.white};
    font-size: 30px;
    font-weight: normal;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0;

    @media (min-width: ${themeColors.breakpoints.mobile}) {
        font-size: 50px;
        letter-spacing: 0.5px;
    }

    @media (min-width: ${themeColors.breakpoints.tablet}) {
        font-size: 70px;
        text-transform: uppercase;
    }
`;

const TimeLabel = styled.p`
    color: ${themeColors.colors.gray.main};
    font-size: 15px;
    font-weight: ${themeColors.typography.headings.desktop.h4};
    text-transform: uppercase;
    margin: 0;
`;

const Separator = styled.span`
    color: ${themeColors.colors.neutral.white};
    font-size: 40px;
    font-weight: normal;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0 -20px;
    display: none;

    @media (min-width: ${themeColors.breakpoints.mobile}) {
        display: inline-block;
        font-size: 70px;
    }
`;

const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
`;

const LoadingSpinner = styled.div`
    animation: spin 1s linear infinite;
    border-radius: 50%;
    height: 2rem;
    width: 2rem;
    border: 1px solid transparent;
    border-bottom-color: ${themeColors.colors.neutral.white};

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

export default function TimeFrame() {
    const [timeLeft, setTimeLeft] = useState<TimeLeftType>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    // hardcoded sample data, useEventFetch define
    // bolgandan keyin integrate qilamiz
    const [event] = useState<EventType>({
        name: 'Developers Meetup',
        date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    });

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        if (!event) return;

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = event.date.getTime() - now;

            if (distance <= 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        setLoading(false);
        return () => clearInterval(timer);
    }, [event]);

    if (loading) {
        return (
            <LoadingContainer>
                <LoadingSpinner />
            </LoadingContainer>
        );
    }

    return (
        <Container>
            <ContentWrapper>
                {/* chap tomon */}
                <LeftSection>
                    <AlertContainer>
                        <IconWrapper>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                            >
                                <path
                                    d="M12.5 22C6.97715 22 2.5 17.5228 2.5 12C2.5 6.47715 6.97715 2 12.5 2C18.0228 2 22.5 6.47715 22.5 12C22.5 17.5228 18.0228 22 12.5 22ZM11.5 15V17H13.5V15H11.5ZM11.5 7V13H13.5V7H11.5Z"
                                    fill="#FF0202"
                                />
                            </svg>
                        </IconWrapper>
                        <AlertText>Hurry up, time is running out.</AlertText>
                    </AlertContainer>

                    <TimeInfoContainer>
                        <TimeLeftText>Time left until the next</TimeLeftText>
                        <UntilNextText>MeetUp.</UntilNextText>
                        <EventNameText>{event?.name || ''}</EventNameText>
                    </TimeInfoContainer>
                </LeftSection>

                {/* ong tomon - timer qismi */}
                <TimerContainer>
                    <TimeUnit>
                        <TimeValue>{formatTime(timeLeft.days)}</TimeValue>
                        <TimeLabel>DAY</TimeLabel>
                    </TimeUnit>

                    <Separator>·</Separator>

                    <TimeUnit>
                        <TimeValue>{formatTime(timeLeft.hours)}</TimeValue>
                        <TimeLabel>HOUR</TimeLabel>
                    </TimeUnit>

                    <Separator>·</Separator>

                    <TimeUnit>
                        <TimeValue>{formatTime(timeLeft.minutes)}</TimeValue>
                        <TimeLabel>MINUT</TimeLabel>
                    </TimeUnit>

                    <Separator>·</Separator>

                    <TimeUnit>
                        <TimeValue>{formatTime(timeLeft.seconds)}</TimeValue>
                        <TimeLabel>SECOND</TimeLabel>
                    </TimeUnit>
                </TimerContainer>
            </ContentWrapper>
        </Container>
    );
}

function formatTime(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
}
