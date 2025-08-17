import { useEffect, useState } from 'react';
import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import SectionLoading from '@/components/Loading/LoadingAnimation';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useApiService from '@/services';

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
    padding: 24px;
    border-radius: 8px;
    border: 1px solid ${themeColors.cardBorder.color};
    background-color: ${themeColors.colors.gray.dark};
    overflow: hidden;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: 16px;
        text-align: center;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    @media (min-width: ${themeColors.breakpoints.tablet}) {
        flex-direction: row;
        gap: 0;
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        align-items: center;
        text-align: center;
    }
`;

const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.625rem;
    width: 100%;
    flex-shrink: 0;

    @media (min-width: ${themeColors.breakpoints.tablet}) {
        width: 486px;
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        align-items: center;
        text-align: center;
    }
`;

const AlertContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        flex-direction: row;
        align-items: center;
        text-align: center;
        max-width: 100%;
    }
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

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const TimeInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    width: 100%;

    @media (min-width: ${themeColors.breakpoints.tablet}) {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: baseline;

        /* laptop size: we keep event info on same line */
        .event-info-wrapper {
            display: inline-flex;
            align-items: baseline;
            gap: 4px;
            white-space: nowrap;
        }
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        align-items: center;
        text-align: center;
        gap: 0.25rem;

        .event-info-wrapper {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 4px;
        }
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

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        margin: 0;
        font-size: 20px;
        line-height: 1.2;
        white-space: nowrap;
    }
`;

const EventNameText = styled.p`
    color: ${themeColors.colors.gray.main};
    font-weight: bold;
    font-size: 20px;
    line-height: 1;
    margin: 0;

    @media (min-width: ${themeColors.breakpoints.tablet}) {
        font-size: 28px;
        display: inline;
        margin-left: 4px;
        white-space: nowrap;
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: 18px;
        white-space: nowrap;
        display: inline;
        margin-left: 4px;
    }
`;

const TimerContainer = styled.div`
    width: 100%;
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    justify-items: center;

    @media (min-width: ${themeColors.breakpoints.tablet}) {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 1.5rem;
        margin-top: 0;
        width: auto;
    }

    @media (min-width: ${themeColors.breakpoints.laptop}) {
        gap: 2rem;
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        margin-top: 1.5rem;
        gap: 0.25rem;
        justify-items: center;
        grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
        align-items: center;
    }
`;

const TimeUnit = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        min-width: auto;
    }
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

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: 36px;
        font-weight: 500;
    }
`;

const TimeLabel = styled.p`
    color: ${themeColors.colors.gray.main};
    font-size: 15px;
    font-weight: ${themeColors.typography.headings.desktop.h4};
    text-transform: uppercase;
    margin: 0;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: 11px;
        margin-top: 2px;
    }
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

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        margin: 0;
        height: 100%;
    }
`;

const RegisterButton = styled.button`
    background: transparent;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    height: auto;
    min-height: 32px;
    transition: all 0.3s ease;
    margin-left: 0.5rem;
    position: relative;
    overflow: visible;
    min-width: 24px;

    &:hover {
        background: transparent;
        transform: scale(1.05);
        min-width: 80px;
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        display: none;
    }
`;

const ButtonContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
`;

const ArrowIcon = styled.div`
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    ${RegisterButton}:hover & {
        opacity: 0;
        visibility: hidden;
        background-color: transparent;
    }

    svg {
        color: #ffd700;
        width: 20px;
        height: 20px;
        font-weight: bold;
        filter: drop-shadow(0 0 8px #ffd700) drop-shadow(0 0 12px #ffd700);
        stroke-width: 2;
    }
`;

const RegisterText = styled.span`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    color: #4285f4;
    font-weight: bold;
    font-size: 12px;
    text-transform: uppercase;
    white-space: nowrap;
    filter: drop-shadow(0 0 6px #4285f4);

    ${RegisterButton}:hover & {
        opacity: 1;
        visibility: visible;
    }
`;

const MobileRegisterButton = styled.button`
    display: none;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        display: block;
        width: 100%;
        background: ${themeColors.colors.neutral.white};
        color: ${themeColors.colors.neutral.black};
        border: none;
        padding: 12px 0;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        margin-top: 1.4rem;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            background: ${themeColors.colors.gray.light};
        }
    }
