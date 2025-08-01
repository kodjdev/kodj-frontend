import styled from 'styled-components';
import { motion } from 'framer-motion';
import themeColors from '@/tools/themeColors';
import speakerImage from '@/static/icons/rocket.jpg';
import Button from '@/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BannerContainer = styled(motion.div)`
    background-color: ${themeColors.colors.gray.dark};
    border-radius: ${themeColors.radiusSizes.xl};
    padding: 0;
    margin: ${themeColors.spacing.fourXl} 0;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: stretch;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background:
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.03) 2px, transparent 2px),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.03) 1.5px, transparent 1.5px),
            radial-gradient(circle at 40% 70%, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        pointer-events: none;
    }

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        flex-direction: column;
        min-height: auto;
        margin: ${themeColors.spacing.xl} 0;
        border-radius: ${themeColors.radiusSizes.lg};
    }
`;

const BannerTitle = styled.h4`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.headings.desktop.h4.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h4.fontWeight};
    margin: 0 0 ${themeColors.spacing.lg} 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    line-height: 1.2;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        font-size: ${themeColors.typography.headings.mobile.h2.fontSize}px;
        text-align: left;
    }
`;

const ContentSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 2;
    margin-top: 0;
    padding: 24px;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        padding: ${themeColors.spacing.lg};
        text-align: left;
        order: 1;
    }
`;

const HighlightText = styled.span`
    color: #ffd700;
    font-weight: 800;
`;

const BannerDescription = styled.p`
    color: rgba(255, 255, 255, 0.9);
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    line-height: ${themeColors.typography.body.medium.lineHeight};
    margin: 0 0 ${themeColors.spacing.xl} 0;
    max-width: 550px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        font-size: ${themeColors.typography.body.small.fontSize}px;
        max-width: 100%;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        justify-content: center;
        width: 100%;
    }
`;

const ImageSection = styled.div`
    flex: 0 0 400px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 0 20px 20px 0;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        flex: none;
        width: 100%;
        height: 200px;
        border-radius: 0 0 ${themeColors.radiusSizes.lg} ${themeColors.radiusSizes.lg};
        order: 2;
    }
`;
const StyledButton = styled(Button)`
    background: ${themeColors.colors.neutral.white} !important;
    font-weight: 600;
    border-radius: ${themeColors.radiusSizes.md};
    text-transform: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
        background: #f5f5f5 !important;
    }

    &:active {
        transform: translateY(0);
    }

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        width: 100% !important;
        max-width: none !important;
    }
`;

const SpeakerImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        object-fit: cover;
        height: 100%;
    }
`;

const ImageFallback = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    border-radius: 0 20px 20px 0;
    backdrop-filter: blur(10px);
    font-size: 4rem;
    opacity: 0.7;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        border-radius: 0 0 20px 20px;
    }
`;

export default function SpeakerRegistrationBanner() {
    const { t } = useTranslation('benefits');
    const navigate = useNavigate();

    return (
        <BannerContainer initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <ContentSection>
                <BannerTitle>
                    {t('speakerBanner.titleBefore')} <HighlightText>{t('speakerBanner.titleHighlight')}</HighlightText>{' '}
                    {t('speakerBanner.titleAfter')}
                </BannerTitle>
                <BannerDescription>
                    <span>{t('speakerBanner.communityName')}</span> {t('speakerBanner.inviteText')}{' '}
                    <strong>{t('speakerBanner.fieldText')}</strong> {t('speakerBanner.registerText')}
                </BannerDescription>
                <ButtonWrapper>
                    <StyledButton
                        onClick={() => navigate('/speakers/register')}
                        size="md"
                        variant="light"
                        htmlType="button"
                    >
                        {t('speakerBanner.applyButton')}
                    </StyledButton>
                </ButtonWrapper>
            </ContentSection>

            <ImageSection>
                <SpeakerImage
                    src={speakerImage}
                    alt="Speaker presenting"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const sibling = e.currentTarget.nextElementSibling as HTMLElement;
                        if (sibling) {
                            sibling.style.display = 'flex';
                        }
                    }}
                />
                <ImageFallback style={{ display: 'none' }}>🎤</ImageFallback>
            </ImageSection>
        </BannerContainer>
    );
}
