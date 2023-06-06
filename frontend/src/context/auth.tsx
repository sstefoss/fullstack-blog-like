import { ReactNode, useState, useCallback, createContext } from "react";

interface IAuthContext {
  loggedIn: boolean;
  login?: (token: string) => void;
  logout?: () => void;
}

const defaultState = {
  loggedIn: false,
};

export const AuthContext = createContext<IAuthContext>(defaultState);

const isLoggedIn = () => typeof localStorage.getItem("token") === "string";

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }, []);

  const login = useCallback((token: string) => {
    localStorage.setItem("token", token);
    setLoggedIn(true);
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
