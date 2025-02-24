import React, { useEffect } from "react";
import { FaUserCircle, FaCog, FaBell, FaSpinner } from "react-icons/fa";
import { useUser } from "../Context/UserContext"; // Import the useUser hook
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const LeftSide: React.FC = () => {
  const { user, isLoading, error, fetchUserDetails } = useUser();
  const navigate = useNavigate(); // Declare navigate here

  const handleProfileNavigation = () => {
    console.log("Navigating to profile...");
    if (user?.choose === "candidate") {
      console.log("Navigating to candidate profile");
      navigate("/home/profile/candidate");
    } else if (user?.choose === "recruter") {
      console.log("Navigating to recruiter profile");
      navigate("/home/profile/recruiter");
    } else {
      console.log("User choose is not set correctly or invalid");
    }
  };

  // Optional: Trigger fetching of user details if not available (depending on your app structure)
  useEffect(() => {
    if (user === null && sessionStorage.getItem("username")) {
      const username = sessionStorage.getItem("username");
      if (username) {
        fetchUserDetails(username);
      }
    }
  }, [user, fetchUserDetails]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2">
        <FaSpinner className="animate-spin text-blue-500 w-6 h-6" />
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }
  if (error) return <p>{error}</p>;

  return (
    <section className="">
      <div className="flex flex-col items-center space-y-6">
        {/* Profile Card */}
        <div className="w-full flex justify-center items-center max-w-xs p-6 bg-white shadow-lg rounded-xl">
          <button
            onClick={handleProfileNavigation}
            className="flex flex-col justify-center items-center"
          >
            {/* Display profile picture if available or fallback to default */}
            {user?.profilpic ? (
              <img
                src={user.profilpic}
                alt="Profile Picture"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-4xl text-gray-700" />
            )}
            <button
              onClick={handleProfileNavigation}
              className="mt-4 text-xl font-semibold"
            >
              {user?.username}
            </button>
            <p className="text-gray-500">Software Developer</p>
          </button>
        </div>

        {/* Page Card */}
        <Link
          to={"/amnei"}
          className="w-full max-w-xs p-6 bg-white shadow-lg rounded-xl"
        >
          <h3 className="text-lg font-medium">Page Settings</h3>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span>Privacy</span>
              <FaCog className="text-gray-600" />
            </div>
            <div className="flex justify-between items-center">
              <span>Notifications</span>
              <FaBell className="text-gray-600" />
            </div>
          </div>
        </Link>

        {/* Recent Activity Card */}
        <Link
          to={"/amnei"}
          className="w-full max-w-xs p-6 bg-white shadow-lg rounded-xl"
        >
          <h3 className="text-lg font-medium">Recent Activity</h3>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span>Logged in from New Device</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Updated Profile Picture</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Joined New Group</span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default LeftSide;
