import { CustomButton } from "@/components/Button/CustomButton";
import { CustomInput } from "@/components/Input/CustomInput";
import Modal from "@/components/ui/modal";
import { SpeakerRegistration } from "@/types";
import React, { useState } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import theme from "@/tools/theme";
import { Spin } from "antd";
import { FormLabel } from "@/components/FormLabel";

export default function SpeakersRegister() {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    jobPosition: "",
    phone: "",
    yearsOfExperience: "",
    expertiseField: "",
    topics: "",
    linkedinUrl: "",
    githubUrl: "",
    portfolioUrl: "",
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useFormContext<SpeakerRegistration>();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { i18n, t } = useTranslation("speakers");

  const onSubmit: SubmitHandler<SpeakerRegistration> = async (data) => {
    try {
      setIsLoading(true);
      // we saubmit the data to fireastore
      const response = await fetch(
        import.meta.env.VITE_FIREBASE_REGISTER_SPEAKER_FUNCTION_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            createdAt: new Date().toISOString(),
          }),
        }
      );

      if (response.ok) {
        setIsLoading(false);
        setIsModalOpen(true);
        setFormData({
          email: "",
          fullName: "",
          jobPosition: "",
          phone: "",
          yearsOfExperience: "",
          expertiseField: "",
          topics: "",
          linkedinUrl: "",
          githubUrl: "",
          portfolioUrl: "",
        });
      } else {
        let errorMessage = "An error occurred";
        try {
          setIsLoading(false);
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (err) {
          console.error("Error parsing error response:", err);
        }
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error registering speaker: ", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleClick = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50 text-blue-600 text-md">
  //       <Spin tip="Wait a little bit" size="large"></Spin>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">
            <span className="text-white">{"> "}</span>
            {i18n.language === "uz" ? (
              <>
                <span className="bg-gray-200 px-2">KO'DJ</span>&nbsp;ga&nbsp;
                {t("titleStart")} {t("titleEnd")}
              </>
            ) : (
              <>
                {t("titleStart")}{" "}
                <span className="bg-gray-200 px-2">KO'DJ</span> {t("titleEnd")}
              </>
            )}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
        {/* // form  */}
        <div
          className="max-w-3xl mx-auto rounded-lg p-8 shadow-lg relative"
          style={{ backgroundColor: theme.gray_background }}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10 rounded-lg">
              <Spin
                tip="Wait a little bit"
                size="large"
                className="text-blue-600"
              />
            </div>
          )}
          <h2 className="text-2xl font-bold text-white mb-6">
            🔉 {t("applyToSpeak")}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col space-y-2 w-full">
                <FormLabel
                  id="fullName"
                  htmlFor="fullName"
                  labelText={t("formFields.fullName")}
                />
                <CustomInput
                  id="fullName"
                  placeholder="Botirov Nodirbek"
                  error={errors.fullname?.message}
                  isValid={watch("fullname")?.length >= 4}
                  {...register("fullname", {
                    required: t("validation.fullNameRequired"),
                    minLength: {
                      value: 2,
                      message: t("validation.fullNameMinLength"),
                    },
                  })}
                />
              </div>
              <div className="flex flex-col space-y-2 w-full">
                <FormLabel
                  id="jobPosition"
                  htmlFor="jobPosition"
                  labelText={t("formFields.jobPosition")}
                />
                <CustomInput
                  id="jobPosition"
                  placeholder="Senior Ai Engineer"
                  error={errors.jobPosition?.message}
                  isValid={watch("jobPosition")?.length >= 4}
                  {...register("jobPosition", {
                    required: t("validation.jobPositionRequired"),
                    minLength: {
                      value: 2,
                      message: "Job position is required field.",
                    },
                  })}
                />
              </div>
              {/* <div> */}
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
                      value: /^\d{3}\d{4}\d{4}$/,
                      message: t("validation.phoneFormat"),
                    },
                  })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2 w-full">
                  <FormLabel
                    id="yearsOfExperience"
                    htmlFor="yearsOfExperience"
                    labelText={t("formFields.yearsOfExperience")}
                  />
                  <select
                    id="yearsOfExperience"
                    {...register("yearsOfExperience", {
                      required: t("validation.yearsOfExperienceRequired"),
                    })}
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-700 rounded-md py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ backgroundColor: theme.gray_inputTag_background }}
                  >
                    <option value="">
                      {t("experienceOptions.selectExperience")}
                    </option>
                    <option value="0-1">
                      {t("experienceOptions.lessThanOneYear")}
                    </option>
                    <option value="1-3">
                      {t("experienceOptions.oneToThreeYears")}
                    </option>
                    <option value="3-5">
                      {t("experienceOptions.threeToFiveYears")}
                    </option>
                    <option value="5-10">
                      {t("experienceOptions.fiveToTenYears")}
                    </option>
                    <option value="10+">
                      {t("experienceOptions.moreThanTenYears")}
                    </option>
                  </select>
                  {errors.yearsOfExperience && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.yearsOfExperience.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-2 w-full">
                  <FormLabel
                    id="expertiseField"
                    htmlFor="expertiseField"
                    labelText={t("formFields.expertiseField")}
                  />
                  <select
                    id="expertiseField"
                    {...register("expertiseField", {
                      required: t("validation.expertiseFieldRequired"),
                    })}
                    name="expertiseField"
                    value={formData.expertiseField}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-700 rounded-md py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ backgroundColor: theme.gray_inputTag_background }}
                  >
                    <option value="">
                      {t("expertiseOptions.selectField")}
                    </option>
                    <option value="frontend">Frontend Development</option>
                    <option value="backend">Backend Development</option>
                    <option value="fullstack">Full Stack Development</option>
                    <option value="mobile">Mobile Development</option>
                    <option value="devops">DevOps</option>
                    <option value="data">Data Science/Engineering</option>
                    <option value="ai">AI/Machine Learning</option>
                    <option value="blockchain">Blockchain</option>
                    <option value="security">Cybersecurity</option>
                    <option value="gamedev">Game Development</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.expertiseField && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.expertiseField.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col space-y-2 w-full">
                <FormLabel
                  id="topics"
                  htmlFor="topics"
                  labelText={t("formFields.topics")}
                />
                <textarea
                  id="topics"
                  {...register("topics", {
                    required: t("validation.topicsRequired"),
                    minLength: {
                      value: 10,
                      message: t("validation.topicsMinLength"),
                    },
                  })}
                  name="topics"
                  value={formData.topics}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full border border-gray-700 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: theme.gray_inputTag_background }}
                  placeholder="Please describe specific themes or topics you would like to cover in our meetups"
                ></textarea>
                {errors.topics && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.topics.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-2 w-full">
                <FormLabel
                  id="linkedinUrl"
                  htmlFor="linkedinUrl"
                  labelText={t("formFields.linkedinUrl")}
                />
                <CustomInput
                  id="linkedinUrl"
                  placeholder="linkedin.com"
                  type="linkedin"
                  error={errors.linkedinUrl?.message}
                  isValid={watch("linkedinUrl")?.length >= 12}
                  {...register("linkedinUrl", {
                    required: t("validation.linkedinUrlFormat"),
                    pattern: {
                      value:
                        /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
                      message: t("validation.linkedinUrlFormat"),
                    },
                  })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2 w-full">
                  <FormLabel
                    id="githubUrl"
                    htmlFor="githubUrl"
                    labelText={t("formFields.githubUrl")}
                  />
                  <CustomInput
                    id="githubUrl"
                    placeholder="github.com"
                    type="github"
                    error={errors.githubUrl?.message}
                    isValid={watch("githubUrl")?.length >= 12}
                    {...register("githubUrl", {
                      required: t("validation.githubUrlFormat"),
                      pattern: {
                        value:
                          /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/,
                        message: t("validation.githubUrlFormat"),
                      },
                    })}
                  />
                </div>

                <div className="flex flex-col space-y-2 w-full">
                  <FormLabel
                    id="portfolioUrl"
                    htmlFor="portfolioUrl"
                    labelText={t("formFields.portfolioUrl")}
                  />
                  <CustomInput
                    id="portfolioUrl"
                    placeholder="portfolio.com"
                    type="portfolio"
                    error={errors.portfolioUrl?.message}
                    isValid={watch("portfolioUrl")?.length >= 12}
                    {...register("portfolioUrl", {
                      required: t("validation.portfolioUrlFormat"),
                      pattern: {
                        value:
                          /^https?:\/\/(www\.)?[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}(\/.*)?$/,
                        message: t("validation.portfolioUrlFormat"),
                      },
                    })}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-md transition duration-300 transform hover:scale-105"
                style={{ backgroundColor: theme.blue_dark_background }}
              >
                {/* Submit Application */}
                {t("formFields.submitButton")}
              </button>
            </div>
          </form>
        </div>

        <div
          className="max-w-3xl mx-auto mt-16 rounded-lg p-8 shadow-lg"
          style={{ backgroundColor: theme.gray_background }}
        >
          <h2 className="text-2xl font-bold text-blue-400 mb-6">
            {t("whyBecomeSpeaker.title")}
          </h2>

          <ul className="space-y-4">
            {t("whyBecomeSpeaker.reasons", { returnObjects: true }).map(
              (reason: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>{reason}</span>
                </li>
              )
            )}
          </ul>
          <p className="mt-6 text-gray-300">
            {t("whyBecomeSpeaker.conclusion")}
          </p>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-8 bg-gray-800 rounded-lg text-gray-200">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">
              {t("successModal.title")}
            </h2>
            <p className="text-gray-400">
              {/* Your registration <span></span>
              has been submitted successfully. */}
              {t("successModal.message")}
            </p>
            <p className="text-gray-600  mt-3 mb-4 text-center">
              {t("successModal.footer")}
            </p>
            <div className="flex justify-center">
              <CustomButton onClick={handleClick}>
                {t("successModal.button")}
              </CustomButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
