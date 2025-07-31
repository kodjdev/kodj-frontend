import themeColors from '@/tools/themeColors';
import styled, { keyframes } from 'styled-components';
import wayuLogo from '@/static/icons/wayu.png';
import lawLogo from '@/static/icons/law.png';
import hansengLogo from '@/static/icons/haksenguz.svg';
import ItParkLogo from '@/static/icons/itpark.svg';

const slideAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const Container = styled.div`
    overflow: hidden;
    padding: ${themeColors.spacing.xxxl} 0;
    background: transparent;
    position: relative;
    margin: 0 -${themeColors.spacing.xl};

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        padding: ${themeColors.spacing.lg} ${themeColors.spacing.md};
        margin: 0 -${themeColors.spacing.md};
    }

    &::before,
    &::after {
        content: '';
        position: absolute;
        top: 0;
        width: 150px;
        height: 100%;
        z-index: 10;
        pointer-events: none;

        @media (max-width: ${themeColors.breakpoints.tablet}) {
            width: 60px;
        }
    }

    &::before {
        left: 0;
        background: linear-gradient(to right, #000000 0%, #000000 40%, transparent 100%);
    }

    &::after {
        right: 0;
        background: linear-gradient(to left, #000000 0%, #000000 40%, transparent 100%);
    }
`;

const SliderWrapper = styled.div`
    display: flex;
    animation: ${slideAnimation} 20s linear infinite;
    width: 200%;
    padding: 0 ${themeColors.spacing.xl};

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        padding: 0 ${themeColors.spacing.md};
        animation: ${slideAnimation} 20s linear infinite;
    }
`;

const Title = styled.h3`
    text-align: center;
    color: ${themeColors.gray_text};
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0.5px;
    padding-bottom: ${themeColors.spacing.xl};

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        margin-bottom: ${themeColors.spacing.lg};
        font-size: 0.75rem;
    }
`;
const LogoItem = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 ${themeColors.spacing.md};

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        padding: 0 ${themeColors.spacing.sm};
        padding-right: ${themeColors.spacing.xs};
        min-width: 70px;
    }
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 50%;
    min-width: 50%;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        justify-content: space-between;
        padding: 0 ${themeColors.spacing.sm};
    }
`;

const LogoSVG = styled.img`
    height: 34px;
    width: auto;
    max-width: 120px;
    opacity: 0.6;
    filter: grayscale(100%) brightness(0) invert(1);
    transition: all 0.3s ease;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        height: 24px;
        max-width: 80px;
    }

    &:hover {
        opacity: 1;
        filter: grayscale(0%) brightness(0) invert(1);
    }
`;

const companies = [
    { name: 'Wayu', logo: wayuLogo },
    { name: '금성', logo: lawLogo },
    { name: 'HaksengUz', logo: hansengLogo },
    { name: 'IT Park', logo: ItParkLogo },
];

export default function PartnersSlider() {
    return (
        <Container>
            <Title>Our partners and sponsors</Title>
            <SliderWrapper>
                <LogoContainer>
                    {companies.map((company, index) => (
                        <LogoItem key={index}>
                            <LogoSVG src={company.logo} alt={company.name} />
                        </LogoItem>
                    ))}
                </LogoContainer>
                <LogoContainer>
                    {companies.map((company, index) => (
                        <LogoItem key={`duplicate-${index}`}>
                            <LogoSVG src={company.logo} alt={company.name} />
                        </LogoItem>
                    ))}
                </LogoContainer>
            </SliderWrapper>
        </Container>
    );
}
