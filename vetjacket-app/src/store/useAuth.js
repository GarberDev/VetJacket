import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))); // Additional state for user details

  const updateToken = (newToken) => {
    console.log("Updating token", newToken);
    localStorage.setItem("token", newToken); // Save to local storage
    setToken(newToken); // Update state
  };

  const updateUser = (newUser) => {
    try {
      console.log("Updating user", newUser);
      const userData = JSON.stringify(newUser);
      localStorage.setItem("user", userData); // Save user details to local storage
      setUser(newUser); // Update user state
    } catch (error) {
      console.error("Failed to update user in local storage:", error);
    }
  };

  // Effect to handle initial token and user details setting from localStorage
  useEffect(() => {
    console.log("Checking local storage for credentials...");

    const tokenFromStorage = localStorage.getItem("token");
    console.log("Retrieved token:", tokenFromStorage);
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }

    const userFromStorage = localStorage.getItem("user");
    console.log("Retrieved user data:", userFromStorage);
    if (userFromStorage) {
      try {
        const userData = JSON.parse(userFromStorage);
        setUser(userData);
        console.log("Parsed user data:", userData);
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{ token, user, setUser, setToken, updateToken, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
