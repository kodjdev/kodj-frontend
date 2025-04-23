import styled from 'styled-components';
import createGlobe from 'cobe';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import KodTitle from '@/components/Title/HomeTitle';
import themeColors from '@/tools/themeColors';
import QrCodeCard from '@/pages/Home/CommunityCard/QrcodeCard';

const MainCardContainer = styled.div`
    position: relative;
    z-index: 1;
    max-width: 1440px;
    margin: 0 auto;
`;

const ContentWrapper = styled.div`
    padding: 0 30px;
    position: relative;
    z-index: 10;
`;

const Heading = styled.h4`
    font-size: ${themeColors.typography.headings.tablet.h4.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h4.fontWeight};
    line-height: ${themeColors.typography.headings.desktop.h4.lineHeight};
    max-width: 90%;
    margin: 0 auto;
    text-align: center;
    letter-spacing: -0.025em;
    color: ${themeColors.colors.gray.main};
`;

const FeaturesGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    margin-top: 3rem;
    border-radius: 8px 8px 8px 8px;
    border: 0.5px solid ${themeColors.cardBorder.color};
    margin-bottom: 50px;
    position: relative;

    @media (min-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
        & > div:first-child {
            border-right: 0.5px solid ${themeColors.cardBorder.color};
        }
    }
`;

const FeatureCardWrapper = styled.div`
    padding: 1rem;
    position: relative;
    overflow: hidden;

    @media (min-width: 640px) {
        padding: 2rem;
    }

    ${(props) => props.className && props.className}
`;

const FeatureTitleText = styled.p`
    max-width: 64rem;
    margin: 0 auto;
    text-align: left;
    letter-spacing: -0.025em;
    color: white;
    font-size: 1.25rem;

    @media (min-width: 768px) {
        font-size: 1.5rem;
        line-height: 1.375;
    }
`;

const FeatureDescriptionText = styled.p`
    font-size: ${themeColors.typography.body.small.fontSize}px;
    color: ${themeColors.colors.gray.main};
    max-width: 24rem;
    text-align: left;
    margin: 0.5rem 0;
    font-weight: normal;

    @media (min-width: 768px) {
        font-size: 0.875rem;
    }
`;

const GlobeContainer = styled.div`
    height: 15rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    background-color: transparent;
    margin-top: 2.5rem;

    @media (min-width: 768px) {
        height: 15rem;
    }
`;

const CanvasWrapper = styled.canvas`
    width: 600px;
    height: 600px;
    max-width: 100%;
    aspect-ratio: 1;
    position: absolute;
    right: -2.5rem;
    bottom: -20rem;

    @media (min-width: 768px) {
        right: -2.5rem;
        bottom: -18rem;
    }
`;

/**
 * Main Card Component - Part of Home Page
 * @description MainCard component that displays a title, heading, and a grid of features.
 * The features are displayed in a grid layout, with each feature having a title, description, and a skeleton.
 */
export default function CommunityCard() {
    const { t } = useTranslation('home');

    const features = [
        {
            title: t('featuresSection.feature1.title'),
            description: t('featuresSection.feature1.description'),
            skeleton: <QrCodeCard />,
            className: 'lg-col-span-3 lg-border-r',
        },
        {
            title: t('featuresSection.feature2.title'),
            description: t('featuresSection.feature2.description'),
            skeleton: <SkeletonFour />,
            className: 'lg-col-span-3 border-b lg-border-none',
        },
    ];

    return (
        <MainCardContainer>
            <ContentWrapper>
                <KodTitle />
                <Heading>{t('headingTitle')}</Heading>
            </ContentWrapper>

            <FeaturesGrid>
                {features.map((feature) => (
                    <FeatureCard key={feature.title} className={feature.className}>
                        <FeatureTitle>{feature.title}</FeatureTitle>
                        <FeatureDescription>{feature.description}</FeatureDescription>
                        <div style={{ height: '100%', width: '100%' }}>{feature.skeleton}</div>
                    </FeatureCard>
                ))}
            </FeaturesGrid>
        </MainCardContainer>
    );
}

const FeatureCard = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
    return <FeatureCardWrapper className={className}>{children}</FeatureCardWrapper>;
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
    return <FeatureTitleText>{children}</FeatureTitleText>;
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
    return <FeatureDescriptionText>{children}</FeatureDescriptionText>;
};

export const SkeletonFour = () => {
    return (
        <GlobeContainer>
            <Globe />
        </GlobeContainer>
    );
};

export const Globe = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        let phi = 0;

        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 600 * 2,
            height: 600 * 2,
            phi: 0,
            theta: 0,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.1, 0.8, 1],
            glowColor: [1, 1, 1],
            markers: [
                // longitude latitude
                { location: [37.7595, -122.4367], size: 0.1 },
                { location: [35.9078, 127.7669], size: 0.1 },
                { location: [41.2995, 69.2401], size: 0.1 },
            ],
            onRender: (state) => {
                // `state` will be an empty object, return updated params.
                state.phi = phi;
                phi += 0.01;
            },
        });

        return () => {
            globe.destroy();
        };
    }, []);

    return <CanvasWrapper ref={canvasRef} />;
};
