import { CustomButton } from "@/components/Button/CustomButton";
import { CustomInput } from "@/components/Input/CustomInput";
import Modal from "@/components/ui/modal";
import { SpeakerRegistration } from "@/types";
import React, { useState } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import theme from "@/tools/theme";

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

  const { i18n, t } = useTranslation("speakers" as any);

  const onSubmit: SubmitHandler<SpeakerRegistration> = async (data) => {
    try {
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
          className="max-w-3xl mx-auto rounded-lg p-8 shadow-lg"
          style={{ backgroundColor: theme.gray_background }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            🔉 {t("applyToSpeak")}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col space-y-2 w-full">
                <label
                  htmlFor="fullName"
                  className="block mb-2"
                  style={{ color: theme.gray_label_tag_color }}
                >
                  {/* Full Name * */}
                  {t("formFields.fullName")}
                </label>{" "}
                <CustomInput
                  id="fullname"
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
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2"
                  style={{ color: theme.gray_label_tag_color }}
                >
                  {/* Current Job Position */}
                  {t("formFields.jobPosition")}
                </label>
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
                <label
                  htmlFor="fullName"
                  className="block mb-2"
                  style={{ color: theme.gray_label_tag_color }}
                >
                  {/* Phone Number */}
                  {t("formFields.phone")}
                </label>
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
                      message: t("validation.phoneFormat"),
                    },
                  })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="yearsOfExperience"
                    className="block  mb-2"
                    style={{ color: theme.gray_label_tag_color }}
                  >
                    {t("formFields.yearsOfExperience")}
                  </label>
                  <select
                    id="yearsOfExperience"
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-700 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                </div>

                <div>
                  <label
                    htmlFor="formFields.expertiseField"
                    className="block mb-2"
                    style={{ color: theme.gray_label_tag_color }}
                  >
                    {/* Field of Expertise * */}
                    {t("formFields.expertiseField")}
                  </label>
                  <select
                    id="expertiseField"
                    name="expertiseField"
                    value={formData.expertiseField}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-700 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                </div>
              </div>

              <div>
                <label
                  htmlFor="topics"
                  className="block mb-2"
                  style={{ color: theme.gray_label_tag_color }}
                >
                  {t("formFields.topics")}
                </label>
                <textarea
                  id="topics"
                  name="topics"
                  value={formData.topics}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full border border-gray-700 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: theme.gray_inputTag_background }}
                  placeholder="Please describe specific themes or topics you would like to cover in our meetups"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="linkedinUrl"
                  className="block mb-2"
                  style={{ color: theme.gray_label_tag_color }}
                >
                  {t("formFields.linkedinUrl")}
                </label>
                <input
                  type="url"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  className="w-full border border-gray-700 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: theme.gray_inputTag_background }}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="githubUrl"
                    className="block mb-2"
                    style={{ color: theme.gray_label_tag_color }}
                  >
                    {t("formFields.githubUrl")}
                  </label>
                  <input
                    type="url"
                    id="githubUrl"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleChange}
                    className="w-full border border-gray-700 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    style={{ backgroundColor: theme.gray_inputTag_background }}
                    placeholder="https://github.com/yourusername"
                  />
                </div>

                <div>
                  <label
                    htmlFor="formFields.portfolioUrl"
                    className="block mb-2"
                    style={{ color: theme.gray_label_tag_color }}
                  >
                    {t("formFields.portfolioUrl")}
                  </label>
                  <input
                    type="url"
                    id="portfolioUrl"
                    name="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={handleChange}
                    className="w-full border border-gray-700 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ backgroundColor: theme.gray_inputTag_background }}
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 transform hover:scale-105"
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
