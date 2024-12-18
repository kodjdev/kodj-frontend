import { useState } from "react";
import { auth, sendPasswordResetEmail } from "../firebase/firebaseConfig";
import { message } from "antd";
import { HiOutlineMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
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
      <div className="flex flex-col items-center justify-center min-h-screen p-4 relative mt-[-40px]">
        <div className="w-full max-w-md p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
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
          <h2 className="text-2xl font-semibold mb-10">Forgot Password</h2>
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* <div className="flex items-center mb-4"> */}
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
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 h-12 text-white rounded-lg ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Sending..." : "Send Code"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
