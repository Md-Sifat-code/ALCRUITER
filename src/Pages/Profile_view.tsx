import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface CandidateProfile {
  id: number;
  username: string;
  email: string;
  candidate: {
    location: string;
    id: number;
    language: string;
    fullName: string;
    educationalQualifications: string;
    skills: string;
    phoneNumber: string;
    yearsOfExperience: string;
    preferedPossion: string | null;
    portfolioLinks: string;
    pastExperience: string;
    bio: string;
    about: string;
    cv: string;
    coverPic: string;
  };
  profilpic: string;
  recruter: string | null;
  choose: string;
}

const Profile_view: React.FC = () => {
  const { username } = useParams(); // Get userName from the URL
  const [profileData, setProfileData] = useState<CandidateProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Convert userName to lowercase

  // Fetch user profile based on the userName
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        `https://chakrihub-mhh5.onrender.com/User/search/${username}`
      );

      if (!response.ok) {
        setError(`Error: ${response.statusText}`);
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log("Fetched user profile:", data);

      if (data) {
        setProfileData(data);
      } else {
        setError("No profile data found.");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError("Failed to fetch user profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchUserProfile();
    } else {
      setError("UserName is missing in the URL.");
    }
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto max-w-7xl py-6">
      {profileData && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mb-8">
          {profileData.candidate.coverPic && (
            <div className="mb-6">
              <img
                src={profileData.candidate.coverPic}
                alt="Cover Picture"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
          {/* Profile Picture */}
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={profileData.profilpic}
              alt={`${profileData.username}'s profile`}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">
                {profileData.candidate.fullName}
              </h3>
              <p className="text-sm text-gray-500">{profileData.username}</p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700">Bio</h4>
            <p className="text-gray-600">{profileData.candidate.bio}</p>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-gray-700">About</h4>
            <p className="text-gray-600">{profileData.candidate.about}</p>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-gray-700">Skills</h4>
            <p className="text-gray-600">{profileData.candidate.skills}</p>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-gray-700">Location</h4>
            <p className="text-gray-600">{profileData.candidate.location}</p>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-gray-700">Years of Experience</h4>
            <p className="text-gray-600">
              {profileData.candidate.yearsOfExperience}
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-gray-700">Phone Number</h4>
            <p className="text-gray-600">{profileData.candidate.phoneNumber}</p>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-gray-700">CV</h4>
            <a
              href={profileData.candidate.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              View CV
            </a>
          </div>

          {/* Cover Image */}
        </div>
      )}
    </div>
  );
};

export default Profile_view;
