import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import apiService from "@/service/apiService";

export default function SignUpPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const returnUrl = location.state?.returnUrl;
  const eventDetails = location.state?.eventDetails;

  const onGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      // we send the credential to backend spring
      const response = await apiService.initiateGoogleLogin(
        credentialResponse.credential
      );

      messageApi.success("Google authentication successful!");

      navigate("/complete-profile", {
        state: {
          returnUrl,
          eventDetails,
          newUser: true,
          userData: response.data,
        },
      });
    } catch (error) {
      console.error("Backend verification failed:", error);
      messageApi.error("Failed to sign in with Google. Please try again.");
    }
  };

  const onGoogleLoginError = () => {
    console.log("Login Failed");
    messageApi.error("Google login failed. Please try again.");
  };

  const navigateToLogin = () => {
    navigate("/login", {
      state: { returnUrl, eventDetails },
    });
  };

  const clientId =
    import.meta.env.VITE_GOOGLE_CLIENT_ID || "your-client-id-here";

  return (
    <>
      {contextHolder}
      <div className="flex items-center justify-center min-h-screen mt-[-100px] p-4">
        <div className="w-full max-w-md p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
          {returnUrl && (
            <div className="mb-4 text-sm text-gray-400 text-center">
              Sign up to continue registration for: <br />
              <span className="text-blue-400">{eventDetails?.title}</span>
            </div>
          )}
          <h2 className="text-3xl font-bold text-white mb-6 text-center mt-8">
            Create an Account
          </h2>
          <div className="mt-6">
            <GoogleOAuthProvider clientId={clientId}>
              <GoogleLogin
                onSuccess={onGoogleLoginSuccess}
                onError={onGoogleLoginError}
                useOneTap
                text="signup_with"
                shape="rectangular"
                theme="filled_blue"
              />
            </GoogleOAuthProvider>
          </div>
          <div className="flex items-center justify-between mt-4 mb-8">
            <span className="text-gray-400">Already have an account?</span>
            <button
              onClick={navigateToLogin}
              className="text-sm text-blue-500 bg-transparent hover:text-white px-3 py-1 rounded-1xl transition-colors duration-300"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
