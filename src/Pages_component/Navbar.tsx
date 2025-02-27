import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBriefcase, FaBell, FaUserAlt, FaSearch } from "react-icons/fa";
import { IoNewspaper } from "react-icons/io5";
import { useUser } from "../Context/UserContext";
import { FaHandshake } from "react-icons/fa";
// Import axios for HTTP requests

const Navbar: React.FC = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Track the search input

  const handleLogout = () => {
    sessionStorage.clear();
    logout();
    navigate("/");
  };

  const handleProfileNavigation = () => {
    if (user?.choose === "candidate") {
      navigate("/home/profile/candidate");
    } else if (user?.choose === "recruter") {
      navigate("/home/profile/recruiter");
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handle search when search icon is clicked
  const handleSearch = async () => {
    if (searchQuery) {
      // Navigate to userprofile page with the username
      navigate(`/home/userprofile`, { state: { username: searchQuery } });
    }
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center py-1 px-6 lg:px-0">
        <div className="flex mb-4 md:mb-0 items-center space-x-4">
          <Link
            to={"/home"}
            className="bg-[#6F9EF6] p-2 text-white font-bold mr-1"
          >
            AL
          </Link>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Candidates"
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-2 pl-10 pr-3 border border-gray-300 rounded-md"
            />
            <FaSearch
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={handleSearch} // Trigger search on icon click
            />
          </div>
        </div>

        {/* Middle section: Navigation */}
        <div className="flex flex-row items-center gap-8 space-x-6">
          {/* Conditionally render Home or Jobs based on user.choose */}

          <NavLink
            to="/home" // Specify the link for Home
            className={({ isActive }) =>
              isActive
                ? "flex flex-col items-center text-blue-600"
                : "flex flex-col items-center"
            }
          >
            <IoNewspaper size={24} />
            <span className="text-sm mt-1">Feed</span>
          </NavLink>

          {user?.choose === "candidate" && (
            <NavLink
              to={`/home/matchjob/${user.candidate.id}`} // Pass the candidateId in the URL
              className={({ isActive }) =>
                isActive
                  ? "flex flex-col items-center text-blue-600"
                  : "flex flex-col items-center"
              }
            >
              <FaBriefcase className=" rotate-45" size={24} />
              <span className="text-sm mt-1">Match Job</span>
            </NavLink>
          )}
          {user?.choose === "recruter" && (
            <NavLink
              to={`/home/jobs/${user.id}`} // Pass the user ID to the Jobs page
              className={({ isActive }) =>
                isActive
                  ? "flex flex-col items-center text-blue-600"
                  : "flex flex-col items-center"
              }
            >
              <FaHandshake className="" size={24} />
              <span className="text-sm mt-1">Match</span>
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
            <span className="text-sm mt-1">Notice</span>
          </NavLink>
          {/* Right section: Profile Icon and Dropdown */}
          <div className="relative">
            <div
              className="flex bg-[#6F9EF6] p-4 rounded-b-full items-center cursor-pointer"
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
