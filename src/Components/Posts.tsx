import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
// import { useNavigate } from "react-router-dom"; // Import useNavigate hook

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

  // const navigate = useNavigate(); // Hook for navigation

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

  if (error) {
    return <div>{error}</div>;
  }

  // const handlePostClick = (id: number) => {
  //   // Navigate to the detailed post page with post id
  //   navigate(`/home/post/${id}`);
  // };

  return (
    <section className="">
      <div className="space-y-6">
        {loading ? (
          // Skeleton Loader
          <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
            {/* Profile Section */}
            <div className="flex items-center space-x-4 p-4">
              <div className="skeleton h-12 w-12 rounded-full"></div>{" "}
              {/* Profile picture skeleton */}
              <div className="flex flex-col space-y-2">
                <div className="skeleton h-5 w-32"></div>{" "}
                {/* Username skeleton */}
                <div className="skeleton h-4 w-40"></div> {/* Email skeleton */}
              </div>
            </div>
            {/* Post Body */}
            <div className="skeleton h-16 w-full mb-4"></div>{" "}
            {/* Post body skeleton */}
            {/* Post Image */}
            <div className="skeleton h-48 w-full rounded-b-[18px]"></div>{" "}
            {/* Post image skeleton */}
            {/* Recruiter Info (conditionally displayed) */}
            <div className="mt-4">
              <div className="skeleton h-5 w-40"></div>{" "}
              {/* Recruiter name skeleton */}
              <div className="skeleton h-4 w-56"></div>{" "}
              {/* Company name skeleton */}
              <div className="skeleton h-4 w-60"></div>{" "}
              {/* Industry and office location skeleton */}
            </div>
          </div>
        ) : (
          // Real Post Content
          posts.map((post) => (
            <div
              key={post.id}
              className="max-w-xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden"
              // Add click handler
            >
              {/* Profile Section */}
              <div className="flex items-center space-x-4 p-4">
                <img
                  src={post.user.profilpic}
                  alt={post.user.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-[#555555]">
                    {post.user.username}
                  </h3>
                  <p className="text-sm text-[#555555]">
                    {post.user.email}
                    <p>{post.createdDate}</p>
                  </p>
                </div>
              </div>

              {/* Post Body */}
              <PostBody body={post.body} />
              <img
                className="w-full rounded-b-[18px]"
                src={post.photo}
                alt=""
              />

              {/* Recruiter Info (conditionally displayed) */}
              {post.user.recruiter && (
                <div className="mt-4">
                  <h3 className="font-semibold text-[#555555]">
                    Recruiter: {post.user.recruiter.name}
                  </h3>
                  <p className="text-[#555555]">
                    {post.user.recruiter.companyName}
                  </p>
                  <p className="text-[#555555]">
                    {post.user.recruiter.industryType} -{" "}
                    {post.user.recruiter.officeLocation}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Posts;
