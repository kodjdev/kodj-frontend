import { Label } from "@/components/Label";
import { useFormContext } from "react-hook-form";
import type { RegistrationFormData } from "@/types";
import { CustomInput } from "@/components/Input/CustomInput";
import { Input } from "antd";

export const StepOneForm = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<RegistrationFormData>();

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
        <div className="flex flex-col space-y-2 w-full">
          <Label className="text-gray-400 font-semibold">First name</Label>
          <CustomInput
            id="firstname"
            placeholder="Boltavoy"
            error={errors.firstname?.message}
            isValid={watch("firstname")?.length >= 4}
            {...register("firstname", {
              required: "First name is required",
              minLength: {
                value: 2,
                message: "First name must be at least 2 characters",
              },
            })}
          />
        </div>
        <div className="flex flex-col space-y-2 w-full">
          <Label className="text-gray-400 font-semibold">Last name</Label>
          <CustomInput
            id="lastname"
            placeholder="Teshaboev"
            error={errors.lastname?.message}
            isValid={watch("lastname")?.length >= 4}
            {...register("lastname", {
              required: "Last name is required",
              minLength: {
                value: 4,
                message: "Last name must be at least 4 characters",
              },
            })}
          />
        </div>
      </div>

      <div className="flex flex-col space-y-2 w-full">
        <Label className="text-gray-400 font-semibold">Job Title</Label>
        <CustomInput
          id="jobTitle"
          placeholder="Developer | Student | Researcher"
          error={errors.jobTitle?.message}
          isValid={watch("jobTitle")?.length >= 4}
          {...register("jobTitle", {
            required: "Job title is required",
            minLength: {
              value: 4,
              message: "Job Title must be at least 4 characters",
            },
          })}
        />
      </div>
      <div className="flex flex-col space-y-2 w-full">
        <Label className="text-gray-400 font-semibold">Experience</Label>
        <CustomInput
          id="experience"
          placeholder="2 years"
          isValid={watch("experience")?.length >= 1}
          error={errors.experience?.message}
          {...register("experience", {
            required: "Experience is required",
            minLength: {
              value: 2,
              message: "Experience must be at least 2 characters",
            },
          })}
        />
      </div>

      <div className="flex flex-col space-y-2 w-full">
        <Label className="text-gray-400 font-semibold">Email Address</Label>
        <CustomInput
          id="email"
          placeholder="teshaboev@gmail.com"
          type="email"
          error={errors.email?.message}
          isValid={watch("email")?.length >= 6}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
      </div>

      <div className="flex flex-col space-y-2 w-full">
        <Label className="text-gray-400 font-semibold">Phone Number</Label>
        <CustomInput
          id="phone"
          placeholder="010-1234-5678"
          type="tel"
          error={errors.phone?.message}
          isValid={watch("phone")?.length >= 12}
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^\d{3}-\d{4}-\d{4}$/,
              message: "Phone number format: 010-1234-5678",
            },
          })}
        />
      </div>
    </div>
  );
};