`;

export default function TimeFrame() {
    const navigate = useNavigate();
    const { t } = useTranslation('benefits');
    const eventApiService = useApiService();

    const [timeLeft, setTimeLeft] = useState<TimeLeftType>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [event, setEvent] = useState<EventType | null>(null);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const response = await eventApiService.getEvents({ type: 'upcoming' });
            const firstEvent = response.data?.content?.[0];
            if (firstEvent) {
                setEvent({
                    name: firstEvent.title,
                    date: new Date(firstEvent.startTime),
                });
            }
        })();
    }, []);

    useEffect(() => {
        setLoading(true);
        if (!event?.date) return;

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

    if (!event) {
        const defaultTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        const defaultEvent = { name: 'No upcoming events', date: null };

        return (
            <>
                <Container>
                    <ContentWrapper>
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
                                <AlertText>{t('timeFrame.alert')}</AlertText>
                            </AlertContainer>

                            <TimeInfoContainer>
                                <TimeLeftText>{t('timeFrame.timeLeft')}</TimeLeftText>
                                <div className="event-info-wrapper">
                                    <EventNameText>{defaultEvent.name}</EventNameText>
                                </div>
                            </TimeInfoContainer>
                        </LeftSection>

                        <TimerContainer>
                            <TimeUnit>
                                <TimeValue>{formatTime(defaultTimeLeft.days)}</TimeValue>
                                <TimeLabel>{t('timeFrame.units.day')}</TimeLabel>
                            </TimeUnit>

                            <Separator>·</Separator>

                            <TimeUnit>
                                <TimeValue>{formatTime(defaultTimeLeft.hours)}</TimeValue>
                                <TimeLabel>{t('timeFrame.units.hour')}</TimeLabel>
                            </TimeUnit>

                            <Separator>·</Separator>

                            <TimeUnit>
                                <TimeValue>{formatTime(defaultTimeLeft.minutes)}</TimeValue>
                                <TimeLabel>{t('timeFrame.units.minute')}</TimeLabel>
                            </TimeUnit>

                            <Separator>·</Separator>

                            <TimeUnit>
                                <TimeValue>{formatTime(defaultTimeLeft.seconds)}</TimeValue>
                                <TimeLabel>{t('timeFrame.units.second')}</TimeLabel>
                            </TimeUnit>
                        </TimerContainer>
                    </ContentWrapper>
                </Container>
            </>
        );
    }

    if (loading) {
        return <SectionLoading message="Loading Time Frame..." />;
    }

    function formatTime(value: number): string {
        return value < 10 ? `0${value}` : value.toString();
    }

    return (
        <>
            <Container>
                <ContentWrapper>
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
                            <AlertText>{t('timeFrame.alert')}</AlertText>
                        </AlertContainer>

                        <TimeInfoContainer>
                            <TimeLeftText>{t('timeFrame.timeLeft')}</TimeLeftText>

                            <div className="event-info-wrapper">
                                <EventNameText>{event?.name || ''}</EventNameText>
                            </div>
                            <RegisterButton
                                onClick={() => {
                                    navigate('/events');
                                }}
                            >
                                <ButtonContent>
                                    <ArrowIcon>
                                        <ArrowUpRight />
                                    </ArrowIcon>
                                    <RegisterText>{t('timeFrame.registerButton')}</RegisterText>
                                </ButtonContent>
                            </RegisterButton>
                        </TimeInfoContainer>
                    </LeftSection>

                    <TimerContainer>
                        <TimeUnit>
                            <TimeValue>{formatTime(timeLeft.days)}</TimeValue>
                            <TimeLabel>{t('timeFrame.units.day')}</TimeLabel>
                        </TimeUnit>

                        <Separator>·</Separator>

                        <TimeUnit>
                            <TimeValue>{formatTime(timeLeft.hours)}</TimeValue>
                            <TimeLabel>{t('timeFrame.units.hour')}</TimeLabel>
                        </TimeUnit>

                        <Separator>·</Separator>

                        <TimeUnit>
                            <TimeValue>{formatTime(timeLeft.minutes)}</TimeValue>
                            <TimeLabel>{t('timeFrame.units.minute')}</TimeLabel>
                        </TimeUnit>

                        <Separator>·</Separator>

                        <TimeUnit>
                            <TimeValue>{formatTime(timeLeft.seconds)}</TimeValue>
                            <TimeLabel>{t('timeFrame.units.second')}</TimeLabel>
                        </TimeUnit>
                    </TimerContainer>
                </ContentWrapper>
            </Container>
            <MobileRegisterButton
                onClick={() => {
                    navigate('/events');
                }}
            >
                {t('timeFrame.registerButton')} →
            </MobileRegisterButton>
        </>
    );
}
