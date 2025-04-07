import { useFormContext, Controller } from "react-hook-form";
import type { RegistrationFormData } from "@/types";
import { useTranslation } from "react-i18next";
import theme from "@/tools/themeColors";
import { SelectField } from "@/components/Form/SelectFields";
import { FormField } from "@/components/Form/FormField";

export const StepTwoForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<RegistrationFormData>();

  const { t } = useTranslation("eventRegister");

  const validateMinLength = (value: string) => {
    return value.trim().length >= 15 || t("validation.additionalInfoMinLength");
  };

  const validateNotJustWhitespace = (value: string) => {
    return /\S/.test(value) || t("validation.additionalInfoNoEmptySpace");
  };

  const validateNotRepeatedChars = (value: string) => {
    const trimmed = value.trim();
    const uniqueChars = new Set(trimmed.split("")).size;
    return (
      uniqueChars >= Math.max(3, Math.floor(trimmed.length * 0.3)) ||
      t("validation.additionalInfoMeaningful")
    );
  };

  const fieldOptions = [
    { value: "ai", label: t("fieldOptions.ai") },
    { value: "backend", label: t("fieldOptions.backend") },
    { value: "frontend", label: t("fieldOptions.frontend") },
    { value: "UI", label: t("fieldOptions.UI") },
    { value: "mobile", label: t("fieldOptions.mobile") },
    { value: "cloud", label: t("fieldOptions.cloud") },
    { value: "cyber", label: t("fieldOptions.cyber") },
    { value: "block", label: t("fieldOptions.block") },
    { value: "game", label: t("fieldOptions.game") },
    { value: "data", label: t("fieldOptions.data") },
    { value: "web", label: t("fieldOptions.web") },
    { value: "devops", label: t("fieldOptions.devops") },
  ];

  const attendanceOptions = [
    { value: "first-time", label: t("formFields.firstTime") },
    { value: "several-times", label: t("formFields.severalTimes") },
  ];

  const hopeOptions = [
    { value: "networking", label: t("formFields.networking") },
    { value: "learning", label: t("formFields.learning") },
    { value: "jobOpportunities", label: t("formFields.jobOpportunities") },
    { value: "others", label: t("formFields.others") },
  ];

  return (
    <div className="space-y-3.5">
      <Controller
        control={control}
        name="notify"
        rules={{ required: t("validation.notifyRequired") }}
        render={({ field, fieldState: { error } }) => (
          <FormField
            id="notify"
            label={t("formFields.attendedBefore")}
            required
            error={error?.message}
          >
            <SelectField
              value={field.value}
              onChange={(value) => field.onChange(value)}
              options={attendanceOptions}
              placeholder={t("fieldOptions.selectField")}
            />
          </FormField>
        )}
      />

      <Controller
        control={control}
        name="interestedField"
        rules={{ required: t("validation.interestedFieldRequired") }}
        render={({ field, fieldState: { error } }) => (
          <FormField
            id="interestedField"
            label={t("formFields.interestedField")}
            required
            error={error?.message}
          >
            <SelectField
              value={field.value}
              onChange={(value) => field.onChange(value)}
              options={fieldOptions}
              placeholder={t("fieldOptions.selectField")}
            />
          </FormField>
        )}
      />

      <Controller
        control={control}
        name="hopes"
        rules={{ required: t("validation.hopesRequired") }}
        render={({ field, fieldState: { error } }) => (
          <FormField
            id="hopes"
            label={t("formFields.hopes")}
            required
            error={error?.message}
          >
            <SelectField
              value={field.value}
              onChange={(value) => field.onChange(value)}
              options={hopeOptions}
              placeholder={t("fieldOptions.selectField")}
            />
          </FormField>
        )}
      />

      <FormField
        id="additionalInfo"
        label={t("formFields.additionalInfo")}
        required
        error={errors.additionalInfo?.message}
      >
        <textarea
          id="additionalInfo"
          rows={4}
          placeholder={t("formFields.additionalInfoPlaceholder")}
          className="w-full px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-blue-500 text-gray-200"
          style={{ backgroundColor: theme.gray_inputTag_background }}
          {...register("additionalInfo", {
            required: t("validation.additionalInfoRequired"),
            validate: {
              minLength: validateMinLength,
              notJustWhitespace: validateNotJustWhitespace,
              notRepeatedChars: validateNotRepeatedChars,
            },
          })}
        />
      </FormField>

      <Controller
        control={control}
        name="consent"
        defaultValue={false}
        rules={{ required: t("validation.consentRequired") }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <div className="bg-gray-800 bg-opacity-60 p-2 rounded-md border border-gray-700">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                  className="mt-1 mr-3 h-5 w-5 text-blue-500 rounded border-gray-400 focus:ring-blue-500"
                />
                <span>
                  <span className="text-gray-300 text-sm">
                    {t("formFields.consent")}
                  </span>
                </span>
              </label>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-500">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};
