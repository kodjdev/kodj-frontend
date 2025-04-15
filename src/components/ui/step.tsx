import React from "react";
import { FaCheck } from "react-icons/fa";

interface StepProps {
  step: number;
  currentStep: number;
}

const Step: React.FC<StepProps> = ({ step, currentStep }) => {
  return (
    <div className="relative">
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full ${
          step < currentStep
            ? "bg-blue-500"
            : step === currentStep
            ? "bg-blue-500"
            : "bg-gray-700 border border-blue-400"
        }`}
      >
        {step < currentStep ? (
          <FaCheck className="text-white" />
        ) : (
          <span className="text-white">{step}</span>
        )}
      </div>
    </div>
  );
};

export default Step;