import React from "react";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaIndustry,
  FaEnvelope,
} from "react-icons/fa";

const Recruiter: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <div className="relative">
          <img
            className="w-full h-48 object-cover"
            src="/post-1.png"
            alt="Company Cover"
          />
        </div>

        <div className="px-6 py-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            TechSolutions
          </h2>
          <p className="text-gray-500 mb-4">Software Development Company</p>

          <div className="mb-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <FaBuilding className="text-gray-400" />
              <span className="text-gray-600">TechSolutions Inc.</span>
            </div>
            <div className="flex items-center justify-center space-x-2 mb-2">
              <FaMapMarkerAlt className="text-gray-400" />
              <span className="text-gray-600">San Francisco, CA</span>
            </div>
            <div className="flex items-center justify-center space-x-2 mb-2">
              <FaIndustry className="text-gray-400" />
              <span className="text-gray-600">Tech Industry</span>
            </div>
          </div>

          <p className="text-gray-600 mb-4">
            We build innovative software solutions to transform businesses and
            empower teams worldwide.
          </p>

          <div className="flex justify-center space-x-6">
            <a
              href="mailto:info@techsolutions.com"
              className="text-gray-600 hover:text-blue-500 transition duration-300"
            >
              <FaEnvelope className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recruiter;
