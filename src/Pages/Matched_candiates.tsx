import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";
import { FaPaperPlane } from "react-icons/fa";
import { BsRobot } from "react-icons/bs";

interface MatchedCandidate {
  candidateId: number;
  candidateName: string;
  matchedSkills: string[];
  matchPercentage: number;
  username: string;
}

interface CandidateUser {
  id: number;
  username: string;
  profilpic: string;
  email: string;
  candidate: {
    location: string;
    fullName: string;
    skills: string;
    phoneNumber: string;
    yearsOfExperience: string;
    pastExperience: string;
    bio: string;
    about: string;
    cv: string;
    coverPic: string;
  };
}

const MatchedCandidates: React.FC = () => {
  const { postId } = useParams(); // Get postId from the URL
  const [matchedCandidates, setMatchedCandidates] = useState<
    MatchedCandidate[]
  >([]);
  const [candidateUsers, setCandidateUsers] = useState<CandidateUser[]>([]); // Store multiple candidate users
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(
    null
  ); // Track selected candidate ID

  useEffect(() => {
    const fetchMatchedCandidates = async () => {
      if (!postId) {
        setError("Post ID is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://chakrihub-1.onrender.com/api/v1/recruiter/suggestions/${postId}`
        );
        if (!response.ok) {
          setError(`Error: ${response.statusText}`);
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log("Matched candidates data:", data);

        if (data.length === 0) {
          setError("No candidates found.");
        } else {
          setMatchedCandidates(data);
        }
      } catch (error) {
        console.error("Error fetching matched candidates:", error);
        setError("Failed to fetch matched candidates.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatchedCandidates();
  }, [postId]);

  // Fetch candidate user details for all matched candidates
  useEffect(() => {
    const fetchCandidateUser = async (username: string) => {
      try {
        const response = await fetch(
          `https://chakrihub-1.onrender.com/User/search/${username}`
        );
        if (!response.ok) {
          setError(`Error: ${response.statusText}`);
          return;
        }

        const data = await response.json();
        setCandidateUsers((prevUsers) => [...prevUsers, data]);
      } catch (error) {
        console.error("Error fetching candidate user:", error);
        setError("Failed to fetch candidate user.");
      }
    };

    // Call the API for each candidate in the list
    matchedCandidates.forEach((candidate) => {
      fetchCandidateUser(candidate.username);
    });
  }, [matchedCandidates]);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "" && selectedCandidateId) {
      setMessages((prevMessages) => [...prevMessages, `You: ${newMessage}`]);

      try {
        // Prepare the query by replacing spaces with %20 to encode the message
        const query = newMessage.trim().replace(/\s+/g, "%20");
        console.log(selectedCandidateId);

        const response = await fetch(
          `https://chakrihub-1.onrender.com/ai/cv/question/${selectedCandidateId}/${query}`,
          {
            method: "GET", // Using GET method
          }
        );

        if (!response.ok) {
          setMessages((prevMessages) => [
            ...prevMessages,
            `Error: ${response.statusText}`,
          ]);
          return;
        }

        const data = await response.text(); // The response is a string
        setMessages((prevMessages) => [...prevMessages, `AI: ${data}`]);
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          "Error: Failed to get a response from AI.",
        ]);
      }

      setNewMessage("");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center space-x-4 py-6">
        <FaSpinner className="animate-spin text-blue-500 text-4xl" />
        <span className="text-lg text-gray-600">Loading...</span>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {matchedCandidates.map((candidate) => {
          const candidateUser = candidateUsers.find(
            (user) => user.username === candidate.username
          );

          return (
            <div
              key={candidate.candidateId}
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mb-8 hover:shadow-2xl transition-all duration-300 ease-in-out"
            >
              {/* Candidate User Info */}
              {candidateUser && (
                <div className="mb-6">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={candidateUser.profilpic}
                        alt="Profile"
                        className="w-16 h-16 rounded-full"
                      />
                      <div>
                        <h5 className="text-xl font-semibold">
                          {candidateUser.candidate.fullName}
                        </h5>
                        <p className="text-sm text-gray-600">
                          {candidateUser.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CiTimer className="text-amber-600" />
                      <span>{candidate.matchPercentage}% Matched</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Matched Skills */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700">Matched Skills</h4>
                <p className="text-gray-600 text-sm">
                  {candidate.matchedSkills.join(", ")}
                </p>
              </div>

              {/* Open Modal Button */}
              <div className="flex items-center justify-center">
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setSelectedCandidateId(candidate.candidateId); // Set selected candidate ID
                  }}
                  className="px-4 py-2 bg-[#6F9EF6] text-white rounded-full text-sm hover:bg-blue-700 transition-all"
                >
                  Ask My CV
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Messaging */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-transparent flex justify-center items-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bgcard rounded-lg shadow-lg max-w-3xl w-full p-6"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="flex flex-row items-center gap-2">
                <BsRobot className="text-blue-800 text-6xl" />
                <span className="text-sm text-gray-600">
                  I know everything about him—every skill, every experience,
                  every achievement on his CV. I can answer any question
                  confidently and accurately about him according to his CV. Go
                  ahead, ask me anything
                </span>
              </h2>
              {/* Close Button */}
              <button
                onClick={() => {
                  setIsModalOpen(false); // Close the modal
                  window.location.reload(); // Reload the page
                }}
                className="text-gray-600 hover:text-gray-800"
              >
                <FaTimes className="bg-blue-300 rounded-full p-2" size={36} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Display messages */}
              <div className="overflow-y-auto h-96 p-4 rounded-lg mb-4">
                {messages.length > 0 ? (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.startsWith("You:") ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs p-3 rounded-lg my-2 ${
                          msg.startsWith("You:")
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {msg}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400">No messages yet</div>
                )}
              </div>

              {/* Input for new message */}
              <div className="relative w-full">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full p-3 pl-4 pr-12 border border-gray-300 rounded-lg"
                  placeholder="Type your message..."
                />
                <button
                  onClick={handleSendMessage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700"
                >
                  <FaPaperPlane size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchedCandidates;
