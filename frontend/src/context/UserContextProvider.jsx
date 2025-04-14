import { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const logOut = async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      if (res.data.success) {
        setUser(null);
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };
  const isVerified = async () => {
    try {
      const res = await axiosInstance("/auth/getuser");
      if (res.data.success) {
        setUser(res.data.data);
      } else {
        logOut();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    isVerified();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, logOut }}>
      {children}
    </UserContext.Provider>
  );
};
