import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    const response = await fetch(
      `https://api.codewiththura.com/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );

    if (!response.ok) return null;
    const data = await response.json();
    setUser(data);
  }

  async function logout() {
    try {
      const response = await fetch(
        `https://api.codewiththura.com/api/auth/logout`,
        {
          method: "POST",
        },
      );

      if (!response.ok) return null;
      await response.json();
      setUser(null);
    } catch (err) {
      console.log(errr.message || "Failed to logout");
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: Boolean(user), login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used");
  }

  return context;
}
