// import { useEffect, useState } from "react";
// import { useAuth } from "../../context/useAuth";
// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signInWithPopup,
//   updateProfile,
// } from "firebase/auth";
// import { auth, provider } from "../../firebase/firebaseConfig";
// import { Input } from "../../components/Input/Input";
// import { FcGoogle } from "react-icons/fc";
// import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FirebaseError } from "firebase/app";
// import { message } from "antd";
// import { Button } from "@/components/Button/Button";

// export default function LoginPage() {
//   const location = useLocation();
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [messageApi, contextHolder] = message.useMessage();

//   // for sign up
//   const [confirmPassword, setConfirmPassword] = useState("");

//   // here we return the event detaisl and the url as well
//   const returnUrl = location.state?.returnUrl;
//   const eventDetails = location.state?.eventDetails;

//   const handleSuccessfulAuth = () => {
//     if (returnUrl && eventDetails) {
//       navigate(returnUrl, { state: eventDetails });
//     } else {
//       navigate("/mypage");
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       handleSuccessfulAuth();
//     }
//   }, [user]);

//   const handleEmailAuth = async (e: React.ChangeEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       if (isSignUp) {
//         if (password !== confirmPassword) {
//           alert("Passwords do not match");
//           return;
//         }
//         const userCredential = await createUserWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );
//         await updateProfile(userCredential.user, {
//           displayName: email.split("@")[0],
//         });
//       } else {
//         await signInWithEmailAndPassword(auth, email, password);
//       }
//       // we navigate to the event registration process
//       handleSuccessfulAuth();
//     } catch (error) {
//       if (error instanceof FirebaseError) {
//         console.error("Error with email authentication:", error);
//         if (error.code === "auth/invalid-credential") {
//           // bu yerda proper message bilan alert qilamiz userni
//           messageApi.error(
//             "Invalid credentials. Please check your email and password."
//           );
//         } else {
//           alert(error.message);
//         }
//       } else {
//         console.log(error);
//       }
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       await signInWithPopup(auth, provider);
//       handleSuccessfulAuth();
//     } catch (error) {
//       console.error("Error signing in with Google:", error);
//       alert("Failed to sign in. Please try again.");
//     }
//   };

//   const nagigationRoute = () => {
//     navigate("/forgot-password");
//   };

//   return (
//     <>
//       {contextHolder}
//       <div className="flex items-center justify-center min-h-screen mt-[-100px] p-4">
//         <div className="w-full max-w-md p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
//           {returnUrl && (
//             <div className="mb-4 text-sm text-gray-400 text-center">
//               Login to continue registration for: <br />
//               <span className="text-blue-400">{eventDetails?.title}</span>
//             </div>
//           )}
//           <h2 className="text-3xl font-bold text-white mb-6 text-center mt-8">
//             {isSignUp ? "Create an Account" : "Welcome Back"}
//           </h2>
//           <form onSubmit={handleEmailAuth} className="space-y-4">
//             <div className="relative">
//               <HiOutlineMail className="absolute left-4 top-4 text-gray-400" />
//               <Input
//                 type="email"
//                 placeholder="Email"
//                 className="w-full bg-gray-700 text-white pl-10"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="relative">
//               <HiOutlineLockClosed className="absolute left-4 top-4 text-gray-400" />
//               <Input
//                 type="password"
//                 placeholder="Password"
//                 className="w-full bg-gray-700 text-white pl-10"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             {isSignUp && (
//               <div className="relative">
//                 <HiOutlineLockClosed className="absolute left-3 top-3 text-gray-400" />
//                 <Input
//                   type="password"
//                   placeholder="Confirm Password"
//                   className="w-full bg-gray-700 text-white pl-10"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   required
//                 />
//               </div>
//             )}
//             {isSignUp ? (
//               <Button
//                 color="blue"
//                 size="md"
//                 fullWidth={true}
//                 onClick={() => handleEmailAuth}
//               >
//                 Sign Up
//               </Button>
//             ) : (
//               <>
//                 <div className="flex justify-end">
//                   <a
//                     onClick={nagigationRoute}
//                     className="text-sm text-blue-500 hover:underline bg-transparent cursor-pointer font-bold group "
//                   >
//                     Forgot Password?
//                   </a>
//                 </div>
//                 <Button
//                   color="blue"
//                   size="md"
//                   fullWidth={true}
//                   onClick={() => handleEmailAuth}
//                 >
//                   <span>Login</span>
//                 </Button>
//               </>
//             )}
//           </form>
//           <hr className="mt-8 mb-8 border-gray-500" />
//           <div className="mt-6">
//             <Button
//               color="white"
//               onClick={handleGoogleSignIn}
//               size="md"
//               fullWidth={true}
//             >
//               <FcGoogle className="mr-2" />
//               Sign in with Google
//             </Button>
//           </div>
//           <div className="flex items-center justify-between mt-4 mb-8">
//             <span className="text-gray-400">
//               {isSignUp ? "Already have an account?" : "Don't have an account?"}
//             </span>
//             <button
//               onClick={() => setIsSignUp(!isSignUp)}
//               className="text-sm text-blue-500 bg-transparent hover:text-white px-3 py-1 rounded-1xl transition-colors duration-300"
//             >
//               {isSignUp ? "Login" : "Sign Up"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
