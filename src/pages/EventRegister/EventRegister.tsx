import { useEffect, useState } from "react";
import Step from "../../components/ui/step";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { SubmitHandler, Controller } from "react-hook-form";
import { FormattedDateTime, RegistrationFormData } from "../../types";
import { useAuth } from "../../context/useAuth";
import Modal from "../../components/ui/modal";
import { Button } from "../../components/ui/button";
import { getAuth } from "firebase/auth";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { message } from "antd";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import KakaoMap from "../../components/KakaoMap";

type FirstStepFields = Pick<
  RegistrationFormData,
  "firstname" | "lastname" | "jobTitle" | "experience" | "email" | "phone"
>;

export default function EventRegister() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const { user, loading: authLoading } = useAuth();

  const [step, setStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const state = location.state as {
        title: string;
        date: { seconds: number; nanoseconds: number }; 
        location: string;
        imageUrl: string;
        author: string;
        // time: string;
        eventRoom: string;
        eventId: string
      } | undefined;

  const title = state?.title || "Event";
  const date = state?.date || "N/A";
  const eventRoom = state?.eventRoom;
  const eventLocation = state?.location || "Unknown";
  const imageSource = state?.imageUrl || "/pastEvents/past1.jpeg";
  const organizer = state?.author || "KO'DJ";

  const {
    register,
    handleSubmit,
    control,
    reset,
    trigger,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      jobTitle: "",
      experience: "",
      notify: "",
      interestedField: "",
      hopes: "",
      additionalInfo: "",
      eventDetails: {
        title,
        date,
        eventLocation,
      },
    },
  });

  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    // console.log("Form data submitted:", data);
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("User is not logged in.");
        alert("You need to be logged in to register for the event.");
        navigate("/login");
        return;
      }

      // here we check if the user has registered more than once
      const registrationRef = collection(db, "registrations");
      const q = query(
        registrationRef,
        where("uid", "==", user.uid),
        where("eventDetails.title", "==", data.eventDetails.title)
      );

      const registrationSnapshot = await getDocs(q);
      if (!registrationSnapshot.empty) {
        // user already regustered for the event, we return it
        messageApi.error("You have already registered for the event.");
        return;
      }

      const idToken = await user.getIdToken();
      // const decodedToken = JSON.parse(atob(idToken.split('.')[1]));
      // console.log("Decoded Token:", decodedToken);

      const response = await fetch(import.meta.env.VITE_FIREBASE_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsModalOpen(true);
        reset();
        setStep(1); // reset the form
      } else {
        let errorMessage = "An error occurred";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (err) {
          // this will print that the error is not JSON
          console.error("Error parsing error response:", err);
        }
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error registering user: ", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (step > 1) setStep(step - 1);
  };

  // we redirect the user to the login page
  // if they are not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  const handleClick = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  // handleNext birinchi bolib inout valuelarni validate qiladi, togri bo;lsa keyingi etapga o;tadi
  const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (step === 1) {
      const fieldsToValidate: (keyof FirstStepFields)[] = [
        "firstname",
        "lastname",
        "jobTitle",
        "experience",
        "email",
        "phone",
      ] as const;

      // we trigger validation for specific fields (the ones which has errors)
      const isStepValid = await trigger(fieldsToValidate, {
        shouldFocus: true,
      });

      if (!isStepValid) {
        fieldsToValidate.forEach(async (field) => {
          await trigger(field);
        });
        return;
      }
    }

    // If validation passes , keyingi etapga o'tamiz
    if (step < 2) setStep(step + 1);
  };

  const isStepOneValid = () => {
    const firstname = watch("firstname");
    const lastname = watch("lastname");
    const jobTitle = watch("jobTitle");
    const experience = watch("experience");
    const email = watch("email");
    const phone = watch("phone");

    // buyerda hamma input fieldlarga value bormi va validmi tekshriamiz
    return (
      firstname &&
      firstname.length >= 2 &&
      lastname &&
      jobTitle &&
      experience &&
      email &&
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) &&
      phone &&
      /^\d{3}-\d{4}-\d{4}$/.test(phone) &&
      Object.keys(errors).length === 0
    );
  };


  // buyerda date (Timestamp) objectdan vaqt va kunni chiqarib olamiz
  const formatDate = (firebaseDate: { seconds: number; nanoseconds: number } | string): FormattedDateTime => {
    if(typeof firebaseDate === 'string') {
      return {
        date: "No date found",
        time: "No time found"
      }
    }

    const date = new Date(firebaseDate.seconds * 1000);
    
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })

    return {
      date: formattedDate,
      time: formattedTime
    }
  }

  const {date: formattedDate, time: formattedTime} = formatDate(state?.date || "No Date Found");

  return (
    <>
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="flex flex-wrap md:flex-nowrap min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 rounded-lg text-gray-300 shadow-lg"> */}
        <div className="flex flex-col md:flex-row min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 sm:p-8 rounded-lg text-gray-300 shadow-lg space-y-4 md:space-y-0">
          {/* // left side of the page */}
          <div className="w-full md:w-1/2 p-6 bg-opacity-80">
            <div className="w-full bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-lg">
              <div className="flex justify-between rounded p-8">
                <Step step={1} currentStep={step} />
                <Step step={2} currentStep={step} />
              </div>

              {/* // dynamic contnet based on `step` */}
              <div className="space-y-4 px-8 py-6">
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-blue-400 mb-5">
                      {title}
                    </h2>
                    <p className="text-sm text-white mb-7">
                      <span className="text font-bold">Time:</span> {formattedTime}
                      {/* | Location: {location} */}
                    </p>
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer>
                          <Label
                            htmlFor="firstname"
                            className="block mb-2 text-gray-400 font-semibold"
                          >
                            First name
                          </Label>
                          <Input
                            id="firstname"
                            placeholder="Boltavoy"
                            type="text"
                            className={`bg-gray-800 ${
                              errors.firstname
                                ? "border-red-500"
                                : watch("firstname")?.length >= 2
                                ? "border-green-500"
                                : ""
                            }`}
                            {...register("firstname", {
                              required: "First name is required",
                              minLength: {
                                value: 2,
                                message:
                                  "First name must be at least 2 characters",
                              },
                            })}
                          />
                          {errors.firstname && (
                            <span className="text-red-500 text-sm">
                              {errors.firstname.message}
                            </span>
                          )}
                        </LabelInputContainer>
                        <LabelInputContainer>
                          <Label
                            htmlFor="lastname"
                            className="block mb-2 text-gray-400 font-semibold"
                          >
                            Last name
                          </Label>
                          <Input
                            id="lastname"
                            placeholder="Teshaboev"
                            type="text"
                            className={`bg-gray-800 ${
                              errors.lastname
                                ? "border-red-500"
                                : watch("lastname")?.length >= 4
                                ? "border-green-500"
                                : ""
                            }`}
                            {...register("lastname", {
                              required: "First name is required",
                              minLength: {
                                value: 4,
                                message:
                                  "Last name must be at least 4 characters",
                              },
                            })}
                          />
                          {errors.lastname && (
                            <span className="text-red-500 text-sm">
                              {errors.lastname.message}
                            </span>
                          )}
                        </LabelInputContainer>
                      </div>
                      <LabelInputContainer className="mb-4">
                        <Label
                          htmlFor="job"
                          className="block mb-2 text-gray-400 font-semibold"
                        >
                          Job title
                        </Label>
                        <Input
                          id="job"
                          placeholder="Developer | Student | Researcher"
                          type="text"
                          className={`bg-gray-800 ${
                            errors.jobTitle
                              ? "border-red-500"
                              : watch("jobTitle")?.length >= 4
                              ? "border-green-500"
                              : ""
                          }`}
                          {...register("jobTitle", {
                            required: "Job title is required",
                            minLength: {
                              value: 4,
                              message:
                                "Job Title must be at least 4 characters",
                            },
                          })}
                        />
                        {errors.jobTitle && (
                          <span className="text-red-500 text-sm">
                            {errors.jobTitle.message}
                          </span>
                        )}
                      </LabelInputContainer>
                      <LabelInputContainer className="mb-4">
                        <Label
                          htmlFor="experience"
                          className="block mb-2 text-gray-400 font-semibold"
                        >
                          Experience
                        </Label>
                        <Input
                          id="experience"
                          placeholder="2 years"
                          type="text"
                          className={`bg-gray-800 ${
                            errors.experience
                              ? "border-red-500"
                              : watch("experience")?.length >= 2
                              ? "border-green-500"
                              : ""
                          }`}
                          {...register("experience", {
                            required: "Experince is required",
                            minLength: {
                              value: 2,
                              message:
                                "Experience must be at least 2 characters",
                            },
                          })}
                        />
                        {errors.experience && (
                          <span className="text-red-500 text-sm">
                            {errors.experience.message}
                          </span>
                        )}
                      </LabelInputContainer>
                      <LabelInputContainer className="mb-4">
                        <Label
                          htmlFor="email"
                          className="block mb-2 text-gray-400 font-semibold"
                        >
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          placeholder="teshaboev@gmail.com"
                          type="email"
                          className={`bg-gray-800 ${
                            errors.email
                              ? "border-red-500"
                              : watch("email") &&
                                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                  watch("email")
                                )
                              ? "border-green-500"
                              : ""
                          }`}
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                        />
                        {errors.email && (
                          <span className="text-red-500 text-sm">
                            {errors.email.message}
                          </span>
                        )}
                      </LabelInputContainer>
                      <LabelInputContainer className="mb-4">
                        <Label
                          htmlFor="phone"
                          className="block mb-2 text-gray-400 font-semibold"
                        >
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          placeholder="010-1234-5678"
                          type="tel"
                          className={`bg-gray-800 ${
                            errors.phone ? "border-red-500" : ""
                          }`}
                          {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                              value: /^\d{3}-\d{4}-\d{4}$/,
                              message: "Phone number format: 010-1234-5678",
                            },
                          })}
                        />
                        {errors.phone && (
                          <span className="text-red-500 text-sm">
                            {errors.phone.message}
                          </span>
                        )}
                      </LabelInputContainer>
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div>
                    {/* <h2 className="text-lg font-semibold text-gray-700 mb-4">
                                        Additional Details:
                                    </h2> */}
                    <div className="space-y-4">
                      {/* Replace your current LabelInputContainer for "notify" with this */}
                      <LabelInputContainer className="mb-4">
                        <Label
                          htmlFor="notify"
                          className="block mb-2 text-gray-400 font-semibold"
                        >
                          Have you been to our event(s) before?
                        </Label>
                        <Controller
                          control={control}
                          name="notify"
                          rules={{ required: "Please select an option" }}
                          render={({ field: { onChange, value } }) => (
                            <div className="space-y-3">
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  id="first-time"
                                  value="first-time"
                                  checked={value === "first-time"}
                                  onChange={() => onChange("first-time")}
                                  className="w-4 h-4 bg-gray-800 border-2 border-gray-400 text-blue-500 rounded-full checked:bg-white checked:border-white"
                                />
                                <Label
                                  htmlFor="first-time"
                                  className="text-gray-200"
                                >
                                  First time
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  id="several-times"
                                  value="several-times"
                                  checked={value === "several-times"}
                                  onChange={() => onChange("several-times")}
                                  className="w-4 h-4 bg-gray-800 border-2 border-gray-400 text-blue-500 rounded-full checked:bg-white checked:border-white"
                                />
                                <Label
                                  htmlFor="several-times"
                                  className="text-gray-200"
                                >
                                  No, I have before (several times)
                                </Label>
                              </div>
                            </div>
                          )}
                        />
                        {errors.notify && (
                          <span className="text-red-500 text-sm">
                            {errors.notify.message}
                          </span>
                        )}
                      </LabelInputContainer>
                      <Label
                        htmlFor="notify"
                        className="block mb-2 text-gray-400 font-semibold"
                      >
                        Which field(s) are you interested in ?xs
                      </Label>
                      <div className="flex flex-col space-y-2 overflow-hidden space-x-0">
                        <Controller
                          control={control}
                          name="interestedField"
                          rules={{ required: "Please select an option" }}
                          render={({ field }) => (
                            <Select
                              value={field.value}
                              onValueChange={(selected) =>
                                field.onChange(selected)
                              }
                            >
                              <SelectTrigger className="w-[250px] bg-gray-800">
                                <SelectValue
                                  placeholder="Fields"
                                  className="bg-gray-800"
                                />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800">
                                <SelectItem value="ai" className="text-white">
                                  AI & ML
                                </SelectItem>
                                <SelectItem
                                  value="backend"
                                  className="text-white"
                                >
                                  Backend Development
                                </SelectItem>
                                <SelectItem
                                  value="frontend"
                                  className="text-white"
                                >
                                  Frotend Development
                                </SelectItem>
                                <SelectItem value="UI" className="text-white">
                                  UI/UX Design
                                </SelectItem>
                                <SelectItem
                                  value="mobile"
                                  className="text-white"
                                >
                                  Mobile Development
                                </SelectItem>
                                <SelectItem
                                  value="cloud"
                                  className="text-white"
                                >
                                  Cloud Computing
                                </SelectItem>
                                <SelectItem
                                  value="cyber"
                                  className="text-white"
                                >
                                  Cybersecurity
                                </SelectItem>
                                <SelectItem
                                  value="block"
                                  className="text-white"
                                >
                                  Blockchain
                                </SelectItem>
                                <SelectItem value="game" className="text-white">
                                  Game Development
                                </SelectItem>
                                <SelectItem value="data" className="text-white">
                                  Data Science
                                </SelectItem>
                                <SelectItem value="web" className="text-white">
                                  Web Development
                                </SelectItem>
                                <SelectItem
                                  value="devops"
                                  className="text-white"
                                >
                                  DevOps
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.interestedField && (
                          <span className="text-red-500 text-sm">
                            {errors.interestedField.message}
                          </span>
                        )}
                      </div>
                      <Label
                        htmlFor="additionalInfo"
                        className="block mb-2 text-gray-400 font-semibold"
                      >
                        What do you hope to gain from attending?
                      </Label>
                      <Controller
                        control={control}
                        name="hopes"
                        rules={{
                          required: "Please select at least one option",
                        }}
                        render={({ field: { onChange, value } }) => (
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="networking"
                                value="networking"
                                checked={value === "networking"}
                                onChange={() => onChange("networking")}
                                className="w-4 h-4 bg-gray-800 border-2 border-gray-400 text-blue-500 rounded-full checked:bg-white checked:border-white"
                              />
                              <label
                                htmlFor="networking"
                                className="flex items-center text-gray-200"
                              >
                                <span className="text-sm">Networking</span>
                              </label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="learning"
                                value="learning"
                                checked={value === "learning"}
                                onChange={() => onChange("learning")}
                                className="w-4 h-4 bg-gray-800 border-2 border-gray-400 text-blue-500 rounded-full checked:bg-white checked:border-white"
                              />
                              <label
                                htmlFor="learning"
                                className="flex items-center text-gray-200"
                              >
                                <span className="text-sm">Learning</span>
                              </label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="jobOpportunities"
                                value="jobOpportunities"
                                checked={value === "jobOpportunities"}
                                onChange={() => onChange("jobOpportunities")}
                                className="w-4 h-4 bg-gray-800 border-2 border-gray-400 text-blue-500 rounded-full checked:bg-white checked:border-white"
                              />
                              <label
                                htmlFor="jobOpportunities"
                                className="flex items-center text-gray-200"
                              >
                                <span className="text-sm">
                                  Job opportunities
                                </span>
                              </label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="others"
                                value="others"
                                checked={value === "others"}
                                onChange={() => onChange("others")}
                                className="w-4 h-4 bg-gray-800 border-2 border-gray-400 text-blue-500 rounded-full checked:bg-white checked:border-white"
                              />
                              <label
                                htmlFor="others"
                                className="flex items-center text-gray-200"
                              >
                                <span className="text-sm">Others</span>
                              </label>
                            </div>
                          </div>
                        )}
                      />
                      {errors.hopes && (
                        <span className="text-red-500 text-sm">
                          {errors.hopes.message}
                        </span>
                      )}
                      <Label
                        htmlFor="email"
                        className="block mb-2 text-gray-400 font-semibold"
                      >
                        What are you looking forward to the most?
                      </Label>
                      <textarea
                        placeholder="Please write your short answer here"
                        rows={2}
                        className="w-full px-4 py-2 rounded-md border border-gray-100 focus:outline-none text-white bg-gray-800"
                        {...register("additionalInfo", {
                          required: "Please write your short answer here",
                        })}
                      ></textarea>
                      <Controller
                        control={control}
                        name="consent"
                        defaultValue={false}
                        rules={{ required: "You must agree to proceed" }}
                        render={({ field: { onChange, value } }) => (
                          <div className="flex items-start bg-gray-700 p-4 border-gray-500 rounded">
                            <input
                              type="checkbox"
                              id="consent"
                              // we add a checked state
                              checked={value}
                              onChange={(e) => onChange(e.target.checked)}
                              className="form-checkbox h-6 w-6 text-blue-400 border-gray-300 rounded focus:ring-blue-500 text-blue-400 inline-block mr-2 mt-1"
                            />
                            <Label
                              htmlFor="consent"
                              className="text-gray-500 ml-2 mt-1 text-ms leading-tight"
                            >
                              I understand that my information will be used for
                              event registration purposes only.
                            </Label>
                          </div>
                        )}
                      />
                      {errors.consent && (
                        <span className="text-red-500 text-sm">
                          {errors.consent.message}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* // next and back buttons */}
              <div className="px-8 pb-8">
                <div className="mt-10 flex justify-between">
                  <button
                    onClick={handleBack}
                    className={`${
                      step === 1 ? "pointer-events-none opacity-50" : ""
                    } duration-350 rounded px-2 py-1 text-neutral-400 transition hover:text-neutral-700`}
                  >
                    Back
                  </button>
                  {step === 2 ? (
                    <button
                      type="submit"
                      className="font-medium text-white bg-blue-700 border border-blue-700 py-1.5 px-3.5 rounded-full flex items-center hover:bg-white hover:text-blue-700 transition-colors duration-300"
                    >
                      <FaArrowUpRightFromSquare className="flex-none mr-3 ml-1 m text-xs" />
                      <span>Register</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className={`font-medium text-white bg-blue-700 border border-blue-700 py-1.5 px-3.5 rounded-full flex items-center hover:bg-white hover:text-blue-700 transition-colors duration-300 ${
                        !isStepOneValid() ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={!isStepOneValid()}
                    >
                      Continue
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* // right side of the page */}
          <div className="w-full md:w-1/2 p-6 bg-opacity-80">
            <div className="w-full max-w-md p-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-lg">
              <img
                src={imageSource}
                alt={title}
                // className="w-full h-60 object-cover rounded-lg mb-6"
                className="w-full h-40 sm:h-60 object-cover rounded-lg mb-4 sm:mb-6"
                width={500}
                height={500}
              />
              <h2 className="text-2xl font-bold text-blue-400 mb-5">{title}</h2>
              {/* <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-lg text-gray-700"> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 text-lg text-gray-700">
                <div className="flex flex-col">
                  <strong className="text-md text-blue-400 mb-1">Date:</strong>
                  <p className="text-sm text-white">
                      {formattedDate}
                  </p>
                </div>
                <div className="flex flex-col">
                  <strong className="text-md text-blue-400 mb-1">
                    Organizer:
                  </strong>
                  <p className="text-sm text-white">{organizer}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full h-52 rounded-md overflow-hidden mb-4">
                 <KakaoMap address={eventLocation} eventRoom={eventRoom}/>
                 <a
                    href={`https://map.kakao.com/link/search/${encodeURIComponent(
                      eventLocation
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-3 mb-3 text-blue-500 hover:underline"
                  >
                    View on Kakao Map
                  </a>
                </div>
                <div className="flex flex-col">
                  <strong className="text-blue-400 mb-1">Location:</strong>
                  <p className="text-sm text-gray-300 font-bold mb-2">
                    {eventLocation}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">{eventRoom}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-8 bg-gray-800 rounded-lg text-gray-200">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">
              Registration Successful
            </h2>
            <p className="text-gray-400">
              Your registration for <strong>{title}</strong> has been submitted
              successfully.
            </p>
            <p className="text-gray-600 mb-6 text-center">
              We look forward to seeing you at the event.
            </p>
            <div className="flex justify-center">
              <Button onClick={handleClick}>OK</Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
