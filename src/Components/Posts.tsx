import React, { useState, useEffect } from "react";

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
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]); // State to store fetched posts
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="">
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="max-w-xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden"
          >
            {/* Check if recruiter cover photo exists */}
            {post.user.recruiter?.coverPhoto && (
              <img
                src={post.user.recruiter.coverPhoto}
                alt={post.user.recruiter.companyName}
                className="w-full h-56 object-cover"
              />
            )}
            <div className="p-6">
              <div className="flex items-center space-x-4">
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
                  <p className="text-sm text-gray-600">{post.user.email}</p>
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mt-4">
                {post.title}
              </h2>
              <p className="mt-2 text-gray-600">{post.body}</p>
              <div className="mt-4 text-sm text-gray-500">
                <p>
                  <strong>Skills:</strong> {post.skills}
                </p>
                <p>
                  <strong>Email:</strong> {post.mail}
                </p>
              </div>
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
``;
