import { createContext, useContext, useState, useEffect} from "react";
import { API_URL } from "../config/api";
const AuthContext = createContext();

export function AuthProvider({ children }) {
   const [user, setUser] = useState(null);
   const [authLoading, setAuthLoading] = useState(true);

   useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/api/auth/me`,
                    {
                        credentials: "include",
                    }

                );
                if(!response.ok) {
                    setUser(null);
                    return;
                } 

                const data = await response.json();
                setUser(data);
            }catch (error) {
                console.error("Error checking session:", error);
                setUser(null);
            }finally {
                setAuthLoading(false);
            }
        };

        checkSession();
   }, []);

    const login = (userData) => {
        setUser(userData);
    }

    const logout = async() => {
        try {
            const response = await fetch(`${API_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
        }catch (error) {
            console.error("Logout failed", error);
        } finally {
            setUser(null);
        }
    };

    const isAuthenticated = Boolean(user);

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            authLoading,
            login,
            logout,
           }}
        >
            {children}
        </AuthContext.Provider>
    );
    
}

export function useAuth() {
    return useContext(AuthContext);
}