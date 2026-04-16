import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface User {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  country?: string;
  language?: string;
  isMember: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, name?: string) => void;
  signup: (email: string, name: string) => void;
  updateUser: (data: Partial<User>) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Persistence check on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("gifora_session");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse session", e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, name: string = "User") => {
    const newUser = { email, name, isMember: true };
    setUser(newUser);
    localStorage.setItem("gifora_session", JSON.stringify(newUser));
  };

  const signup = (email: string, name: string) => {
    const newUser = { email, name, isMember: true };
    setUser(newUser);
    localStorage.setItem("gifora_session", JSON.stringify(newUser));
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem("gifora_session", JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("gifora_session");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, updateUser, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
