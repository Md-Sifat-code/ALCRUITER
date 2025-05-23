import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Define the structure of the updated user
interface User {
  id: number;
  email: string;
  profilpic: string;
  candidate: any | null;
  recruter: any | null;
  username: string;
  choose: any | null;
  posts: [];
}

interface UserContextType {
  fetchUserDetails: (username: string) => void;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  logout: () => void; // <-- Add logout to the context type
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserDetails = async (username: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get<User>(
        `https://chakrihub-1-sgbz.onrender.com/User/search/${username}`
      );

      setUser(response.data); // Store the user data from the response
    } catch (err) {
      setError("Failed to fetch user details.");
    } finally {
      setIsLoading(false);
    }
  };

  // New logout function to reset the user state
  const logout = () => {
    setUser(null); // Clear the user context
  };

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (username) {
      fetchUserDetails(username);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ fetchUserDetails, user, isLoading, error, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
