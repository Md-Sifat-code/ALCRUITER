import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaIndustry,
  FaBuilding,
  FaEnvelope,
  FaLink,
} from "react-icons/fa";
import { useUser } from "../Context/UserContext"; // Import the useUser hook

const Recruiter: React.FC = () => {
  const { user, isLoading, error } = useUser(); // Access user from context
  const [showModal, setShowModal] = useState(false);

  const [body, setBody] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [posts, setPosts] = useState<any[]>([]); // State to store posts

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleRecruitmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const recruitmentData = {
      body,

      userId: user?.id, // user ID automatically filled from context
    };

    try {
      const response = await fetch("https://chakrihub-1.onrender.com/Post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recruitmentData),
      });

      if (response.ok) {
        closeModal(); // Close modal after success
        window.location.reload(); // Reload the page after success
      } else {
        alert("Error posting recruitment.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch the posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      if (user?.id) {
        try {
          const response = await fetch(
            `https://chakrihub-1.onrender.com/Post/user/${user.id}`
          );
          if (response.ok) {
            const data = await response.json();
            setPosts(data); // Store the posts in the state
          } else {
            alert("Failed to fetch posts.");
          }
        } catch (error) {
          alert("An error occurred while fetching posts.");
        }
      }
    };

    fetchPosts();
  }, [user?.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Recruiter details
  const recruiter = user?.recruter;

  return (
    <>
      <div className="flex justify-center mt-8 items-start bg-gray-100">
        <div className="max-w-6xl w-full bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Cover Image */}
          <div className="relative">
            <img
              className="w-full h-56 object-cover"
              src={recruiter?.coverPhoto || "/default-cover.jpg"} // Default cover photo if not available
              alt="Company Cover"
            />
            <div className="absolute inset-0 top-32 px-12 mb-6">
              <img
                className="w-32 h-32 rounded-full border-4 border-white shadow-md"
                src={user?.profilpic || "/default-profile.jpg"} // Default profile pic if not available
                alt="Recruiter Profile"
              />
            </div>
          </div>

          {/* Recruiter Details */}
          <div className="px-12 text-start mt-14">
            <div className="flex items-center space-x-2">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {recruiter?.companyName || "Company Name"}{" "}
                {/* Display Company Name */}
              </h2>
              <span className="flex items-center bg-red-600 font-bold text-white text-sm px-2 py-1 rounded-full">
                <FaBuilding className="mr-1" />
                Recruiter
              </span>
            </div>
            <p className="text-gray-500 mb-4">
              {recruiter?.companyDiscription ||
                "We are a leading software company specializing in innovative tech solutions."}
            </p>

            {/* Company Info */}
            <div className="flex flex-col space-y-4 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <FaIndustry className="text-gray-400" />
                <span className="text-gray-600">
                  {recruiter?.industryType || "Industry Type"}
                </span>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <FaMapMarkerAlt className="text-gray-400" />
                <span className="text-gray-600">
                  {recruiter?.officeLocation || "Location"}
                </span>
                <button
                  onClick={openModal}
                  className="ml-2 text-blue-500 text-sm underline"
                >
                  More Info
                </button>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-blue-500">
                Job Openings: React, Node.js, Full Stack Developer
              </span>
            </div>

            {/* Add Recruitment Button (Inside the Upper Card) */}
            <div className="mt-4 mb-6">
              <button
                onClick={openModal}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md"
              >
                Add Recruitment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About Section (Below the Upper Card) */}
      <div className="mt-8 flex justify-center items-center">
        <div className="max-w-6xl w-full bg-white rounded-lg shadow-2xl p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            About {recruiter?.companyName || "Company"}
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            {recruiter?.companyDiscription ||
              "We are a team of professionals dedicated to providing innovative solutions that help businesses thrive."}
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            At {recruiter?.companyName || "Company"}, we focus on building
            scalable and reliable software applications that help our clients
            achieve their business goals.
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-center items-center">
        <div className="max-w-6xl w-full bg-white rounded-lg shadow-2xl p-8">
          {/* Displaying Posts Side by Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-6 border rounded-lg shadow-lg"
              >
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  {post.title}
                </h4>
                <p className="text-gray-600 mb-2">{post.body}</p>
                <div className="flex items-center space-x-2 mb-2">
                  <FaLink className="text-blue-500" />
                  <span className="text-gray-500">{post.skills}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaEnvelope className="text-gray-500" />
                  <span className="text-gray-600">{post.mail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recruitment Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-transparent">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96">
            <h3 className="text-2xl font-semibold mb-4">Post a Recruitment</h3>
            <form onSubmit={handleRecruitmentSubmit}>
              <div className="mb-4">
                <label htmlFor="body" className="block text-gray-700">
                  Job Description
                </label>
                <textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full h-48 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                  {isSubmitting ? "Posting..." : "Post Recruitment"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Recruiter;
