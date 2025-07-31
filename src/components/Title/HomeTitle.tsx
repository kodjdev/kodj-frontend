import styled from 'styled-components';
import themeColors from '@/tools/themeColors';

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0 24px;
    position: relative;
    z-index: ${themeColors.zIndex.nav};

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        margin: 15px 0 20px;
    }
`;

const MainTitle = styled.h1`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.headings.tablet.h1.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h1.fontWeight};
    line-height: ${themeColors.typography.headings.desktop.h1.lineHeight};
    letter-spacing: ${themeColors.typography.headings.desktop.h1.letterSpacing}px;
    text-align: center;
    margin: 0;
    padding: 0 10px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        font-size: ${themeColors.typography.headings.tablet.h1.fontSize}px;
        white-space: normal;
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: 28px;
        line-height: 1.2;
        gap: 2px;
    }
`;

const StaticTitle = styled.span`
    color: ${themeColors.colors.neutral.white};
    display: inline-block;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        hyphens: auto;
        word-break: break-word;
    }
`;

const HighlightWord = styled.span`
    color: ${themeColors.colors.primary.main};
    display: inline-block;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        margin-top: 5px;
    }
`;

/**
 * HomeTitle Component
 * @description A component that renders the main title for the home page of our website.
 */
export default function HomeTitle() {
    return (
        <TitleContainer>
            <MainTitle>
                <StaticTitle>Koreya O'zbek Dasturchilar</StaticTitle> <HighlightWord>Jamiyati.</HighlightWord>
            </MainTitle>
        </TitleContainer>
    );
}
