import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Load token from storage on app start
  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem("token");
      if (savedToken) setToken(savedToken);
      console.log("i am saved token", savedToken);
    };
    loadToken();
  }, []);

  const login = async (newToken) => {
    setToken(newToken);
    await AsyncStorage.setItem("token", newToken);
  };

  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
