import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { io, Socket } from 'socket.io-client';

export interface User {
  id: number;
  email: string;
  name: string;
  address?: string | null;
  phone?: string | null;
  country?: string | null;
  language?: string | null;
  pin?: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  socket: Socket | null;
  login: (email: string, password?: string) => Promise<void>;
  signup: (email: string, password?: string, name?: string) => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('gifora_token'));
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setToken(null);
          localStorage.removeItem('gifora_token');
        }
      } catch (error) {
        console.error("Failed to fetch user session", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  // Handle Socket Connection when user is authenticated
  useEffect(() => {
    let newSocket: Socket | null = null;
    
    if (user && token) {
      newSocket = io('http://localhost:5000');
      setSocket(newSocket);
      
      newSocket.emit('user_online', user.id);
    }
    
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [user, token]);

  const login = async (email: string, password?: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: password || "demo_password" })
      });
      
      if (!response.ok) throw new Error('Login failed');
      
      const data = await response.json();
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('gifora_token', data.token);
    } catch (error) {
      console.error("Login Error", error);
      throw error;
    }
  };

  const signup = async (email: string, password?: string, name?: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: password || "demo_password", name: name || "User" })
      });
      
      if (!response.ok) throw new Error('Signup failed');
      
      const data = await response.json();
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('gifora_token', data.token);
    } catch (error) {
      console.error("Signup Error", error);
      throw error;
    }
  };

  const updateUser = async (data: Partial<User>) => {
    if (!user) return;
    try {
      // Future: Call backend API to update user
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('gifora_token');
    
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, socket, login, signup, updateUser, logout, isLoading }}>
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
