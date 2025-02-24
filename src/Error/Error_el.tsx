import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Error_el: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white flex flex-col items-center p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <FaExclamationTriangle className="text-red-500 text-6xl mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Oops! Something went wrong.
        </h2>
        <p className="text-gray-600 mb-4">Under Development</p>
        <Link
          to={"/"}
          className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default Error_el;
