import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa6";
import { useParams } from "react-router-dom"; // Import useParams hook to extract post id from URL

interface Recruiter {
  id: number;
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
  recruiter: Recruiter | null;
}

interface Post {
  id: number;
  title: string;
  body: string;
  skills: string;
  mail: string;
  user: User;
}

const Post_Details: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams(); // Extract post id from URL params

  useEffect(() => {
    const fetchPostDetail = async () => {
      if (!id) return;
      try {
        const response = await fetch(
          `https://chakrihub-1.onrender.com/Post/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError("Failed to load post details");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen space-x-2">
        <FaSpinner className="animate-spin text-blue-500 w-6 h-6" />
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-xl font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-xl font-semibold text-gray-600">
          Post not found
        </div>
      </div>
    );
  }

  // Check if recruiter exists before accessing
  const recruiter = post.user.recruiter;

  const handleRecruiterClick = (recruiterId: number) => {
    // Navigate to recruiter detail page
    window.location.href = `/home/recruiter/${recruiterId}`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden p-6 mt-8">
      {/* Post Title */}
      <h2 className="text-3xl font-bold text-gray-900">{post.title}</h2>
      <p className="mt-2 text-xl text-gray-700">{post.body}</p>

      {/* Skills & Email */}
      <div className="mt-6 text-lg text-gray-600 space-y-2"></div>

      {/* Recruiter Information Section */}
      {recruiter && (
        <div
          className="mt-8 bg-gray-50 p-6 rounded-xl shadow-lg space-y-4 cursor-pointer"
          onClick={() => handleRecruiterClick(recruiter.id)} // Navigate to Recruiter component
        >
          <div className="flex items-center space-x-6">
            {/* Recruiter Cover Photo */}
            <img
              src={recruiter.coverPhoto}
              alt={recruiter.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {recruiter.name}
              </h3>
              <p className="text-sm text-gray-600">{recruiter.companyName}</p>
            </div>
          </div>

          {/* Recruiter Details */}
          <div className="mt-4 text-sm text-gray-500 space-y-1">
            <p>
              <strong>Industry:</strong> {recruiter.industryType}
            </p>
            <p>
              <strong>Location:</strong> {recruiter.officeLocation}
            </p>
          </div>
        </div>
      )}

      {/* User Information Section */}
      <div className="mt-8 p-6 bg-gray-100 rounded-xl shadow-lg">
        <div className="flex items-center space-x-6">
          {/* User Profile Picture */}
          <img
            src={post.user.profilpic}
            alt={post.user.username}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h4 className="text-xl font-semibold text-gray-900">
              {post.user.username}
            </h4>
            <p className="text-sm text-gray-600">{post.user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post_Details;
