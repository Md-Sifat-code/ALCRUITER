import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for navigation

interface JobSuggestion {
  id: number;
  description: string;
  requiredSkills: string[];
  matchPercentage: number;
  recruiterDetails?: Recruiter; // recruiterDetails is now optional
  recruiterProfilePic?: string; // recruiterProfilePic for storing the profile pic for each job
}

interface Recruiter {
  id: number;
  name: string;
  companyName: string;
  companyDiscription: string;
  industryType: string;
  officeLocation: string;
  coverPhoto: string;
}

const Match: React.FC = () => {
  const { candidateId } = useParams<{ candidateId: string }>(); // Get candidateId from URL params
  const [jobSuggestions, setJobSuggestions] = useState<JobSuggestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate for routing

  useEffect(() => {
    if (candidateId) {
      fetch(
        `https://chakrihub-1-sgbz.onrender.com/api/v1/recruiter/candidates/${candidateId}/suggestions`
      )
        .then((response) => response.json())
        .then((data) => {
          setJobSuggestions(data);
          setLoading(false);
          if (data.length > 0) {
            // Fetch recruiter details for each job concurrently
            Promise.all(
              data.map((job: JobSuggestion) =>
                fetchRecruiterDetails(job.id).then((recruiterData) => {
                  return {
                    ...job,
                    recruiterDetails: recruiterData.recruter,
                    recruiterProfilePic: recruiterData.profilpic,
                  };
                })
              )
            )
              .then((updatedJobs) => setJobSuggestions(updatedJobs))
              .catch(() => {
                setError("Failed to fetch recruiter details.");
              });
          }
        })
        .catch(() => {
          setError("Failed to fetch job suggestions.");
          setLoading(false);
        });
    }
  }, [candidateId]);

  const fetchRecruiterDetails = (jobId: number): Promise<any> => {
    return fetch(`https://chakrihub-1-sgbz.onrender.com/Post/${jobId}`)
      .then((response) => response.json())
      .then((data) => {
        return { recruter: data.user.recruter, profilpic: data.user.profilpic }; // Return recruiter details and profile picture
      });
  };

  // Handle the "View Details" button click to navigate to the recruiter details page
  const handleViewDetails = (recruiterId: number) => {
    navigate(`/home/recruiter/${recruiterId}`); // Navigate to the recruiter detail page
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500 border-t-transparent"></div>
        <p className="mt-4 text-xl text-gray-600">Loading job suggestions...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">
        Job Suggestions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {jobSuggestions.length > 0 ? (
          jobSuggestions.map((job: JobSuggestion) => (
            <div
              key={job.id}
              className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              {/* Safely check for recruiterDetails and recruiterProfilePic using optional chaining */}
              {job.recruiterDetails && job.recruiterProfilePic ? ( // Check if details exist
                <div className="p-6 bg-gray-50 rounded-t-lg border-b border-gray-300">
                  <div className="flex items-center mb-4">
                    <img
                      src={job.recruiterProfilePic}
                      alt="Recruiter"
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="text-lg font-bold text-blue-600">
                        {job.recruiterDetails.name} {/* Safe access */}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {job.recruiterDetails.companyName}
                      </p>
                    </div>
                  </div>
                  {/* ... other details ... */}
                  <button
                    className="mt-4 text-blue-500 hover:underline"
                    onClick={() => handleViewDetails(job.recruiterDetails!.id)} // Assert non-null
                  >
                    View Details
                  </button>
                </div>
              ) : (
                <div className="p-6 bg-gray-50 rounded-t-lg border-b border-gray-300">
                  {/* Fallback or empty state when recruiter details are unavailable */}
                  <p>No recruiter details available.</p>
                </div>
              )}

              <div className="p-6">
                <p className="text-gray-700 mb-4">{job.description}</p>
                <div className="mb-4">
                  <strong className="text-gray-800">Required Skills:</strong>
                  <ul className="list-disc pl-6 text-gray-600">
                    {job.requiredSkills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">
                    Match Percentage: {job.matchPercentage}%
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-lg text-gray-600">
            No job suggestions available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Match;
//ol
