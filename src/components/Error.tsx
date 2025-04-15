import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import themeColors from "@/tools/themeColors";

const ErrorPageContainer = styled.div`
  min-height: 100vh;
  background-color: ${themeColors.colors.neutral.black};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
`;

const ContentWrapper = styled.div`
  max-width: 32rem;
  width: 100%;
  text-align: center;
  margin-top: -20rem;
`;

const ErrorCode = styled(motion.h1)`
  font-size: 9rem;
  font-weight: 700;
  color: ${themeColors.colors.primary.main};
`;

const ErrorTitle = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 500;
  color: ${themeColors.colors.neutral.white};
  margin-top: 1rem;
  
  @media (min-width: 768px) {
    font-size: 1.875rem;
  }
`;

const ErrorDescription = styled(motion.p)`
  color: ${themeColors.colors.gray.main};
  margin-top: 1rem;
  font-size: 1.125rem;
`;

const BackButton = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  background-color: ${themeColors.colors.primary.main};
  color: ${themeColors.colors.neutral.white};
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  margin-top: 2rem;
  transition: background-color 0.2s;
  text-decoration: none;
  
  &:hover {
    background-color: ${themeColors.colors.primary.dark};
  }
`;

const ArrowIcon = styled(FiArrowLeft)`
  font-size: 1.25rem;
  margin-right: 0.5rem;
`;

const Error: React.FC = () => {
  return (
    <ErrorPageContainer>
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ErrorCode>404</ErrorCode>
          <ErrorTitle>Page Not Found</ErrorTitle>
          <ErrorDescription>
            The page you're looking for doesn't exist or has been moved.
          </ErrorDescription>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <BackButton to="/">
              <ArrowIcon />
              <span>Back to Home</span>
            </BackButton>
          </motion.div>
        </motion.div>
      </ContentWrapper>
    </ErrorPageContainer>
  );
};

export default Error;