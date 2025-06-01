import { createContext, useState, useEffect, useMemo } from "react";

const TOKEN_KEY = "token";
const EXP_KEY = "token_expiry";

const AuthContext = createContext({
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
});


const getStoredToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem(EXP_KEY);
  if (!token || !expiry) return null;
  if (Date.now() > Number(expiry)) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXP_KEY);
    return null;
  }
  return token;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getStoredToken());

  useEffect(() => {
    if (token) {
      // Set expiry to 1 hour from now (customize as needed)
      const expiry = Date.now() + 60 * 60 * 1000;
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(EXP_KEY, expiry.toString());
    } else {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(EXP_KEY);
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  const value = useMemo(() => ({ token, login, logout }), [token]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;