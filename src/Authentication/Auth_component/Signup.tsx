import React from "react";
import { FaGoogle } from "react-icons/fa"; // Google icon from React Icons

const Signup: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col gap-6 items-center justify-center bg-gray-50">
      <h1 className=" flex flex-row items-center">
        <p className="bg-blue-900 p-2 text-white font-bold  mr-1">AL</p>
        <span className="bg-transparent font-bold">CRUITER</span>
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text" // Email field set to text
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="text" // Password field set to text
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* "Or" separator */}
          <div className="flex items-center mb-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-sm text-gray-600">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Continue with Google button */}
          <button
            type="button"
            className="w-full flex items-center justify-center bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          >
            <FaGoogle className="mr-3" size={20} /> {/* Google icon */}
            Continue with Google
          </button>

          {/* Login link */}
          <div className="mt-6 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <a href="/" className="text-blue-600 hover:underline">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
