import { useFormContext } from "react-hook-form";
import type { RegistrationFormData } from "@/types";
import { CustomInput } from "@/components/Input/CustomInput";
import { FormLabel } from "@/components/FormLabel";
import { useTranslation } from "react-i18next";

export const StepOneForm = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<RegistrationFormData>();

  const { t } = useTranslation('eventRegister') ;

  return (
    <div className="space-y-3.5">
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
        <div className="flex flex-col space-y-2 w-full">
          {/* <Label className="text-gray-400 font-semibold">First name</Label> */}
          <FormLabel
            id="firstName"
            htmlFor="firstName"
            labelText={t("formFields.firstName")}
          />
          <CustomInput
            id="firsName"
            placeholder="Aziz"
            error={errors.firstName?.message}
            isValid={watch("firstName")?.length >= 4}
            {...register("firstName", {
              required: t("validation.firstNameRequired"),
              minLength: {
                value: 2,
                message: t("validation.firstNameMinLength"),
              },
            })}
          />
        </div>
        <div className="flex flex-col space-y-2 w-full">
          <FormLabel
            id="lastName"
            htmlFor="lastName"
            labelText={t("formFields.lastName")}
          />
          <CustomInput
            id="lastName"
            placeholder="Botirov"
            error={errors.lastName?.message}
            isValid={watch("lastName")?.length >= 4}
            {...register("lastName", {
              required: t("validation.lastNameRequired"),
              minLength: {
                value: 4,
                message: t("validation.lastNameMinLength"),
              },
            })}
          />
        </div>
      </div>

      <div className="flex flex-col space-y-2 w-full">
        <FormLabel
          id="jobTitle"
          htmlFor="jobTitle"
          labelText={t("formFields.jobTitle")}
        />
        <CustomInput
          id="jobTitle"
          placeholder="Developer | Student | Researcher"
          error={errors.jobTitle?.message}
          isValid={watch("jobTitle")?.length >= 4}
          {...register("jobTitle", {
            required: t("validation.jobTitleRequired"),
            minLength: {
              value: 4,
              message: t("validation.jobTitleMinLength"),
            },
          })}
        />
      </div>
      <div className="flex flex-col space-y-2 w-full">
        <FormLabel
          id="experience"
          htmlFor="experience"
          labelText={t("formFields.experience")}
        />
        <CustomInput
          id="experience"
          placeholder="2 years"
          isValid={watch("experience")?.length >= 1}
          error={errors.experience?.message}
          {...register("experience", {
            required: t("validation.experienceRequired"),
            minLength: {
              value: 2,
              message: t("validation.experienceMinLength"),
            },
          })}
        />
      </div>

      <div className="flex flex-col space-y-2 w-full">
        <FormLabel
          id="email"
          htmlFor="email"
          labelText={t("formFields.email")}
        />
        <CustomInput
          id="email"
          placeholder="teshaboev@gmail.com"
          type="email"
          error={errors.email?.message}
          isValid={watch("email")?.length >= 6}
          {...register("email", {
            required: t("validation.emailRequired"),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t("validation.emailInvalid"),
            },
          })}
        />
      </div>

      <div className="flex flex-col space-y-2 w-full">
        <FormLabel
          id="phone"
          htmlFor="phone"
          labelText={t("formFields.phone")}
        />
        <CustomInput
          id="phone"
          placeholder="010-1234-5678"
          type="tel"
          error={errors.phone?.message}
          isValid={watch("phone")?.length >= 12}
          {...register("phone", {
            required: t("validation.phoneRequired"),
            pattern: {
              value: /^\d{3}-\d{4}-\d{4}$/,
              message: t("validation.phoneInvalid"),
            },
          })}
        />
      </div>
    </div>
  );
};
