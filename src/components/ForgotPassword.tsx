import { useState } from "react";
import { auth, sendPasswordResetEmail } from "../firebase/firebaseConfig";
import { message } from "antd";
import { HiOutlineMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button/Button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      message.success("Password reset email sent! Please check your inbox.");
      //  we clear the input field
      setEmail("");
      setTimeout(() => {
        navigate("/");
      }, 2000);
      return;
    } catch (error) {
      message.error("Error sending password reset email. Please try again.");
      console.error("Error sending password reset email:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 relative mt-[-100px]">
        <div className="w-full max-w-md p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-20">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-500 transition"
            >
              &#8592;
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-500 transition"
            >
              &#x2715;
            </button>
          </div>
          <h2 className="text-2xl font-semibold mb-6">Forgot Password</h2>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <p className="text-white text-md mb-5">
              Enter the email address and
              <span className="text-gray-500">
                {" "}
                we’ll send an email with confirmation to reset your password
              </span>
            </p>
            <div className="relative">
              <HiOutlineMail className="absolute left-4 top-4 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className=" pl-10 mb-4 p-2 rounded w-full bg-gray-700 h-12 rounded-lg text-white"
                placeholder="Enter your email"
              />
            </div>
            <Button color="blue" disabled={loading} size="md" fullWidth={true}>
              {loading ? "Sending..." : "Send Code"}
            </Button>
            <div className="mb-20"></div>
          </form>
        </div>
      </div>
    </>
  );
};

