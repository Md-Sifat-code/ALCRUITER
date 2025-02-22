import React, { useState, useEffect } from "react";
import { useLogin } from "../../Context/LoginContext";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();
  const { fetchUserDetails, user } = useUser();
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const loggedInUsername = await login(username, password);

      if (loggedInUsername) {
        // After successful login, fetch user details
        await fetchUserDetails(loggedInUsername);
      } else {
        console.log("Login failed. No user returned.");
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  useEffect(() => {
    // After the user data is updated, navigate based on user properties
    if (user) {
      console.log(user); // You can now safely log the updated user
      if (user.choose === null) {
        navigate("/choose"); // Navigate to /choose if choose is null
      } else if (user.choose === "candidate") {
        navigate("/home");
      } else if (user.choose === "recruter") {
        navigate("/home");
      } else {
        navigate("/home"); // Navigate to /home if choose is not null
      }
    }
  }, [user, navigate]); // Only run when user data changes

  return (
    <div className="min-h-screen flex flex-col gap-6 items-center justify-center bg-gray-50">
      <h1 className="flex flex-row items-center">
        <p className="bg-blue-900 p-2 text-white font-bold mr-1">AL</p>
        <span className="bg-transparent font-bold">CRUITER</span>
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="button"
          onClick={handleLogin}
          className="w-full bg-blue-800 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <div className="mt-6 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
