import themeColors from '@/tools/themeColors';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

const GlobalMaintenanceStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
`;

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const MaintenanceContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 110vh;
    background: ${themeColors.colors.black.background};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    overflow: hidden;
    padding: ${themeColors.spacing.md};
`;

const ContentWrapper = styled.div`
    position: relative;
    z-index: 1;
    text-align: center;
    padding: ${themeColors.spacing.xl};
    max-width: 600px;
    width: 100%;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: ${themeColors.spacing.md};
    }
`;

const Logo = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${themeColors.colors.neutral.white};
    color: ${themeColors.colors.neutral.black};
    padding: ${themeColors.spacing.sm} ${themeColors.spacing.lg};
    border-radius: ${themeColors.cardBorder.md};
    font-size: ${themeColors.typography.presets.font20.fontSize}px;
    font-weight: ${themeColors.typography.presets.font20.fontWeight};
    letter-spacing: 2px;
    box-shadow: ${themeColors.shadows.elevation.high};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.presets.font16.fontSize}px;
        padding: ${themeColors.spacing.xs} ${themeColors.spacing.md};
    }
`;

const StatusMessage = styled.div`
    background: linear-gradient(135deg, ${themeColors.colors.primary.main}15, ${themeColors.colors.secondary.main}10);
    background-size: 200% 200%;
    animation: ${gradientShift} 8s ease infinite;
    border: 1px solid ${themeColors.colors.gray.line}30;
    border-radius: ${themeColors.cardBorder.xl};
    padding: ${themeColors.spacing.lg} ${themeColors.spacing.xl};
    margin-bottom: ${themeColors.spacing.xl};
    backdrop-filter: blur(10px);

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: ${themeColors.spacing.md} ${themeColors.spacing.lg};
        margin-bottom: ${themeColors.spacing.lg};
    }
`;

const StatusText = styled.p`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    line-height: ${themeColors.typography.body.medium.lineHeight};
    margin: 0;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.body.small.fontSize}px;
    }
`;

const ContactText = styled.p`
    color: ${themeColors.colors.gray.label};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    margin: 0;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.body.xsmall.fontSize}px;
    }

    a {
        color: ${themeColors.colors.primary.main};
        text-decoration: none;
        transition: color ${themeColors.animation.duration.fast} ease;

        &:hover {
            color: ${themeColors.colors.primary.light};
        }
    }
`;
const BackgroundPattern = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
        radial-gradient(circle at 20% 50%, ${themeColors.colors.primary.main}20 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, ${themeColors.colors.secondary.main}15 0%, transparent 50%),
        radial-gradient(circle at 40% 20%, ${themeColors.colors.primary.dark}10 0%, transparent 50%);
    filter: blur(40px);
    opacity: 0.5;
`;

const LogoWrapper = styled.div`
    margin-bottom: ${themeColors.spacing.xl};
`;

const MainTitle = styled.h2`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.headings.desktop.h2.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h2.fontWeight};
    line-height: ${themeColors.typography.headings.desktop.h2.lineHeight};
    margin: 0 0 ${themeColors.spacing.md} 0;
    letter-spacing: -1px;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        font-size: ${themeColors.typography.headings.mobile.h1.fontSize}px;
    }
`;

const SubTitle = styled.h2`
    color: ${themeColors.colors.gray.text};
    font-size: ${themeColors.typography.body.large.fontSize}px;
    font-weight: 400;
    line-height: ${themeColors.typography.body.large.lineHeight};
    margin: 0 0 ${themeColors.spacing.xl} 0;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        font-size: ${themeColors.typography.body.medium.fontSize}px;
    }
`;

const LoadingDots = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${themeColors.spacing.sm};
    margin-top: ${themeColors.spacing.xl};
`;

const Dot = styled.div<{ delay: number }>`
    width: 12px;
    height: 12px;
    background: ${themeColors.colors.primary.main};
    border-radius: 50%;
    animation-delay: ${(props) => props.delay}s;
`;

const ContactInfo = styled.div`
    margin-top: 100px;
    padding-top: ${themeColors.spacing.xl};
    border-top: 1px solid ${themeColors.colors.gray.line}20;
`;

const ProgressBarWrapper = styled.div`
    width: 100%;
    height: 4px;
    background: ${themeColors.colors.gray.line}20;
    border-radius: ${themeColors.cardBorder.pill};
    overflow: hidden;
    margin-top: ${themeColors.spacing.xl};
`;

const ProgressBar = styled.div`
    height: 100%;
    width: 60%;
    background: linear-gradient(90deg, ${themeColors.colors.primary.main}, ${themeColors.colors.primary.light});
    border-radius: ${themeColors.cardBorder.pill};
    animation: ${pulse} 2s ease-in-out infinite;
`;

export default function UnderMaintenance() {
    return (
        <>
            <GlobalMaintenanceStyles />
            <MaintenanceContainer>
                <BackgroundPattern />
                <ContentWrapper>
                    <LogoWrapper>
                        <Logo>KO'DJ</Logo>
                    </LogoWrapper>

                    <MainTitle>Tizim yangilanmoqda</MainTitle>
                    <SubTitle>We're making things better for you</SubTitle>

                    <StatusMessage>
                        <StatusText>
                            Saytimiz hozirda texnik xizmat ko'rsatish jarayonida. Tez orada qaytib kelamiz!
                        </StatusText>
                        <StatusText style={{ marginTop: themeColors.spacing.md }}>
                            Our website is currently undergoing maintenance. We'll be back shortly!
                        </StatusText>
                    </StatusMessage>

                    <ProgressBarWrapper>
                        <ProgressBar />
                    </ProgressBarWrapper>

                    <LoadingDots>
                        <Dot delay={0} />
                        <Dot delay={0.2} />
                        <Dot delay={0.4} />
                    </LoadingDots>

                    <ContactInfo>
                        <ContactText>
                            Savollar uchun / For questions: <a href="mailto:teamkodj@gmail.com">teamkodj@gmail.com</a>
                        </ContactText>
                    </ContactInfo>
                </ContentWrapper>
            </MaintenanceContainer>
        </>
    );
}
