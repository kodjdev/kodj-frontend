import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import React from 'react';
import themeColors from '@/tools/themeColors';

const ProgressContainer = styled.div`
    width: 100%;
    margin-bottom: ${themeColors.spacing.xl};
`;

const StepperWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const StepCircle = styled.div<{ isCompleted: boolean; isCurrent: boolean }>`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: ${({ isCompleted, isCurrent }) =>
        isCompleted || isCurrent ? themeColors.colors.secondary : themeColors.colors.primary.light};
    border: ${({ isCompleted, isCurrent }) =>
        !isCompleted && !isCurrent ? `1px solid ${themeColors.colors.secondary}` : 'none'};
    color: white;
`;

const ProgressLine = styled.div<{ isCompleted: boolean }>`
    flex: 1;
    height: 4px;
    margin: 0 ${themeColors.spacing.sm};
    background-color: ${({ isCompleted }) =>
        isCompleted ? themeColors.colors.secondary : themeColors.colors.primary.light};
`;

export default function ProgressStep({ steps, currentStep }: { steps: number; currentStep: number }) {
    return (
        <ProgressContainer>
            <StepperWrapper>
                {Array.from({ length: steps }).map((_, index) => (
                    <React.Fragment key={index}>
                        <StepCircle isCompleted={index < currentStep} isCurrent={index === currentStep}>
                            {index < currentStep ? <FaCheck /> : <span>{index + 1}</span>}
                        </StepCircle>
                        {index < steps - 1 && <ProgressLine isCompleted={index < currentStep} />}
                    </React.Fragment>
                ))}
            </StepperWrapper>
        </ProgressContainer>
    );
}
