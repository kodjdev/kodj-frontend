import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import apiService from "@/service/apiService";
import {
  CHECK_INTERVAL_MS,
  INACTIVE_TIMEOUT_MS,
  SESSION_TIMEOUT_MS,
} from "@/utils/constant";
import { User } from "@/types/index";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLogin: boolean;
  accessToken: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setLogin] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());

  // we track the activity
  const updateActivity = useCallback(() => {
    const currentTime = Date.now();
    setLastActivity(currentTime);
    sessionStorage.setItem("lastActivity", currentTime.toString());
  }, []);

  const autoLogout = useCallback(() => {
    if (!user) return;

    const currentTime = Date.now();
    const storedLastActivity = sessionStorage.getItem("lastActivity");
    const lastActivityTime = storedLastActivity
      ? parseInt(storedLastActivity)
      : lastActivity;

    if (currentTime - lastActivityTime >= INACTIVE_TIMEOUT_MS) {
      logout();
      alert("You have been logged out due to inactivity!");
    } else if (currentTime - lastActivityTime >= SESSION_TIMEOUT_MS) {
      logout();
      alert("Your session has expired, Please login again.");
    }
  }, [lastActivity, user]);

  // user activity event listeners
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

      const handleActivity = () => updateActivity();

      events.forEach((event) => {
        window.addEventListener(event, handleActivity);
      });

      const intervalId = setInterval(autoLogout, CHECK_INTERVAL_MS);

      return () => {
        events.forEach((event) => {
          window.removeEventListener(event, handleActivity);
        });
        clearInterval(intervalId);
      };
    }
  }, [user, autoLogout, updateActivity]);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("accessToken");

      if (storedToken) {
        try {
          // we fetch the user details with the token
          const userData = await apiService.getUserDetails(storedToken);

          setUser({
            id: userData.id.toString(),
            email: userData.email,
            name: userData.name,
            role: userData.role,
          });
          setAccessToken(storedToken);
          setLogin(true);
          sessionStorage.setItem("user", JSON.stringify(userData));
        } catch (error) {
          console.error("Authentication initialization error:", error);
          logout();
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(
    async (userData: User, token: string) => {
      try {
        // store token
        setAccessToken(token);
        localStorage.setItem("accessToken", token);

        // set user and login state
        setUser(userData);
        setLogin(true);

        setLastActivity(Date.now());
        sessionStorage.setItem("user", JSON.stringify(userData));
        sessionStorage.setItem("lastActivity", Date.now().toString());

        navigate("/mypage");
      } catch (error) {
        console.error("Login error:", error);
        logout();
      }
    },
    [navigate]
  );


  const logout = useCallback(async () => {
    try {
      // we call backend logout endpoint: i need to check the logout 
      await apiService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // clear qilamiz
      setUser(null);
      setLogin(false);
      setAccessToken(null);
      setLastActivity(0);

      sessionStorage.clear();
      localStorage.removeItem("accessToken");

      navigate("/login");
    }
  }, [navigate]);
 

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLogin,
        accessToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
