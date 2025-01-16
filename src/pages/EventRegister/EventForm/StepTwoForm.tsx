import { Label } from "@/components/Label";
import { useFormContext, Controller } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { RegistrationFormData } from "@/types";
import { CustomRadio } from "@/components/Button/CustomRadio";

export const StepTwoForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<RegistrationFormData>();

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 w-full">
        <Label htmlFor="notify" className="text-gray-400 font-semibold">
          Have you been to our event(s) before?
        </Label>
        <Controller
          control={control}
          name="notify"
          rules={{ required: "Please select an option" }}
          render={({ field: { onChange, value } }) => (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CustomRadio
                  type="radio"
                  id="first-time"
                  value="first-time"
                  checked={value === "first-time"}
                  onChange={() => onChange("first-time")}
                //   label="First Time"
                />
                <Label htmlFor="first-time" className="text-gray-200">
                  First time
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <CustomRadio
                  type="radio"
                  id="several-times"
                  value="several-times"
                  checked={value === "several-times"}
                  onChange={() => onChange("several-times")}
                //   label="No, I have before (several times)"
                />
                <Label htmlFor="several-times" className="text-gray-200">
                  No, I have before (several times)
                </Label>
              </div>
            </div>
          )}
        />
        {errors.notify && (
          <span className="text-red-500 text-sm">{errors.notify.message}</span>
        )}
      </div>

      <div className="flex flex-col space-y-2 w-full">
        <Label className="text-gray-400 font-semibold">Fields of Interest</Label>
        <Controller
          control={control}
          name="interestedField"
          rules={{ required: "Please select an option" }}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(selected) => field.onChange(selected)}
            >
              <SelectTrigger className="w-full bg-gray-800">
                <SelectValue placeholder="Select field" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800">
                <SelectItem value="ai" className="text-white">AI & ML</SelectItem>
                <SelectItem value="backend" className="text-white">Backend Development</SelectItem>
                <SelectItem value="frontend" className="text-white">Frontend Development</SelectItem>
                <SelectItem value="UI" className="text-white">UI/UX Design</SelectItem>
                <SelectItem value="mobile" className="text-white">Mobile Development</SelectItem>
                <SelectItem value="cloud" className="text-white">Cloud Computing</SelectItem>
                <SelectItem value="cyber" className="text-white">Cybersecurity</SelectItem>
                <SelectItem value="block" className="text-white">Blockchain</SelectItem>
                <SelectItem value="game" className="text-white">Game Development</SelectItem>
                <SelectItem value="data" className="text-white">Data Science</SelectItem>
                <SelectItem value="web" className="text-white">Web Development</SelectItem>
                <SelectItem value="devops" className="text-white">DevOps</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.interestedField && (
          <span className="text-red-500 text-sm">{errors.interestedField.message}</span>
        )}
      </div>

      <div className="flex flex-col space-y-2 w-full">
        <Label className="text-gray-400 font-semibold">What do you hope to gain from attending?</Label>
        <Controller
          control={control}
          name="hopes"
          rules={{ required: "Please select an option" }}
          render={({ field: { onChange, value } }) => (
            <div className="space-y-3">
              {["networking", "learning", "jobOpportunities", "others"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <CustomRadio
                    type="radio"
                    id={option}
                    value={option}
                    checked={value === option}
                    onChange={() => onChange(option)}
                  />
                  <Label htmlFor={option} className="text-gray-200">
                    {option === "jobOpportunities" ? "Job opportunities" : 
                     option.charAt(0).toUpperCase() + option.slice(1)}
                  </Label>
                </div>
              ))}
            </div>
          )}
        />
        {errors.hopes && (
          <span className="text-red-500 text-sm">{errors.hopes.message}</span>
        )}
      </div>

      <div className="flex flex-col space-y-2 w-full">
        <Label htmlFor="additionalInfo" className="text-gray-400 font-semibold">
          What are you looking forward to the most?
        </Label>
        <textarea
          placeholder="Please write your short answer here"
          rows={2}
          className="w-full px-4 py-2 rounded-md border border-gray-100 focus:outline-none text-white bg-gray-800"
          {...register("additionalInfo", {
            required: "Please write your short answer here",
          })}
        />
        {errors.additionalInfo && (
          <span className="text-red-500 text-sm">{errors.additionalInfo.message}</span>
        )}
      </div>

      <div className="flex flex-col space-y-2 w-full">
        <Controller
          control={control}
          name="consent"
          defaultValue={false}
          rules={{ required: "You must agree to proceed" }}
          render={({ field: { onChange, value } }) => (
            <div className="flex items-start bg-gray-700 p-4 border-gray-500 rounded">
              <CustomRadio
                type="checkbox"
                id="consent"
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
                className="form-checkbox h-6 w-6 text-blue-400 border-gray-300 rounded focus:ring-blue-500 inline-block mr-2 mt-1"
                // label="I understand that my information will be used for event registration purposes only."
              />
              <Label htmlFor="consent" className="text-gray-500 ml-2 mt-1 text-ms leading-tight">
                I understand that my information will be used for event registration purposes only.
              </Label>
            </div>
          )}
        />
        {errors.consent && (
          <span className="text-red-500 text-sm">{errors.consent.message}</span>
        )}
      </div>
    </div>
  );
};