import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import telegram from "@/static/assets/kodj_telegram.jpg";
import themeColors from "@/tools/themeColors";

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1.25rem;
  width: 100%;
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  cursor: pointer;
`;

const QRImage = styled.img`
  width: 300px;
  height: 300px;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 0.125rem;
  transition: all 0.2s ease;
`;

const ExpandedOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ExpandedImageContainer = styled(motion.div)`
  position: relative;
  width: 80%;
  max-width: 500px; // Added max-width
  max-height: 500px; // Added max-height
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: ${themeColors.breakpoints.mobile}) {
    width: 60%;
    height: 60%;
  }

  @media (min-width: ${themeColors.breakpoints.tablet}) {
    width: 50%;
    height: 50%;
  }

  @media (min-width: ${themeColors.breakpoints.laptop}) {
    width: 40%;
    height: 40%;
  }
`;

const ExpandedImage = styled.img`
  border-radius: 1rem;
  width: 100%;
  height: auto;
  object-fit: contain;
`;

export default function QrCodeCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle expanded view
  const toggleExpandedView = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <CardContainer>
      <ImageContainer
        onClick={toggleExpandedView}
        initial={{ filter: "blur(8px)" }}
        whileHover={{ filter: "blur(0px)" }}
      >
        <QRImage src={telegram} alt="telegram" width={300} height={300} />
      </ImageContainer>

      <AnimatePresence>
        {isExpanded && (
          <ExpandedOverlay
            onClick={toggleExpandedView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ExpandedImageContainer
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <ExpandedImage src={telegram} alt="telegram" />
            </ExpandedImageContainer>
          </ExpandedOverlay>
        )}
      </AnimatePresence>
    </CardContainer>
  );
}
