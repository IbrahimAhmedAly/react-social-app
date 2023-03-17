import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/BASE_URL";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    //TO DO
    const res = await axios.post(`${BASE_URL}/auth/login`, inputs, {
      withCredentials: true,
    });
    setCurrentUser(res.data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ login, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
