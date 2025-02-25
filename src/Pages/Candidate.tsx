import React, { useState } from "react";
import { FaMapMarkerAlt, FaBriefcase, FaStar } from "react-icons/fa";
import { useUser } from "../Context/UserContext"; // Import the useUser hook
import { IoMdCloudDownload } from "react-icons/io";
import { MdMedicalInformation } from "react-icons/md";
const Candidate: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const { user, isLoading, error } = useUser(); // Access user from context

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="flex justify-center mt-8 items-start ">
        <div className="max-w-6xl w-full bgcard rounded-[18px] shadow-2xl overflow-hidden">
          {/* Cover Image */}
          <div className="relative">
            <img
              className="w-full h-56 object-cover"
              src={user?.candidate?.coverPic || "/default-cover.jpg"} // Default cover photo if not available
              alt="Company Cover"
            />
            <div className="absolute inset-0 top-36 px-12 mb-6">
              <img
                className="w-32 h-32 rounded-full border-4 border-white shadow-md"
                src={user?.profilpic || "/default-profile.jpg"} // Default profile pic if not available
                alt="Recruiter Profile"
              />
            </div>
          </div>

          <div className="px-12 text-start mt-14">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl mt-[-6px] flex flex-col font-bold text-gray-800 ">
                {/* Display user's full name */}
                {user?.candidate?.fullName}
              </h2>

              <span className="flex items-center bg-amber-600 font-bold text-white text-sm px-2 py-1 rounded-full">
                <FaStar className="mr-1" />
                Candidate
              </span>
            </div>

            <p className="text-gray-500 mb-4">
              {user?.candidate?.educationalQualifications ||
                "Full Stack Developer"}{" "}
              {/* Display education */}
            </p>
            <p className="text-gray-700 text-lg w-full md:w-[70%] leading-relaxed mb-4">
              {user?.candidate?.bio ||
                "I am a passionate Full Stack Developer with over 5 years of experience working on diverse projects in various industries."}
            </p>

            <div className="mb-4 flex flex-col items-start justify-start">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <FaMapMarkerAlt className="text-gray-400" />
                <span className="text-gray-600">
                  {user?.candidate?.location || "New York, USA"}
                </span>{" "}
                {/* Display location */}
                <button
                  onClick={openModal}
                  className="ml-2 text-blue-500 text-sm underline"
                >
                  More Info
                </button>
              </div>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <FaBriefcase className="text-gray-400" />
                <span className="text-gray-600 flex flex-row items-center">
                  {user?.candidate?.yearsOfExperience || "5+ Years Experience"}
                  <p className="px-2">years of Experience</p>
                </span>{" "}
                {/* Display years of experience */}
              </div>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <a
                  href={user?.candidate?.cv || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <MdMedicalInformation className="text-gray-400" />
                  <span className="">Download CV</span>
                  <span className=" underline text-blue-800">
                    {user?.candidate?.cv ? (
                      <IoMdCloudDownload />
                    ) : (
                      "5+ Years Experience"
                    )}
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 flex justify-center items-center bg-transparent bg-opacity-50">
              <div className="bgcard border border-amber-600 rounded-lg p-6 max-w-sm w-full">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  More Information
                </h3>
                <p className="text-gray-600 mb-2">
                  {" "}
                  <strong>Full name:</strong>{" "}
                  {user?.candidate?.fullName || "John Doe"}{" "}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Location:</strong>{" "}
                  {user?.candidate?.location || "New York, USA"}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Phone Number:</strong>{" "}
                  {user?.candidate?.phoneNumber || "(555) 123-4567"}
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Email:</strong> {user?.email || "johndoe@example.com"}
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

      {/* About Section */}
      <div className="mt-2 flex flex-col justify-center items-center">
        <div className="max-w-6xl bgcard rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            About Me
          </h3>

          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            {user?.candidate?.about ||
              "I thrive in collaborative environments where I can contribute to a team’s success while continuously learning and developing my skills."}
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Outside of work, I enjoy participating in open-source projects,
            attending tech meetups, and staying up-to-date with the latest
            trends in the tech world.
          </p>
        </div>
      </div>

      {/* More Info Card Below About Me Section */}
      <div className="mt-4 flex flex-col justify-center items-center">
        <div className="max-w-6xl w-full bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            More Information
          </h3>
          <div className="mb-4">
            <p className="text-gray-700 text-lg">
              <strong>Full Name:</strong>{" "}
              {user?.candidate?.fullName || "John Doe"}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Phone Number:</strong>{" "}
              {user?.candidate?.phoneNumber || "(555) 123-4567"}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Email:</strong> {user?.email || "johndoe@example.com"}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Location:</strong>{" "}
              {user?.candidate?.location || "New York, USA"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Candidate;
