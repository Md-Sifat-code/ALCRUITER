import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaIndustry, FaBuilding } from "react-icons/fa";
import { FaCircleInfo, FaPlus } from "react-icons/fa6";
import { useUser } from "../Context/UserContext"; // Import the useUser hook

// PostBody Component: Handles the "Read More" functionality
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

const Recruiter: React.FC = () => {
  const { user, isLoading, error } = useUser(); // Access user from context
  const [showModal, setShowModal] = useState(false);
  const [body, setBody] = useState("");
  const [coverPhoto, setCoverPhoto] = useState<any>(null); // State to store the selected cover photo
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [posts, setPosts] = useState<any[]>([]); // State to store posts

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Function to handle the cover photo change
  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPhoto(file); // Store the file directly (not the URL) in state
    }
  };

  const handleRecruitmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create a new FormData object
    const formData = new FormData();

    // Append the job description (body)
    formData.append("body", body);

    // Ensure user?.id is converted to string before appending
    formData.append("userId", String(user?.id || ""));

    // Append the cover photo if it exists
    if (coverPhoto) {
      formData.append("coverPhoto", coverPhoto); // Append the file (cover photo)
    }

    try {
      const response = await fetch(
        "https://chakrihub-1.onrender.com/Post/add",
        {
          method: "POST",
          body: formData, // Send the form data with the file and text
        }
      );

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
      <div className="flex justify-center mt-8 items-start ">
        <div className="max-w-6xl w-full bgcard rounded-[18px] shadow-2xl overflow-hidden">
          {/* Cover Image */}
          <div className="relative">
            <img
              className="w-full h-56 object-cover"
              src={recruiter?.coverPhoto || "/default-cover.jpg"} // Default cover photo if not available
              alt="Company Cover"
            />
            <div className="absolute inset-0 top-36 px-12 mb-6">
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
              <h2 className="text-2xl  font-bold text-gray-800 ">
                {recruiter?.name || "Company Name"} {/* Display Company Name */}
              </h2>
              <span className="flex items-center bg-red-600 font-bold text-white text-sm px-2 py-1 rounded-full">
                <FaBuilding className="mr-1" />
                Recruiter
              </span>
            </div>
            <p className="text-gray-800 font-semibold ">
              {recruiter?.companyName || "A Software Company"}
            </p>
            <p
              className="text-gray-500 w-full md:w-[80%] lg:w-[70%] mt-4
            mb-2 "
            >
              {recruiter?.bio ||
                "We are a leading software company specializing in innovative tech solutions."}
            </p>

            {/* Company Info */}
            <div className="flex flex-col space-y-4 mt-6 mb-4">
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
              </div>
              <div>
                <button className=" text-blue-500 flex flex-row gap-2 items-center text-sm underline">
                  <FaCircleInfo />
                  More Info
                </button>
              </div>
            </div>

            {/* Add Recruitment Button (Inside the Upper Card) */}
            <div className="mt-4 mb-6">
              <button
                onClick={openModal}
                className="bg-[#FA8E8C] hover:bg-green-600 text-black font-medium py-2 px-4 rounded-[18px] shadow-md"
              >
                Add Recruitment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About Section (Below the Upper Card) */}
      <div className="mt-8 flex justify-center items-center">
        <div className="max-w-6xl w-full bgcard rounded-lg shadow-2xl p-8">
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
      <div className="mt-8  flex flex-col justify-center items-center ">
        <div className="max-w-6xl h-auto p-4 md:h-[100px] bgcard w-full bg-transparent flex flex-col md:flex-row items-center rounded-[18px] shadow-2xl px-12 justify-between gap-12">
          <button className="px-12 py-3 rounded-[18px] text-black bg-[#FA8E8C] font-semibold">
            Posts
          </button>
          <button className="px-16 py-3 rounded-[18px] text-black bg-gray-300 font-semibold">
            Matched Candidates
          </button>
          <button className="px-16 py-3 rounded-[18px] text-black bg-gray-300 font-semibold">
            Recruitment
          </button>
        </div>
      </div>

      <div className="mt-8 flex justify-center items-center">
        <div className="max-w-6xl w-full bg-transparent grid grid-cols-1 md:grid-cols-3 gap-12  ">
          {/* Displaying Posts Side by Side */}
          <div className="col-span-2 grid grid-cols-1  ">
            <h1 className="text-black font-bold  text-2xl mb-4">Posts</h1>
            {posts.map((post) => (
              <div
                key={post.id}
                className="bgcard card mb-6  rounded-[18px] shadow-2xl"
              >
                <div className="flex p-4 flex-row items-center gap-2">
                  <div>
                    <img
                      className="w-[70px] h-[70px] rounded-full"
                      src={user?.profilpic}
                      alt=""
                    />
                  </div>
                  <div className="">
                    <h1>{recruiter?.name}</h1>
                    <p>{user?.email}</p>
                    <p>{post.createdDate}</p>
                  </div>
                </div>

                {/* Pass the post.body to PostBody component */}
                <PostBody body={post.body} />

                <img
                  className="w-full rounded-b-[18px]"
                  src={post.photo}
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className="border-l-1 px-12 py-3 border-gray-500">
            <h1 className="text-black font-bold text-2xl">Top talents</h1>
          </div>
        </div>
      </div>

      {/* Recruitment Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-transparent">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96 lg:w-[600px]">
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

              {/* Cover Photo Input */}
              <div className="mb-4">
                <label htmlFor="coverPhoto" className="block text-gray-700">
                  Cover Photo
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="coverPhoto"
                    accept="image/*"
                    onChange={handleCoverPhotoChange} // Handle file selection
                    className="hidden"
                  />
                  <label
                    htmlFor="coverPhoto"
                    className="flex justify-center items-center border-2 border-dashed border-gray-400 p-6 rounded-md cursor-pointer"
                  >
                    {coverPhoto ? (
                      <img
                        src={URL.createObjectURL(coverPhoto)}
                        alt="Cover Preview"
                        className="w-full h-32 object-cover rounded-md"
                      />
                    ) : (
                      <FaPlus className="text-4xl text-gray-500" />
                    )}
                  </label>
                </div>
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
