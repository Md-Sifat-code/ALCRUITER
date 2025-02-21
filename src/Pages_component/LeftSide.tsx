import React, { useEffect } from "react";
import { FaUserCircle, FaCog, FaBell } from "react-icons/fa";
import { useUser } from "../Context/UserContext"; // Import the useUser hook

const LeftSide: React.FC = () => {
  const { user, isLoading, error, fetchUserDetails } = useUser();

  // Optional: Trigger fetching of user details if not available (depending on your app structure)
  useEffect(() => {
    if (user === null && sessionStorage.getItem("username")) {
      const username = sessionStorage.getItem("username");
      if (username) {
        fetchUserDetails(username);
      }
    }
  }, [user, fetchUserDetails]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="">
      <div className="flex flex-col items-center space-y-6">
        {/* Profile Card */}
        <div className="w-full max-w-xs p-6 bg-white shadow-lg rounded-xl">
          <div className="flex flex-col items-center">
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
            <h2 className="mt-4 text-xl font-semibold">{user?.username}</h2>
            <p className="text-gray-500">Software Developer</p>
          </div>
        </div>

        {/* Page Card */}
        <div className="w-full max-w-xs p-6 bg-white shadow-lg rounded-xl">
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
        </div>

        {/* Recent Activity Card */}
        <div className="w-full max-w-xs p-6 bg-white shadow-lg rounded-xl">
          <h3 className="text-lg font-medium">Recent Activity</h3>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span>Logged in from New Device</span>
              <span className="text-sm text-gray-500">2h ago</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Updated Profile Picture</span>
              <span className="text-sm text-gray-500">5h ago</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Joined New Group</span>
              <span className="text-sm text-gray-500">1d ago</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeftSide;
