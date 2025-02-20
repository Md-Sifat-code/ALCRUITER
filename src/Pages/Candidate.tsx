import React from "react";
import { FaMapMarkerAlt, FaBriefcase, FaEnvelope } from "react-icons/fa";

const Candidate: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <div className="relative">
          <img
            className="w-full h-48 object-cover"
            src="/post2.png"
            alt="Cover"
          />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-6">
            <img
              className="w-32 h-32 rounded-full border-4 border-white shadow-md"
              src="/post-3.png"
              alt="Profile"
            />
          </div>
        </div>

        <div className="px-6 py-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">John Doe</h2>
          <p className="text-gray-500 mb-4">Full Stack Developer</p>

          <div className="mb-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <FaMapMarkerAlt className="text-gray-400" />
              <span className="text-gray-600">New York, USA</span>
            </div>
            <div className="flex items-center justify-center space-x-2 mb-2">
              <FaBriefcase className="text-gray-400" />
              <span className="text-gray-600">5+ Years Experience</span>
            </div>
          </div>

          <div className="mb-4">
            <span className="text-blue-500">
              Skills: React, Node.js, TypeScript
            </span>
          </div>

          <div className="flex justify-center space-x-6">
            <a
              href="mailto:johndoe@example.com"
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

export default Candidate;
