import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaDownload,
} from "react-icons/fa"; // Add some icons for better UI

const User_profile: React.FC = () => {
  const location = useLocation();
  const { username } = location.state || {}; // Retrieve username from location state
  const [userProfile, setUserProfile] = useState<any>(null); // Store the user profile data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (username) {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(
            `https://chakrihub-1.onrender.com/User/search/${username}`
          );
          setUserProfile(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user:", error);
          setLoading(false);
        }
      };

      fetchUserProfile();
    }
  }, [username]); // Fetch profile data when username changes

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-700">Loading...</div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-600">User not found.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-8">
          <img
            src={userProfile.profilpic}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-600 shadow-md"
          />
          <div className="flex flex-col">
            <h2 className="text-3xl font-semibold text-gray-900">
              {userProfile.candidate.fullName}
            </h2>
            <p className="text-lg text-gray-600">{userProfile.username}</p>
            <p className="text-md text-gray-500">{userProfile.candidate.bio}</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <FaEnvelope size={20} className="text-blue-500" />
              <p className="text-lg text-gray-700">{userProfile.email}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <FaPhoneAlt size={20} className="text-blue-500" />
              <p className="text-lg text-gray-700">
                {userProfile.candidate.phoneNumber}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt size={20} className="text-blue-500" />
              <p className="text-lg text-gray-700">
                {userProfile.candidate.location}
              </p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-900">Skills</h3>
          <p className="text-lg text-gray-700">
            {userProfile.candidate.skills}
          </p>
        </div>

        {/* CV Link */}
        <div className="mt-6">
          <a
            href={userProfile.candidate.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-600 hover:underline"
          >
            <FaDownload size={20} />
            <span className="text-lg">Download CV</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default User_profile;
