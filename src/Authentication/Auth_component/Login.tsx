import React, { useState } from "react";
// Eye icon for password visibility toggle

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Toggle password visibility

  // Handle form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement login logic here (e.g., API call)
    console.log("Logged in with:", { email, password });
  };

  return (
    <div className="min-h-screen flex flex-col gap-6 items-center justify-center bg-gray-50">
      <h1 className=" flex flex-row items-center">
        <p className="bg-blue-900 p-2 text-white font-bold  mr-1">AL</p>
        <span className="bg-transparent font-bold">CRUITER</span>
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text" // Set the input type to "text" for email
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type="text" // Set the input type to "text" for password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <a
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

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
