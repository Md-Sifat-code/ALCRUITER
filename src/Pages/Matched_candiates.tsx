import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaUser, FaStar, FaCode } from "react-icons/fa";
// We will use the Bootstrap progress bar here for visual clarity

interface MatchedCandidate {
  candidateId: number;
  candidateName: string;
  matchedSkills: string[];
  matchPercentage: number;
}

const Matched_candiates: React.FC = () => {
  const { postId } = useParams(); // Get postId from the URL
  const [matchedCandidates, setMatchedCandidates] = useState<
    MatchedCandidate[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatchedCandidates = async () => {
      if (!postId) {
        setError("Post ID is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://chakrihub-1.onrender.com/api/v1/recruiter/suggestions/${postId}`
        );

        if (!response.ok) {
          setError(`Error: ${response.statusText}`);
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log("Matched candidates data:", data);

        if (data.length === 0) {
          setError("No candidates found.");
        } else {
          setMatchedCandidates(data);
        }
      } catch (error) {
        console.error("Error fetching matched candidates:", error);
        setError("Failed to fetch matched candidates.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatchedCandidates();
  }, [postId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto max-w-7xl py-6">
      {matchedCandidates.map((candidate) => (
        <div
          key={candidate.candidateId}
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mb-8 hover:shadow-2xl transition-all duration-300 ease-in-out"
        >
          <div className="flex items-center space-x-4 mb-4">
            <FaUser className="text-blue-600" size={48} />
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">
                {candidate.candidateName}
              </h3>
              <p className="text-sm text-gray-500">Candidate</p>
            </div>
          </div>

          {/* Match Percentage */}

          {/* Matched Skills */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700">Matched Skills</h4>
            <ul className="list-disc pl-5 space-y-2">
              {candidate.matchedSkills.map((skill, index) => (
                <li
                  key={index}
                  className="text-gray-600 flex items-center space-x-2"
                >
                  <FaCode className="text-green-500" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional info */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <FaStar className="text-yellow-400" />
              <span>Match Quality: {candidate.matchPercentage}%</span>
            </div>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-all"
              onClick={() => {
                console.log(`Matched candidate ${candidate.candidateId}`);
                // Add action for button click here
              }}
            >
              View Profile
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Matched_candiates;
