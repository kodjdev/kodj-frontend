import { useFormContext } from "react-hook-form";
import { StepOneForm } from "./StepOneForm";
import { StepTwoForm } from "./StepTwoForm";
import type { RegistrationFormData } from "@/types";

interface EventFormProps {
  currentStep: number;
}

export const EventForm = ({ currentStep }: EventFormProps) => {
  const {
    formState: { errors },
  } = useFormContext<RegistrationFormData>();

  return (
    <div className="w-full">
      {/* // form step rendering with errors */}
      {currentStep === 1 && <StepOneForm />}
      {currentStep === 2 && <StepTwoForm />}

      {Object.keys(errors).length > 0 && (
        <div className="text-red-500 mt-4">
          Please fix the errors above to continue
        </div>
      )}

      {/* // bu esa optional  */}
      {/* {isSubmitting && (
        <div className="mt-4">
          Submitting...
        </div>
      )} */}
    </div>
  );
};
