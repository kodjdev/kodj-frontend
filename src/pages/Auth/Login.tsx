import { useEffect, useState } from "react";
import { useAuth } from "@/context/useAuth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { Input } from "@/components/Input/Input";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { message } from "antd";
import { Button } from "@/components/Button/Button";
import apiService from "@/service/apiService";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

export default function LoginPage() {
  const location = useLocation();
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  // here we return the event details and the url as well
  const returnUrl = location.state?.returnUrl;
  const eventDetails = location.state?.eventDetails;

  const handleSuccessfulAuth = () => {
    if (returnUrl && eventDetails) {
      navigate(returnUrl, { state: eventDetails });
    } else {
      navigate("/mypage");
    }
  };

  useEffect(() => {
    if (user) {
      handleSuccessfulAuth();
    }
  }, [user]);

  const handleEmailAuth = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // we navigate to the event registration process
      handleSuccessfulAuth();
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error("Error with email authentication:", error);
        if (error.code === "auth/invalid-credential") {
          messageApi.error(
            "Invalid credentials. Please check your email and password."
          );
        } else {
          alert(error.message);
        }
      } else {
        console.log(error);
      }
    }
  };

  const onGoogleLoginSuccess = async (credentialResponse: {
    credential?: string;
  }) => {
    try {
      if (!credentialResponse.credential) {
        messageApi.error("Failed to receive credentials from Google");
        return;
      }
      const response = await apiService.googleSignIn(
        credentialResponse.credential
      );

      if (response && response.data) {
        console.log("Google sign-in response:", response.data);

        const accessToken =
          response.data?.access_token || response.access_token;

        if (accessToken) {
          try {
            // we fetch user details using the access token
            const userData = await apiService.getUserDetails(accessToken);

            // create an object
            const userObject = {
              id: userData.id?.toString() || userData.userId?.toString(),
              email: userData.email,
              name: userData.name,
              role: userData.role,
            };

            // we use the login method from AuthContext
            login(userObject, accessToken);
            messageApi.success("Google authentication successful!");
          } catch (detailError: any) {
            console.error("Comprehensive user details fetch error:", {
              message: detailError.message,
              name: detailError.name,
              stack: detailError.stack
            });
            messageApi.error(`Failed to fetch user details: ${detailError.message}`);
          }
        } else {
          console.error("No access token found in response");
          messageApi.error("Failed to authenticate. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error with Google sign in:", error);
      messageApi.error("Failed to sign in with Google. Please try again.");
    }
  };

  const navigateToForgotPassword = () => {
    navigate("/forgot-password");
  };

  const navigateToSignUp = () => {
    navigate("/signup", {
      state: { returnUrl, eventDetails },
    });
  };

  const clientId =
    import.meta.env.VITE_GOOGLE_CLIENT_ID || "your-google-client-id";

  return (
    <>
      {contextHolder}
      <div className="flex items-center justify-center min-h-screen mt-[-100px] p-4">
        <div className="w-full max-w-md p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
          {returnUrl && (
            <div className="mb-4 text-sm text-gray-400 text-center">
              Login to continue registration for: <br />
              <span className="text-blue-400">{eventDetails?.title}</span>
            </div>
          )}
          <h2 className="text-3xl font-bold text-white mb-6 text-center mt-8">
            Welcome Back
          </h2>
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="relative">
              <HiOutlineMail className="absolute left-4 top-4 text-gray-400" />
              <Input
                type="email"
                placeholder="Email"
                className="w-full bg-gray-700 text-white pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-4 top-4 text-gray-400" />
              <Input
                type="password"
                placeholder="Password"
                className="w-full bg-gray-700 text-white pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end">
              <a
                onClick={navigateToForgotPassword}
                className="text-sm text-blue-500 hover:underline bg-transparent cursor-pointer font-bold group"
              >
                Forgot Password?
              </a>
            </div>
            <Button color="blue" size="md" fullWidth={true} type="submit">
              <span>Login</span>
            </Button>
          </form>
          <hr className="mt-8 mb-8 border-gray-500" />
          <div className="mt-6">
            <GoogleOAuthProvider clientId={clientId}>
              <GoogleLogin
                onSuccess={onGoogleLoginSuccess}
                onError={() => messageApi.error("Google authentication failed")}
                useOneTap
                text="signin_with"
                shape="rectangular"
                width="100%"
              />
            </GoogleOAuthProvider>
          </div>
          <div className="flex items-center justify-between mt-4 mb-8">
            <span className="text-gray-400">Don't have an account?</span>
            <button
              onClick={navigateToSignUp}
              className="text-sm text-blue-500 bg-transparent hover:text-white px-3 py-1 rounded-1xl transition-colors duration-300"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
