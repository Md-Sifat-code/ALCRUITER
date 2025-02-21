import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaEnvelope,
  FaStar,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const Candidate: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);

  const posts = [
    {
      title: "Project 1",
      description:
        "A web application built using React and Node.js for a client.",
    },
    {
      title: "Project 2",
      description:
        "Developed a social media platform with real-time messaging.",
    },
    {
      title: "Project 3",
      description:
        "Created an e-commerce platform with payment gateway integration.",
    },
    {
      title: "Project 4",
      description: "Designed a portfolio website using React and Tailwind CSS.",
    },
  ];

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleNextPost = () => {
    if (currentPostIndex < posts.length - 1) {
      setCurrentPostIndex(currentPostIndex + 1);
    }
  };

  const handlePrevPost = () => {
    if (currentPostIndex > 0) {
      setCurrentPostIndex(currentPostIndex - 1);
    }
  };

  return (
    <>
      <div className="flex mt-6 justify-center items-start bg-gray-100">
        <div className="max-w-6xl w-full bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="relative">
            <img
              className="w-full h-56 object-cover"
              src="/post2.png"
              alt="Cover"
            />
            <div className="absolute inset-0 top-32 px-12 mb-6">
              <img
                className="w-32 h-32 rounded-full border-4 border-white shadow-md"
                src="/post-3.png"
                alt="Profile"
              />
            </div>
          </div>

          <div className="px-12 text-start mt-14">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                John Doe
              </h2>
              <span className="flex items-center bg-amber-600 text-white text-sm px-2 py-1 rounded-full">
                <FaStar className="mr-1" />
                Candidate
              </span>
            </div>
            <p className="text-gray-500 mb-4">Full Stack Developer</p>

            <div className="mb-4 flex flex-col items-start justify-start">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <FaMapMarkerAlt className="text-gray-400" />
                <span className="text-gray-600">New York, USA</span>
                <button
                  onClick={openModal}
                  className="ml-2 text-blue-500 text-sm underline"
                >
                  More Info
                </button>
              </div>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <FaBriefcase className="text-gray-400" />
                <span className="text-gray-600">5+ Years Experience</span>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-blue-500">
                Skills: React, Node.js, TypeScript
              </span>
            </div>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
              <div className="bg-white border border-amber-600 rounded-lg p-6 max-w-sm w-full">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  More Information
                </h3>
                <p className="text-gray-600 mb-2">
                  <strong>Location:</strong> New York, USA
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Phone Number:</strong> (555) 123-4567
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Email:</strong> johndoe@example.com
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={closeModal}
                    className="text-white w-full font-bold bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* About Section */}
      <div className="mt-2 flex flex-col justify-center items-center">
        <div className="max-w-6xl bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            About Me
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            I am a passionate Full Stack Developer with over 5 years of
            experience working on diverse projects in various industries. I have
            extensive knowledge in building dynamic and scalable web
            applications using technologies like React, Node.js, and TypeScript.
            My goal is to create high-quality user experiences and bring
            innovative solutions to the table.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            I thrive in collaborative environments where I can contribute to a
            team’s success while continuously learning and developing my skills.
            I am eager to take on new challenges and push the boundaries of web
            development.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Outside of work, I enjoy participating in open-source projects,
            attending tech meetups, and staying up-to-date with the latest
            trends in the tech world.
          </p>
        </div>
      </div>

      {/* Post Section */}
      <div className="mt-8 max-w-6xl border-t-2 border-gray-200 p-8 bg-gray-50 flex justify-center items-center">
        <div className="w-full flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-gray-800">Projects</h3>
          <div>
            <button
              onClick={handlePrevPost}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              disabled={currentPostIndex === 0}
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={handleNextPost}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 ml-2"
              disabled={currentPostIndex === posts.length - 1}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Post Cards */}
        <div className="flex justify-center items-center space-x-6">
          {posts
            .slice(currentPostIndex, currentPostIndex + 1)
            .map((post, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-xl w-full md:w-96 p-6 transform transition duration-300 hover:scale-105"
              >
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                  {post.title}
                </h4>
                <p className="text-gray-600 text-sm mb-4">{post.description}</p>
                <div className="text-gray-500 text-xs text-right">#WebDev</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Candidate;
