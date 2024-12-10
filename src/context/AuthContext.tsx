import { createContext, ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

// interface User {
//     email: string | null
// }

interface AuthContextType {
    user: User | null
    loading: boolean;
    isLogin: boolean;
    accessToken: string | null;  
    login: (user: User) => void;
    logout: () => void;
    setAccessToken: (token: string | null) => void;  
    setLogin: (isLogin: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const navigate = useNavigate(); // Use useNavigate hook
    
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isLogin, setLogin] = useState(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    
    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            setLogin(!!currentUser);
            if(currentUser){
                sessionStorage.setItem('user', JSON.stringify(currentUser));
            } else {
                sessionStorage.removeItem('user');
            }
        });
        
        return () => unsubcribe();   
    }, []);

    const login = (user: User) => {
        setUser(user);
        setLogin(true);
        sessionStorage.setItem('user', JSON.stringify(user));
    };

    const logout = async () => {
        await auth.signOut();
        // requestLogout();
        setUser(null);
        setLogin(false);
        setAccessToken(null);  
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('AccessToken');
        sessionStorage.removeItem('TokenExpiration');
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{user, loading, isLogin, accessToken, logout, login, setAccessToken, setLogin}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
