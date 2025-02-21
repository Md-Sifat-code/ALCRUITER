import React from "react";
import { FaUser, FaBriefcase } from "react-icons/fa"; // Importing icons for better UX
import { Link } from "react-router-dom"; // Importing Link for routing

const Choose: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen gap-8">
      {/* Candidate Card */}
      <Link
        to="/home/profile/info/candidate"
        className="max-w-xs w-full h-64 bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out"
      >
        <div className="flex items-center justify-center p-6 bg-blue-100 h-2/3">
          <FaUser className="text-4xl text-blue-600" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-center text-gray-800">
            Candidate
          </h3>
        </div>
      </Link>

      {/* Recruiter Card */}
      <Link
        to="/home/profile/info/recruiter"
        className="max-w-xs w-full h-64 bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out"
      >
        <div className="flex items-center justify-center p-6 bg-green-100 h-2/3">
          <FaBriefcase className="text-4xl text-green-600" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-center text-gray-800">
            Recruiter
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default Choose;
