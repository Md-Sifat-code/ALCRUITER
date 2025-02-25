import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

// Define the structure of the post and user data
interface Recruiter {
  name: string;
  companyName: string;
  industryType: string;
  officeLocation: string;
  coverPhoto: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  profilpic: string;
  recruiter: Recruiter | null; // Make recruiter optional
}

interface Post {
  id: number;
  title: string;
  body: string;
  skills: string;
  mail: string;
  user: User;
  createdDate: string;
  photo: string;
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

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]); // State to store fetched posts
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Fetch posts from API
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://chakrihub-1.onrender.com/Post");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center space-x-2">
        <FaSpinner className="animate-spin text-blue-500 w-6 h-6" />
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handlePostClick = (id: number) => {
    // Navigate to the detailed post page with post id
    navigate(`/home/post/${id}`);
  };

  return (
    <section className="">
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="max-w-xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden"
            // Add click handler
          >
            {/* Check if recruiter cover photo exists */}

            <div className="">
              <div className="flex items-center space-x-4 p-4">
                {/* Check if user profile picture exists */}
                <img
                  src={post.user.profilpic}
                  alt={post.user.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {post.user.username}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {post.user.email}
                    <p>{post.createdDate}</p>
                  </p>
                </div>
              </div>

              <PostBody body={post.body} />
              <img
                className="w-full rounded-b-[18px]"
                src={post.photo}
                alt=""
              />

              {/* Check if recruiter info exists */}
              {post.user.recruiter && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-700">
                    Recruiter: {post.user.recruiter.name}
                  </h3>
                  <p className="text-gray-600">
                    {post.user.recruiter.companyName}
                  </p>
                  <p className="text-gray-600">
                    {post.user.recruiter.industryType} -{" "}
                    {post.user.recruiter.officeLocation}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Posts;
