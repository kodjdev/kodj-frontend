import React from 'react';
import styled from 'styled-components';
import themeColor from '@/tools/themeColors';
import CheckIcon from '@/components/Icons/CheckIcon';

export type ProgressStepperProps = {
    steps: number;
    activeStep: number;
    className?: string;
};

const StepperContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: ${themeColor.spacing.xxl};
`;

const StepConnector = styled.div<{ isActive: boolean }>`
    flex: 1;
    height: 2px;
    background-color: ${(props) => (props.isActive ? themeColor.colors.primary.main : '#666')};
`;

const StepItem = styled.div<{ status: 'completed' | 'active' | 'pending' }>`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    ${(props) => {
        switch (props.status) {
            case 'completed':
                return `
          background-color: ${themeColor.colors.primary.main};
          color: ${themeColor.colors.neutral.white};
        `;
            case 'active':
                return `
          background-color: #333;
          color: ${themeColor.colors.neutral.white};
          border: 2px solid ${themeColor.colors.primary.main};
        `;
            default: // 'pending'
                return `
          background-color: #333;
          color: ${themeColor.colors.gray.text};
          border: 2px solid #666;
        `;
        }
    }}
`;

/**
 * ProgressShow - Molecule Component
 * @param steps - Total number of steps in the process
 * @param activeStep - Current active step (zero-based index)
 * @param className - Additional CSS classes for styling
 */
export default function ProgressShow({ steps, activeStep, className }: ProgressStepperProps) {
    return (
        <StepperContainer className={className}>
            {Array.from({ length: steps }).map((_, index) => {
                let status: 'completed' | 'active' | 'pending';
                if (index < activeStep) {
                    status = 'completed';
                } else if (index === activeStep) {
                    status = 'active';
                } else {
                    status = 'pending';
                }

                return (
                    <React.Fragment key={index}>
                        <StepItem status={status}>
                            {status === 'completed' ? <CheckIcon width={16} height={16} /> : index + 1}
                        </StepItem>

                        {index < steps - 1 && <StepConnector isActive={index < activeStep} />}
                    </React.Fragment>
                );
            })}
        </StepperContainer>
    );
}
