import { StepOneForm } from "./StepOneForm";
import { StepTwoForm } from "./StepTwoForm";

interface EventFormProps {
  currentStep: number;
}

export const EventForm = ({ currentStep }: EventFormProps) => {
  return (
    <div className="w-full">
      {/* form step rendering with errors */}
      {currentStep === 1 && <StepOneForm />}
      {currentStep === 2 && <StepTwoForm />}
    </div>
  );
};

