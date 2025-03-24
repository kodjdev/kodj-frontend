import React from "react";
import { FaCheck } from "react-icons/fa";
import { StepOneForm } from "@/pages/EventRegister/EventForm/StepOneForm";
import { StepTwoForm } from "@/pages/EventRegister/EventForm/StepTwoForm";
import { useForm, FormProvider } from "react-hook-form";
import type { RegistrationFormData } from "@/types";

interface ProgressStepperProps {
  steps: number;
  currentStep: number;
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full mb-10">
      <div className="flex items-center justify-between">
        {Array.from({ length: steps }).map((_, index) => (
          <React.Fragment key={index}>
            <div className="relative">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                  index < currentStep
                    ? "bg-blue-500"
                    : index === currentStep
                    ? "bg-blue-500"
                    : "bg-gray-700 border border-blue-400"
                }`}
              >
                {index < currentStep ? (
                  <FaCheck className="text-white" />
                ) : (
                  <span className="text-white">{index + 1}</span>
                )}
              </div>
            </div>
            {index < steps - 1 && (
              <div className="flex-1 mx-2">
                <div
                  className={`h-1 ${
                    index < currentStep ? "bg-blue-500" : "bg-gray-700"
                  }`}
                ></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

interface EventFormWithProgressProps {
  currentStep: number;
  onStepComplete: (step: number) => void;
}

export const EventFormWithProgress: React.FC<EventFormWithProgressProps> = ({
  currentStep,
  onStepComplete,
}) => {
  const totalSteps = 2;
  const methods = useForm<RegistrationFormData>();

  const handleSubmit = methods.handleSubmit((data) => {
    if (currentStep === totalSteps) {
      // Handle final form submission
      console.log('Form submitted:', data);
    }
    onStepComplete(currentStep);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto p-6">
        <ProgressStepper steps={totalSteps} currentStep={currentStep} />
        
        <div className="mt-8">
          {currentStep === 1 && <StepOneForm />}
          {currentStep === 2 && <StepTwoForm />}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            {currentStep === totalSteps ? 'Complete' : 'Next Step'}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}; 