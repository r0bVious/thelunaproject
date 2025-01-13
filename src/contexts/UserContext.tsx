"use client";
import { createContext, ReactNode, useContext } from "react";

interface UserContextType {
  userId: number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({
  userId,
  children,
}: {
  userId: number;
  children: ReactNode;
}) => {
  return (
    <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a provider");
  }
  return context;
};
