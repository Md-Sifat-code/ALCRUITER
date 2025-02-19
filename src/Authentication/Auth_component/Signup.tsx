import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { FaSadTear } from "react-icons/fa";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // State for success modal
  const [showErrorModal, setShowErrorModal] = useState(false); // State for error modal
  const navigate = useNavigate(); // Hook to navigate to another route

  // Handle form submission
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch(
        "https://chakrihub-1.onrender.com/User/add",
        {
          method: "POST",
          body: formData,
        }
      );

      const contentType = response.headers.get("Content-Type");

      if (response.ok) {
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          console.log("Response Data: ", data);
        } else {
          const text = await response.text();
          console.log("Response Text: ", text);
        }
        setIsSuccess(true); // Show success modal
        setTimeout(() => {
          navigate("/"); // Redirect user to home page after success
        }, 2000); // Redirect after 2 seconds to let user see success message
      } else {
        const errorText = await response.text();
        console.log("Error Text: ", errorText);

        // Show error modal if username already exists (response status 500)
        if (response.status === 500) {
          setShowErrorModal(true); // Show the error modal
        }
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-6 items-center justify-center bg-gray-50">
      <h1 className="flex flex-row items-center">
        <p className="bg-blue-900 p-2 text-white font-bold mr-1">AL</p>
        <span className="bg-transparent font-bold">CRUITER</span>
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>
        {/* Removed onSubmit from form */}
        <form>
          {/* Username input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>

          {/* Email input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text" // Changed to 'email' for proper validation
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="text" // Changed to 'password' for secure input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="button" // Changed to 'button' so it doesn't trigger form submit
            onClick={handleSubmit} // Trigger handleSubmit on button click
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>

          {/* Login link */}
          <div className="mt-6 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <Link to="/" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {isSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className="modal modal-open">
            <div className="modal-box">
              <h2 className="text-2xl font-semibold text-teal-500">Success!</h2>
              <p className="text-gray-600 mt-2">
                You have successfully created an account.
              </p>
              <div className="modal-action">
                <button onClick={() => navigate("/")} className="btn btn-teal">
                  Go to Homepage
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal for username already exists */}
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className="modal modal-open">
            <div className="modal-box">
              <h2 className="text-3xl mb-4 text-center font-semibold text-red-500">
                Opps!
              </h2>
              <p className="flex justify-center items-center mt-3">
                <FaSadTear className="text-teal-700 text-2xl" />
              </p>
              <p className="text-gray-600 mt-2 text-center">
                Username Already Exists
              </p>
              <div className="w-full">
                <button
                  onClick={() => setShowErrorModal(false)} // Close the error modal
                  className="btn w-full mt-4 text-teal-700 font-bold btn-red"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
