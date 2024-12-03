import { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase/firebaseConfig';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 // for sign up
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/mypage');
    }
  }, [user, navigate]);

  const handleEmailAuth = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          alert('Passwords do not match');
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/mypage');
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error with email authentication:', error);
            alert(error.message);
        } else {
            console.log(error);
        }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/mypage');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      alert('Failed to sign in. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="w-full max-w-md p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          {isSignUp ? 'Create an Account' : 'Welcome Back'}
        </h2>
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div className="relative">
            <HiOutlineMail className="absolute left-3 top-3 text-gray-400" />
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
            <HiOutlineLockClosed className="absolute left-3 top-3 text-gray-400" />
            <Input
              type="password"
              placeholder="Password"
              className="w-full bg-gray-700 text-white pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isSignUp && (
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-3 top-3 text-gray-400" />
              <Input
                type="password"
                placeholder="Confirm Password"
                className="w-full bg-gray-700 text-white pl-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-md py-3 flex items-center justify-center space-x-2"
          >
            {isSignUp ? (
              <>
                <AiOutlineUserAdd className="text-xl" />
                <span>Sign Up</span>
              </>
            ) : (
              <>
                <AiOutlineLogin className="text-xl" />
                <span>Login</span>
              </>
            )}
          </Button>
        </form>
        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-400">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          </span>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            {isSignUp ? 'Login' : 'Sign Up'}
          </button>
        </div>
        <div className="mt-6">
          <Button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-white text-black hover:bg-gray-100 py-3"
          >
            <FcGoogle className="mr-2" />
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
