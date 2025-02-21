import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaIndustry,
  FaBuilding,
  FaEnvelope,
  FaLink,
} from "react-icons/fa";
import { useUser } from "../Context/UserContext"; // Import the useUser hook

const Recruiter: React.FC = () => {
  const { user, isLoading, error } = useUser(); // Access user from context
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Recruiter details
  const recruiter = user?.recruter;

  return (
    <>
      <div className="flex justify-center mt-8 items-start bg-gray-100">
        <div className="max-w-6xl w-full bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Cover Image */}
          <div className="relative">
            <img
              className="w-full h-56 object-cover"
              src={recruiter?.coverPhoto || "/default-cover.jpg"} // Default cover photo if not available
              alt="Company Cover"
            />
            <div className="absolute inset-0 top-32 px-12 mb-6">
              <img
                className="w-32 h-32 rounded-full border-4 border-white shadow-md"
                src={user?.profilpic || "/default-profile.jpg"} // Default profile pic if not available
                alt="Recruiter Profile"
              />
            </div>
          </div>

          {/* Recruiter Details */}
          <div className="px-12 text-start mt-14">
            <div className="flex items-center space-x-2">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {recruiter?.companyName || "Company Name"}{" "}
                {/* Display Company Name */}
              </h2>
              <span className="flex items-center bg-red-600 font-bold text-white text-sm px-2 py-1 rounded-full">
                <FaBuilding className="mr-1" />
                Recruiter
              </span>
            </div>
            <p className="text-gray-500 mb-4">
              {recruiter?.companyDiscription ||
                "We are a leading software company specializing in innovative tech solutions."}
            </p>

            {/* Company Info */}
            <div className="flex flex-col space-y-4 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <FaIndustry className="text-gray-400" />
                <span className="text-gray-600">
                  {recruiter?.industryType || "Industry Type"}
                </span>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <FaMapMarkerAlt className="text-gray-400" />
                <span className="text-gray-600">
                  {recruiter?.officeLocation || "Location"}
                </span>
                <button
                  onClick={openModal}
                  className="ml-2 text-blue-500 text-sm underline"
                >
                  More Info
                </button>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-blue-500">
                Job Openings: React, Node.js, Full Stack Developer
              </span>
            </div>
          </div>

          {/* Modal for More Information */}
          {showModal && (
            <div className="fixed inset-0 flex justify-center items-center bg-transparent bg-opacity-50">
              <div className="bg-white border border-blue-600 rounded-lg p-6 max-w-sm w-full">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  More Information
                </h3>
                <p className="text-gray-600 mb-2">
                  <strong>Location:</strong>{" "}
                  {recruiter?.officeLocation || "Not Available"}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Phone Number:</strong> (555) 123-4567
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Email:</strong>{" "}
                  {user?.email || "recruiter@company.com"}
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={closeModal}
                    className="text-white w-full font-bold bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* About Section (Same Size as the Upper Card) */}
      <div className="mt-8 flex justify-center items-center">
        <div className="max-w-6xl w-full bg-white rounded-lg shadow-2xl p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            About {recruiter?.companyName || "Company"}
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            {recruiter?.companyDiscription ||
              "We are a team of professionals dedicated to providing innovative solutions that help businesses thrive."}
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            At {recruiter?.companyName || "Company"}, we focus on building
            scalable and reliable software applications that help our clients
            achieve their business goals.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-8 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Contact Us
          </h3>
          <div className="flex space-x-6">
            <a
              href={`mailto:${user?.email || "recruiter@company.com"}`}
              className="text-gray-600 hover:text-blue-500 transition duration-300"
            >
              <FaEnvelope className="text-xl" />
            </a>
            <a
              href="https://www.linkedin.com/company/agiles"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 transition duration-300"
            >
              <FaLink className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recruiter;
