import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom"; // Import NavLink from react-router-dom
import {
  FaHome,
  FaUserFriends,
  FaBriefcase,
  FaEnvelope,
  FaBell,
  FaUserAlt,
  FaSearch,
  FaUserInjured, // Importing the search icon
} from "react-icons/fa"; // Importing icons from react-icons
import { PiStudentFill } from "react-icons/pi";

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Function to open the modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center py-1 px-6">
        {/* Left section: Logo and Searchbar */}
        <div className="flex mb-4 md:mb-0 items-center space-x-4">
          <p className="bg-blue-900 p-2 text-white font-bold mr-1">AL</p>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="p-2 pl-10 pr-3 border border-gray-300 rounded-md"
            />
            {/* Search Icon */}
            <FaSearch
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>

        {/* Middle section: Navigation */}
        <div className="flex  space-x-6">
          <NavLink
            to="/home" // Specify the link for Home
            className={({ isActive }) =>
              isActive
                ? "flex flex-col items-center text-blue-800"
                : "flex flex-col items-center"
            }
          >
            <FaHome size={24} />
            <span className="text-sm mt-1">Home</span>
          </NavLink>

          <NavLink
            to="/jobs" // Specify the link for Jobs
            className={({ isActive }) =>
              isActive
                ? "flex flex-col items-center text-blue-800"
                : "flex flex-col items-center"
            }
          >
            <FaBriefcase size={24} />
            <span className="text-sm mt-1">Jobs</span>
          </NavLink>

          <NavLink
            to="/notifications" // Specify the link for Notifications
            className={({ isActive }) =>
              isActive
                ? "flex flex-col items-center text-blue-700"
                : "flex flex-col items-center"
            }
          >
            <FaBell size={24} />
            <span className="text-sm mt-1">Notifications</span>
          </NavLink>
          {/* Right section: Profile Icon */}
          <div className="relative">
            <div
              className="flex bg-blue-800 p-4 rounded-b-full items-center cursor-pointer"
              onClick={openModal} // Open modal on click
            >
              <FaUserAlt className="text-white" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent">
          <div className="modal modal-open ">
            <div className="modal-box bg-white px-12 py-10  w-80">
              <h2 className="text-2xl font-semibold text-center mb-4">
                Select Your Role
              </h2>
              <div className="flex justify-around mb-4">
                <Link
                  to={"/home/profile/candidate"} // Replace this with actual logic
                  className="px-8 py-4 text-blue-800 w-28 flex flex-col justify-center items-center"
                  onClick={closeModal} // Close modal when the link is clicked
                >
                  <FaUserInjured />
                  Candidate
                </Link>
                <Link
                  to={"/home/profile/recruiter"} // Replace this with actual logic
                  className="px-8 py-4 text-blue-800 w-28 flex flex-col justify-center items-center"
                  onClick={closeModal} // Close modal when the link is clicked
                >
                  <PiStudentFill />
                  Recruiter
                </Link>
              </div>
              <div className="modal-action">
                <button
                  onClick={closeModal}
                  className="py-3 bg-blue-800 w-full text-white font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Navbar;
