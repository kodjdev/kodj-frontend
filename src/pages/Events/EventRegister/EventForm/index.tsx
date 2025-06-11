import styled from 'styled-components';
import StepOneForm from '@/pages/Events/EventRegister/EventForm/StepOneForm';
import StepTwoForm from '@/pages/Events/EventRegister/EventForm/StepTwoForm';

const FormContainer = styled.div`
    width: 100%;
`;

type EventFormProps = {
    currentStep: number;
};

export default function EventForm({ currentStep }: EventFormProps) {
    return (
        <FormContainer>
            {currentStep === 1 && <StepOneForm />}
            {currentStep === 2 && <StepTwoForm />}
        </FormContainer>
    );
}
