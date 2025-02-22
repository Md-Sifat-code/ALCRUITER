import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface JobPost {
  id: number;
  body: string;
  user: {
    id: number;
    username: string;
    email: string;
    profilpic: string;
    recruter: {
      name: string;
      companyName: string;
      coverPhoto: string;
    };
    choose: string;
  };
}

const Jobs: React.FC = () => {
  const { userId } = useParams(); // Get userId from the URL
  const navigate = useNavigate(); // Use for navigation
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // State to store error message

  useEffect(() => {
    const fetchJobPosts = async () => {
      if (!userId) {
        setError("User ID is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://chakrihub-1.onrender.com/Post/user/${userId}`
        );

        // Check if response is ok (status 200-299)
        if (!response.ok) {
          setError(`Error: ${response.statusText}`);
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log("Job posts data:", data); // Log the response data for debugging

        if (data.length === 0) {
          setError("No job posts found.");
        } else {
          setJobPosts(data);
        }
      } catch (error) {
        console.error("Error fetching job posts:", error);
        setError("Failed to fetch job posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobPosts();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleMatchCandidates = (postId: number) => {
    navigate(`/home/matched/candidates/${postId}`);
  };

  return (
    <div className="container mx-auto max-w-7xl py-4">
      {jobPosts.map((post) => (
        <div
          key={post.id}
          className="border p-6 rounded-md mb-6 shadow-md hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center mb-4">
            <img
              src={post.user.profilpic}
              alt="Recruiter"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h4 className="text-xl font-semibold">
                {post.user.recruter.name}
              </h4>
              <p className="text-gray-600 text-sm">
                {post.user.recruter.companyName}
              </p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{post.body}</p>

          {/* Match Candidates Button */}
          <button
            onClick={() => handleMatchCandidates(post.id)}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Match Candidates
          </button>
        </div>
      ))}
    </div>
  );
};

export default Jobs;
