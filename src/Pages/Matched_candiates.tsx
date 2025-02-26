import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCode } from "react-icons/fa";
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
  const [candidateUser, setCandidateUser] = useState<CandidateUser | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");

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
        console.log("Candidate user data:", data);
        setCandidateUser(data);
      } catch (error) {
        console.error("Error fetching candidate user:", error);
        setError("Failed to fetch candidate user.");
      }
    };

    // Fetch candidate user details for the first matched candidate (assuming we need the first one)
    if (matchedCandidates.length > 0) {
      fetchCandidateUser(matchedCandidates[0].username);
    }
  }, [matchedCandidates]);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      // Show the message being sent
      setMessages((prevMessages) => [...prevMessages, `You: ${newMessage}`]);

      try {
        // Prepare the query by replacing spaces with %20 to encode the message
        const query = newMessage.trim().replace(/\s+/g, "%20");

        // Make the GET request to the AI endpoint
        const response = await fetch(
          `https://chakrihub-1.onrender.com/ai/cv/question/${candidateUser?.id}/${query}`,
          {
            method: "GET", // Using GET method
          }
        );

        // Check if the response is ok
        if (!response.ok) {
          setMessages((prevMessages) => [
            ...prevMessages,
            `Error: ${response.statusText}`,
          ]);
          return;
        }

        // Get the response body (AI's response)
        const data = await response.text(); // The response is a string

        // Append the AI's response to the messages
        setMessages((prevMessages) => [...prevMessages, `AI: ${data}`]);
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          "Error: Failed to get a response from AI.",
        ]);
      }

      // Clear the input after sending
      setNewMessage("");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {matchedCandidates.map((candidate) => (
          <div
            key={candidate.candidateId}
            className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 mb-8 hover:shadow-2xl transition-all duration-300 ease-in-out"
          >
            {/* Candidate User Info */}
            {candidateUser &&
              candidate.username === matchedCandidates[0].username && (
                <div className="mb-6">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex flex-row gap-2 items-center">
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
              <ul className="list-disc flex flex-wrap gap-4 items-start justify-start sm:justify-center">
                {candidate.matchedSkills.map((skill, index) => (
                  <li
                    key={index}
                    className="text-gray-600 flex items-center text-sm"
                  >
                    <FaCode className="text-green-500" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Open Modal Button */}
            <div className="flex items-center justify-center text-sm text-gray-500">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-[#6F9EF6] text-white rounded-full text-sm hover:bg-blue-700 transition-all"
              >
                Ask My CV
              </button>
            </div>
          </div>
        ))}
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
            <h2 className="flex flex-row items-center mb-4 gap-2">
              <BsRobot className="text-blue-800 text-6xl" />
              <span className="text-sm text-gray-600">
                I know everything about him—every skill, every experience, every
                achievement on his CV. I can answer any question confidently and
                accurately about him according to his CV. Go ahead, ask me
                anything{" "}
              </span>
            </h2>
            <div className="space-y-4">
              {/* Display messages */}
              <div className="overflow-y-auto h-96 border border-gray-300 p-4 rounded-lg mb-4">
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
                  <div className="text-gray-400">No messages yet.</div>
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
