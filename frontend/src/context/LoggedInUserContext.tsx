import { createContext, useState } from "react";
import { LoggedInUserContextType } from "../types/loggedInContext";

type LoggedInUserProviderProps = {
  children: React.ReactNode;
};

const defaultContextValue: LoggedInUserContextType = {
  loggedInUser: null,
  logoutUser: () => {},
  login: () => {},
};

export const LoggedInUserContext =
  createContext<LoggedInUserContextType>(defaultContextValue);

const LoggedInUserProvider = ({ children }: LoggedInUserProviderProps) => {
  const [loggedInUser, setLoggedInUser] = useState<string>("");

  const login = (userId: string) => {
    localStorage.setItem("userId", userId);
    setLoggedInUser(userId);
  };
  const logoutUser = () => {
    localStorage.removeItem("userId");
    setLoggedInUser("");
  };

  return (
    <LoggedInUserContext.Provider value={{ loggedInUser, login, logoutUser }}>
      {children}
    </LoggedInUserContext.Provider>
  );
};

export default LoggedInUserProvider;
