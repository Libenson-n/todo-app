import { createContext, useState } from "react";

type LoggedInUserProviderProps = {
  children: React.ReactNode;
};

type LoggedInUserContextType = {
  loggedInUser: string;
  login: (userId: string) => void;
  logoutUser: () => void;
};

export const LoggedInUserContext =
  createContext<LoggedInUserContextType | null>(null);

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
