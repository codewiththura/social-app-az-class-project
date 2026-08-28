import { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
} from "../services/api";

// 1. Create Auth Context
const AuthContext = createContext(null);

// 2. Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial current user on mount
  useEffect(() => {
    async function loadAuthUser() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to load initial user:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadAuthUser();
  }, []);

  // Login action
  async function login(email, password) {
    const loggedInUser = await apiLogin(email, password);
    setUser(loggedInUser);
    return loggedInUser;
  }

  // Signup / Register action
  async function signup(userData) {
    const newUser = await apiRegister(userData);
    setUser(newUser);
    return newUser;
  }

  // Logout action
  async function logout() {
    await apiLogout();
    setUser(null);
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

// 3. Easy Custom Hook for beginner-friendly consumption
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
