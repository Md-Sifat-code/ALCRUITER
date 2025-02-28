import React, { useState, useEffect } from "react";

interface Candidate {
  candidateId: number;
  candidateName: string;
  matchedSkills: string[];
  matchPercentage: number;
  username: string;
}

interface User {
  id: number;
  email: string;
  profilpic: string;
  candidate: {
    location: string;
    fullName: string;
    skills: string;
    phoneNumber: string;
    yearsOfExperience: string;
    pastExperience: string;
    bio: string;
    about: string;
    cv: string;
    coverPic: string;
  };
  username: string;
}

const Toptalents: React.FC = () => {
  const [topCandidates, setTopCandidates] = useState<Candidate[]>([]);
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch top candidates
    const fetchTopCandidates = async () => {
      try {
        const response = await fetch(
          "https://chakrihub-1.onrender.com/api/v1/recruiter/top-candidates"
        );
        if (response.ok) {
          const data = await response.json();
          setTopCandidates(data); // Set top candidates
          fetchUserDetails(data); // Fetch user details for each candidate
        } else {
          alert("Failed to fetch top candidates.");
        }
      } catch (error) {
        alert("An error occurred while fetching top candidates.");
      }
    };

    // Fetch user details for each candidate
    const fetchUserDetails = async (candidates: Candidate[]) => {
      try {
        const userDetailsPromises = candidates.map(async (candidate) => {
          const response = await fetch(
            `https://chakrihub-1.onrender.com/User/search/${candidate.username}`
          );
          if (response.ok) {
            const data = await response.json();
            return data;
          } else {
            alert("Failed to fetch user details.");
            return null;
          }
        });

        const users = await Promise.all(userDetailsPromises);
        setUserData(users.filter((user) => user !== null)); // Filter out any null responses
      } catch (error) {
        alert("An error occurred while fetching user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopCandidates();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" flex justify-center items-center mt-2">
      <div className=" w-full   ">
        <div className="grid grid-cols-1  gap-8">
          {userData.map((user) => (
            <div
              key={user.id}
              className=" bg-white rounded-2xl shadow-2xl  p-2 "
            >
              <div className="flex items-center gap-2 ">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={user.profilpic}
                  alt={user.username}
                />
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    {user.candidate?.fullName}
                  </h4>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Toptalents;
