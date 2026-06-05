import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

const VALID_EMAIL = "user@tentwenty.com";
const VALID_PASSWORD = "password123";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("ticktock_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        sessionStorage.removeItem("ticktock_user");
      }
    }
    setLoading(false);
  }, []);

  function login(email, password) {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      const userData = { email, name: "John Doe" };
      sessionStorage.setItem("ticktock_user", JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    }
    return { success: false, error: "Invalid email or password" };
  }

  function logout() {
    sessionStorage.removeItem("ticktock_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
