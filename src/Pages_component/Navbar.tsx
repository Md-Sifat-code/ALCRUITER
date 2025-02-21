import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate for routing
import {
  FaHome,
  FaBriefcase,
  FaBell,
  FaUserAlt,
  FaSearch,
} from "react-icons/fa"; // Importing icons from react-icons
import { useUser } from "../Context/UserContext"; // Importing useUser to access user context

const Navbar: React.FC = () => {
  const { user, logout } = useUser(); // Accessing the user context and logout function
  const navigate = useNavigate(); // Hook to programmatically navigate

  // State to toggle the dropdown menu visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handle logout
  const handleLogout = () => {
    // Clear everything from sessionStorage
    sessionStorage.clear();
    // Clear user data from the context
    logout(); // Call the logout function from UserContext
    // Navigate to the home page
    navigate("/");
  };

  // Handle profile navigation based on user choice (candidate/recruiter)
  const handleProfileNavigation = () => {
    if (user?.choose === "candidate") {
      navigate("/home/profile/candidate");
    } else if (user?.choose === "recruter") {
      navigate("/home/profile/recruiter");
    }
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
        <div className="flex space-x-6">
          {/* Conditionally render Home or Jobs based on user.choose */}
          {user?.choose === "candidate" && (
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
          )}

          {user?.choose === "recruter" && (
            <NavLink
              to="/home/jobs" // Specify the link for Jobs
              className={({ isActive }) =>
                isActive
                  ? "flex flex-col items-center text-blue-800"
                  : "flex flex-col items-center"
              }
            >
              <FaBriefcase size={24} />
              <span className="text-sm mt-1">Jobs</span>
            </NavLink>
          )}

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

          {/* Right section: Profile Icon and Dropdown */}
          <div className="relative">
            <div
              className="flex bg-blue-800 p-4 rounded-b-full items-center cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
            >
              {user ? (
                <img
                  src={user.profilpic} // Use the profile picture from the user context
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <FaUserAlt className="text-white" size={24} />
              )}
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute z-10 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <button
                  onClick={handleProfileNavigation}
                  className="block w-full text-left p-2 text-blue-600 hover:bg-gray-100"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left p-2 text-red-600 hover:bg-gray-100 rounded-b-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
