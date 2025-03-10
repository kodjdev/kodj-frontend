import { FormProvider, useForm } from "react-hook-form";
import SpeakersRegister from "./SpeakerRegister";
import { SpeakerRegistration } from "@/types";

export default function SpeakerRegistrationForm() {
  const methods = useForm<SpeakerRegistration>({
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      jobPosition: "",
      topics: "",
      expertiseField: "",
      linkedinUrl: "",
      githubUrl: "",
      portfolioUrl: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <SpeakersRegister />
    </FormProvider>
  );
}
