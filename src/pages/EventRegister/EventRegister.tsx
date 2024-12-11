import { useEffect, useState } from "react";
import Step from "../../components/ui/step";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { SubmitHandler, Controller, useForm } from "react-hook-form";
import { RegistrationFormData } from "../../types";
import { useAuth } from "../../context/useAuth";
import Modal from "../../components/ui/modal";
import { Button } from "../../components/ui/button";
import { getAuth } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { message } from "antd";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

export default function EventRegister() {
  // const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { user, loading: authLoading } = useAuth();
  const state = location.state as
    | {
        title: string;
        date: string;
        location: string;
        imageUrl: string;
        author: string;
        time: string;
        eventRoom: string;
      }
    | undefined;

  const title = state?.title || "Event";
  const date = state?.date || "N/A";
  const eventRoom = state?.eventRoom;
  const eventLocation = state?.location || "Unknown";
  const imageSource = state?.imageUrl || "/pastEvents/past1.jpeg";
  const organizer = state?.author || "KO'DJ";
  const time = state?.time || "1:00 PM - 5:00 PM";

  const [step, setStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormData>({
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

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (step < 2) setStep(step + 1);
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

  return (
    <>
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* // aspect-square object-cover object-center rounded-sm transition-all duration-200 */}
        <div className="flex flex-wrap md:flex-nowrap min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 rounded-lg text-gray-300 shadow-lg">
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
                    {/* <h1 className="text-2xl font-bold text-blue-600 mb-5">
                                        <span className="text-blue-600"> Registration: </span>
                                    </h1> */}
                    <h2 className="text-2xl font-bold text-blue-400 mb-5">
                      {title}
                    </h2>
                    <p className="text-sm text-gray-400 mb-7">
                      <span className="text font-bold">Time:</span> {time}
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
                            placeholder="Bolta"
                            type="text"
                            className="bg-gray-800"
                            {...register("firstname", {
                              required: "First name is required",
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
                            className="text-dark-400 bg-gray-800"
                            id="lastname"
                            placeholder="Teshaboev"
                            type="text"
                            {...register("lastname", {
                              required: "Last name is required",
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
                          className="bg-gray-800"
                          {...register("jobTitle", {
                            required: "Job title is required",
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
                          placeholder="Experience"
                          type="text"
                          className="bg-gray-800"
                          {...register("experience", {
                            required: "Experience is required",
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
                          className="bg-gray-800"
                          {...register("email", {
                            required: "Email is required",
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
                          className="bg-gray-800"
                          {...register("phone", {
                            required: "Phone number is required",
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
                          render={({ field }) => (
                            <RadioGroup
                              {...field}
                              onValueChange={(value) => field.onChange(value)}
                              value={field.value}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="first-time"
                                  id="first-time"
                                />
                                <Label
                                  htmlFor="first-time"
                                  className="text-gray-200"
                                >
                                  First time
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="several-times"
                                  id="several-times"
                                />
                                <Label
                                  htmlFor="several-times"
                                  className="text-gray-200"
                                >
                                  No, I have before (several times)
                                </Label>
                              </div>
                            </RadioGroup>
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
                      <div className="flex flex-col space-y-2">
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
                        render={({ field }) => (
                          <RadioGroup
                            {...field}
                            onValueChange={(values) => field.onChange(values)}
                            value={field.value}
                            // defaultValue=""
                            // {...register("hopes", {required: "Please write your short answer here"})}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="networking"
                                id="networking"
                                className="text-white bg-transparent border-white focus:ring-0 focus:ring-offset-0 checked:bg-white checked:border-white"
                              />
                              <label
                                htmlFor="first-time"
                                className="flex items-center text-gray-200"
                              >
                                <span className="text-sm">Networking</span>
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="learning"
                                id="learning"
                                className="text-white bg-transparent border-white focus:ring-0 focus:ring-offset-0 checked:bg-white checked:border-white"
                              />
                              <label
                                htmlFor="second-time"
                                className="flex items-center text-gray-200"
                              >
                                <span className="text-sm">Learning</span>
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="jobOpportunities"
                                id="jobOpportunities"
                                className="text-white bg-transparent border-white focus:ring-0 focus:ring-offset-0 checked:bg-white checked:border-white"
                              />
                              <label
                                htmlFor="second-time"
                                className="flex items-center text-gray-200"
                              >
                                <span className="text-sm">
                                  Job opportunities
                                </span>
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="others"
                                id="others"
                                className="text-white bg-transparent border-white focus:ring-0 focus:ring-offset-0 checked:bg-white checked:border-white"
                              />
                              <label
                                htmlFor="second-time"
                                className="flex items-center text-gray-200"
                              >
                                <span className="text-sm">Others</span>
                              </label>
                            </div>
                          </RadioGroup>
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
                        className="w-full px-4 py-2 rounded-md border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-800"
                        {...register("additionalInfo", {
                          required: "Please write your short answer here",
                        })}
                      ></textarea>
                      <Controller
                        control={control}
                        name="consent"
                        defaultValue={false}
                        rules={{ required: "You must agree to proceed" }}
                        render={({ field }) => (
                          <div className="flex items-start">
                            <Checkbox
                              id="consent"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="text-blue inline-block mr-2 mt-2"
                            />
                            <Label
                              htmlFor="consent"
                              className="text-gray-500 ml-1 text-xs leading-tight"
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
                      className="font-medium text-white bg-blue-700 border border-blue-700 py-1.5 px-3.5 rounded-full flex items-center hover:bg-white hover:text-blue-700 transition-colors duration-300"
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
                className="w-full h-60 object-cover rounded-lg mb-6"
                width={500}
                height={500}
              />
              <h2 className="text-2xl font-bold text-blue-400 mb-5">{title}</h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-lg text-gray-700">
                <div className="flex flex-col">
                  <strong className="text-md text-blue-400 mb-1">Date:</strong>
                  <p className="text-sm text-gray-400">{ typeof date === "string"
                        ? date
                        : new Date(date * 1000).toDateString()}</p>
                </div>
                <div className="flex flex-col">
                  <strong className="text-md text-blue-400 mb-1">
                    Organizer:
                  </strong>
                  <p className="text-sm text-gray-400">{organizer}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full h-52 rounded-md overflow-hidden mb-4">
                  <img
                    src={"/events/event.png"}
                    alt="Google Maps"
                    className="rounded-md"
                    width={400}
                    height={400}
                  />
                </div>
                <div className="flex flex-col">
                  <strong className="text-blue-400 mb-1">Location:</strong>
                  <p className="text-sm text-gray-400 font-bold mb-2">
                    {eventRoom ||
                      "스페이스쉐어 삼성역센터 (삼성역 도보 3분) 갤럭시홀"}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">{eventLocation}</p>
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
