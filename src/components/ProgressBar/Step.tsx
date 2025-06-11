import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import themeColors from '@/tools/themeColors';

type StepProps = {
    step: number;
    currentStep: number;
};

const StepCircle = styled.div<{ isCompleted: boolean; isCurrent: boolean }>`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: ${({ isCompleted, isCurrent }) =>
        isCompleted ? themeColors.blue : isCurrent ? themeColors.blue : themeColors.gray_background};
    border: ${({ isCompleted, isCurrent }) => (!isCompleted && !isCurrent ? `1px solid ${themeColors.blue}` : 'none')};
    color: ${themeColors.white};
    font-weight: ${themeColors.font14_bold.fontWeight};
    font-size: ${themeColors.font14.fontSize}px;
`;

export default function Step({ step, currentStep }: StepProps) {
    const isCompleted = step < currentStep;
    const isCurrent = step === currentStep;

    return (
        <StepCircle isCompleted={isCompleted} isCurrent={isCurrent}>
            {isCompleted ? <FaCheck /> : <span>{step}</span>}
        </StepCircle>
    );
}
