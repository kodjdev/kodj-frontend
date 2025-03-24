import React, { useEffect, useState } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { EventForm } from "./EventForm/EventForm";
import { CustomButton } from "@/components/Button/CustomButton";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import type { FormattedDateTime, RegistrationFormData } from "@/types";
import Step from "@/components/ui/step";
import { useAuth } from "@/context/useAuth";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import Modal from "@/components/ui/modal";
import RightSideDetails from "./RightsideDetails";
import { useTranslation } from "react-i18next";

type FirstStepFields = Pick<
  RegistrationFormData,
  "firstName" | "lastName" | "jobTitle" | "experience" | "email" | "phone"
>;

const formatDate = (
  firebaseDate: { seconds: number; nanoseconds: number } | string
): FormattedDateTime => {
  if (typeof firebaseDate === "string") {
    return {
      date: "No date found",
      time: "No time found",
    };
  }

  const date = new Date(firebaseDate.seconds * 1000);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return {
    date: formattedDate,
    time: formattedTime,
  };
};

export default function EventRegister() {
  const [step, setStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { user, loading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { t } = useTranslation("eventRegister");

  const methods = useForm<RegistrationFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      jobTitle: "",
      experience: "",
      notify: "",
      interestedField: "",
      hopes: "",
      additionalInfo: "",
      eventDetails: {
        title: location.state?.title || "Event",
        date: {
          seconds: location.state?.date?.seconds || 0,
          nanoseconds: location.state?.date?.nanoseconds || 0,
        },
        eventLocation: location.state?.location || "Unknown",
      },
    },
  });

  const state = location.state as
    | {
        title: string;
        date: { seconds: number; nanoseconds: number };
        location: string;
        imageUrl: string;
        author: string;
        eventRoom: string;
        isFull: boolean;
      }
    | undefined;

  const title = state?.title || "Event";
  const eventRoom = state?.eventRoom;
  const eventLocation = state?.location || "Unknown";
  const imageSource = state?.imageUrl || "/pastEvents/past1.jpeg";
  const organizer = state?.author || "KO'DJ";

  const { handleSubmit, trigger, reset } = methods;

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  const handleClick = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("User is not logged in.");
        alert("You need to be logged in to register for the event.");
        navigate("/login");
        return;
      }

      const registrationRef = collection(db, "registrations");
      const q = query(
        registrationRef,
        where("uid", "==", user.uid),
        where("eventDetails.title", "==", data.eventDetails.title)
      );

      const registrationSnapshot = await getDocs(q);
      if (!registrationSnapshot.empty) {
        messageApi.error("You have already registered for the event.");
        return;
      }

      const idToken = await user.getIdToken();

      const response = await fetch(
        import.meta.env.VITE_FIREBASE_REGISTER_EVENT_FUNCTION_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            ...data,
            eventId: id,
          }),
        }
      );

      if (response.ok) {
        setIsModalOpen(true);
        reset();
        setStep(1);
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
      console.error("Error registering user: ", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (step > 1) setStep(step - 1);
  };

  const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (step === 1) {
      const fieldsToValidate: (keyof FirstStepFields)[] = [
        "firstName",
        "lastName",
        "jobTitle",
        "experience",
        "email",
        "phone",
      ];

      const isStepValid = await trigger(fieldsToValidate, {
        shouldFocus: true,
      });

      fieldsToValidate.forEach((field) => {
        trigger(field);
      });

      if (!isStepValid) {
        return;
      }
    }

    if (step < 2) setStep(step + 1);
  };

  const { date: formattedDate } = formatDate(
    location.state?.date || "No Date Found"
  );

  return (
    <>
      {contextHolder}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row justify-center items-center max-w-7xl mx-auto gap-6 py-10 px-4 min-h-[80vh] w-full rounded-lg text-gray-300 space-y-4 md:space-y-0">
            <div className="w-full md:w-1/2 bg-opacity-80 max-w-lg">
              <div className="w-full bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden hover:shadow-blue-900/20 transition-all duration-300">
                <div className="flex justify-between rounded p-8">
                  <div className="flex items-center justify-between w-full">
                    <Step step={1} currentStep={step} />
                    <div className="flex-1 mx-2">
                      <div
                        className={`h-1 ${
                          step > 1 ? "bg-blue-500" : "bg-gray-700"
                        }`}
                      />
                    </div>
                    <Step step={2} currentStep={step} />
                  </div>
                </div>

                <div className="space-y-4 px-8 py-6">
                  <EventForm currentStep={step} />
                </div>

                <div className="px-8 pb-8">
                  <div className="mt-10 flex justify-between">
                    <CustomButton
                      variant="secondary"
                      onClick={handleBack}
                      disabled={step === 1}
                    >
                      Back
                    </CustomButton>

                    {step === 2 ? (
                      <CustomButton
                        type="submit"
                        icon={<FaArrowUpRightFromSquare className="text-xs" />}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting" : "Register"}
                      </CustomButton>
                    ) : (
                      <CustomButton type="button" onClick={handleNext}>
                        Continue
                      </CustomButton>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <RightSideDetails
              imageSource={imageSource}
              title={title}
              formattedDate={formattedDate}
              organizer={organizer}
              eventLocation={eventLocation}
              eventRoom={eventRoom || "Unknown"}
            />
          </div>
        </form>
      </FormProvider>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-8 bg-gray-800 rounded-lg text-gray-200">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">
              {t("successModal.title")}
            </h2>
            <p className="text-gray-400">
              {t("successModal.message", {
                title: methods.getValues("eventDetails.title"),
              })}
            </p>
            <p className="text-gray-600 mb-6 text-center">
              {t("successModal.footer")}
            </p>
            <div className="flex justify-center">
              <CustomButton onClick={handleClick}>OK</CustomButton>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
