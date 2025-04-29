import { createContext, useState, useContext } from "react";
import axios from "axios";

// Define the expected structure of the response
interface LoginResponse {
  token: string;
  username: string;
  email: string;
  roles: string[];
}

type LoginContextType = {
  login: (username: string, password: string) => Promise<string | null>;
  isLoading: boolean;
  error: string | null;
};

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (
    username: string,
    password: string
  ): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post<LoginResponse>(
        "https://chakrihub-1-sgbz.onrender.com/Log",
        { username, password } // Changed to use username
      );

      // Log the response to verify
      console.log("Login response:", response.data);

      const { token, username: returnedUsername, email } = response.data;

      if (returnedUsername) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("username", returnedUsername);
        sessionStorage.setItem("email", email);

        return returnedUsername; // Return the username if found
      } else {
        setError("No username in the response");
        return null; // Return null if no username in the response
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please check your credentials.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContext.Provider value={{ login, isLoading, error }}>
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook to use login context
export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};
