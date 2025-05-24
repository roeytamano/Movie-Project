import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null; // Add username to the context
  userId: string | null; // Add userId to the context
  login: (username: string, userId: string) => void; // Accept username during login
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
      return localStorage.getItem("isLoggedIn") === "true";
    });
    const [username, setUsername] = useState<string | null>(() => {
      return localStorage.getItem("username");
    });
    const [userId, setUserId] = useState<string | null>(() => {
      return localStorage.getItem("userId");
    });
  
    const login = (username: string, userId: string) => {
        setIsLoggedIn(true);
        setUsername(username);
        setUserId(userId);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        localStorage.setItem("userId", userId);
    };
  
    const logout = () => {
      setIsLoggedIn(false);
      setUsername(null);
      setUserId(null);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
    };
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, username, userId, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};