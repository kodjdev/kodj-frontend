import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { CHECK_INTERVAL_MS, INACTIVE_TIMEOUT_MS, SESSION_TIMEOUT_MS } from "../utils/constant";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLogin: boolean;
  accessToken: string | null;
  login: (user: User) => void;
  logout: () => void;
  setAccessToken: (token: string | null) => void;
  setLogin: (isLogin: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // we use useNavigate hook
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setLogin] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());

  const autoLogout = useCallback(() => {
    // agar login qilmasa tekshirmaymiz
    if (!user) return;

    // const currentTime = Date.now();
    const currentTime = Date.now();
    const storedLastActivity = sessionStorage.getItem("lastActivity");
    const lastActivityTime = storedLastActivity
      ? parseInt(storedLastActivity)
      : lastActivity;
    if (currentTime - lastActivityTime >= INACTIVE_TIMEOUT_MS) {
      // simply call logout()
      logout();
      alert("You have been logged out due to inactivity !");
    } else if (currentTime - lastActivityTime >= SESSION_TIMEOUT_MS) {
      logout();
      alert("Your session has expired, Please login again.");
    }
  }, [lastActivity, user]);

  const updateActivity = useCallback(() => {
    const currentTime = Date.now();
    setLastActivity(currentTime);
    sessionStorage.setItem("lastActivity", currentTime.toString());
  }, []);

  useEffect(() => {
    if (user) {
      const events = [
        "mousedown",
        "keydown",
        "scroll",
        "mousemove",
        "click",
        "touchstart",
      ];

      const handleActivity = () => {
        updateActivity();
      };

      events.forEach((event) => {
        window.addEventListener(event, handleActivity);
      });

      // buyerda biz activeligini har minutda tekshiramiz
      const intervalId = setInterval(() => {
        autoLogout();
      }, CHECK_INTERVAL_MS);

      return () => {
        events.forEach((event) => {
          window.removeEventListener(event, handleActivity);
        });
        clearInterval(intervalId);
      };
    }
  }, [user, autoLogout, updateActivity]);

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      setLogin(!!currentUser);
      if (currentUser) {
        sessionStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        sessionStorage.removeItem("user");
      }
    });

    return () => unsubcribe();
  }, []);

  const login = (user: User) => {
    setUser(user);
    setLogin(true);
    setLastActivity(Date.now());
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("lastActivity", Date.now().toString());
    updateActivity();
  };

  const logout = async () => {
    await auth.signOut();
    // requestLogout();
    setUser(null);
    setLogin(false);
    setAccessToken(null);
    setLastActivity(0);
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLogin,
        accessToken,
        logout,
        login,
        setAccessToken,
        setLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
