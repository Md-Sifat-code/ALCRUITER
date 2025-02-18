import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom
import {
  FaHome,
  FaUserFriends,
  FaBriefcase,
  FaEnvelope,
  FaBell,
  FaUserAlt,
  FaSearch, // Importing the search icon
} from "react-icons/fa"; // Importing icons from react-icons

const Navbar: React.FC = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto max-w-6xl flex flex-row justify-between items-center py-1 px-6">
        {/* Left section: Logo and Searchbar */}
        <div className="flex items-center space-x-4">
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
            to="/network" // Specify the link for My Network
            className={({ isActive }) =>
              isActive
                ? "flex flex-col items-center text-blue-800"
                : "flex flex-col items-center"
            }
          >
            <FaUserFriends size={24} />
            <span className="text-sm mt-1">My Network</span>
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
            to="/messages" // Specify the link for Messaging
            className={({ isActive }) =>
              isActive
                ? "flex flex-col items-center text-blue-800"
                : "flex flex-col items-center"
            }
          >
            <FaEnvelope size={24} />
            <span className="text-sm mt-1">Messaging</span>
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
        </div>

        {/* Right section: Profile Icon */}
        <div className="flex items-center">
          <FaUserAlt size={24} />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
