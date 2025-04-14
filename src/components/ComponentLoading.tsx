import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import themeColors from "@/tools/themeColors";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh; 
  background-color: ${themeColors.colors.gray || "transparent"};
`;

const Spinner = styled(motion.div)`
  width: 4rem;
  height: 4rem;
  border: 4px solid transparent;
  border-top-color: ${themeColors.colors.primary.main};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export default function ComponentLoading() {
  return (
    <LoadingWrapper>
      <Spinner
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </LoadingWrapper>
  );
}
