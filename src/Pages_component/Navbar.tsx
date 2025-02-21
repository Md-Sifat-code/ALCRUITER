import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom
import {
  FaHome,
  FaBriefcase,
  FaBell,
  FaUserAlt,
  FaSearch,
} from "react-icons/fa"; // Importing icons from react-icons
import { PiStudentFill } from "react-icons/pi";
import { useUser } from "../Context/UserContext"; // Importing useUser to access user context

const Navbar: React.FC = () => {
  const { user } = useUser(); // Accessing the user context

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
            <div className="flex bg-blue-800 p-4 rounded-b-full items-center cursor-pointer">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
