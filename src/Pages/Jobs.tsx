import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ads1 from "/ads-1.png";
import ads2 from "/ads-3..png";
import ads3 from "/ads-2.png";
import ads4 from "/ads-1.png";
interface JobPost {
  id: number;
  body: string;
  photo: string;
  createdDate: string;
  updatedDate: string;

  user: {
    id: number;
    username: string;
    email: string;
    profilpic: string;
    recruter: {
      name: string;
      id: number;
      companyDiscription: string;
      industryType: string;
      officeLocation: string;
      companyName: string;
      coverPhoto: string;
    };
    choose: string;
  };
}
const PostBody: React.FC<{ body: string }> = ({ body }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div>
      <p
        className={`text-gray-600 px-4 mb-2 ${
          !isExpanded ? "line-clamp-6" : ""
        }`}
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: !isExpanded ? 6 : "unset",
        }}
      >
        {body}
      </p>

      {/* Show the 'Read More' or 'Read Less' button */}
      <button
        onClick={toggleReadMore}
        className="text-blue-500 px-4 text-sm mt-[-14px] mb-4"
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    </div>
  );
};

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
    <div className="container mx-auto max-w-6xl gap-4 py-4 grid grid-cols-1 md:grid-cols-5">
      <div className="px-4 md:px-0 col-span-3">
        {jobPosts.map((post) => (
          <div
            key={post.id}
            className="bgcard p-6 rounded-2xl mb-6 shadow-2xl card flex flex-col "
          >
            <div className="flex items-center mb-4">
              <img
                src={post.user.profilpic}
                alt="Recruiter"
                className="w-[70px] h-[70px] rounded-full mr-4"
              />
              <div>
                <h4 className="text-xl font-semibold">
                  {post.user.recruter.name}
                </h4>
                <p className="text-gray-600 text-sm">{post.user.email}</p>
              </div>
            </div>
            <PostBody body={post.body} />

            {/* Match Candidates Button */}
            <div className="flex flex-row justify-center items-center">
              <button
                onClick={() => handleMatchCandidates(post.id)}
                className="bg-[#22E580] text-black font-semibold py-2 px-4 rounded-md hover:bg-teal-500 transition duration-200"
              >
                Match Candidates
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className=" col-span-2 border-l-1 gap-4 grid grid-cols-1 px-4 ">
        {/* ads section */}
        <div>
          <img src={ads1} alt="" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <img src={ads2} alt="" />
          </div>
          <div className="h-full">
            <img className="h-full" src={ads3} alt="" />
          </div>
        </div>
        <div>
          <img src={ads4} alt="" />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Jobs;
