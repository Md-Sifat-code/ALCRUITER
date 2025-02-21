import React, { useState } from "react";
import {
  FaUser,
  FaPhone,
  FaLocationArrow,
  FaLanguage,
  FaLink,
  FaBriefcase,
  FaGraduationCap,
  FaFileAlt,
} from "react-icons/fa";
import { FaHandshakeSimpleSlash } from "react-icons/fa6";
import { useUser } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
// Define the form data type
interface FormData {
  fullName: string;
  phoneNumber: string;
  location: string;
  skills: string;
  language: string;
  portfolioLinks: string;
  preferedPosition: string;
  yearsOfExperience: string;
  coverPic: File | null;
  educationalQualifications: string;
  pastExperience: string;
  cv: File | null;
  bio: string; // New field
  about: string;
}

const CandidateProfile: React.FC = () => {
  // Initialize state with a specific type
  const { user } = useUser(); // Access the user context
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    location: "",
    skills: "",
    language: "",
    portfolioLinks: "",
    preferedPosition: "",
    yearsOfExperience: "",
    coverPic: null,
    educationalQualifications: "",
    pastExperience: "",
    cv: null,
    bio: "", // Initialize new field
    about: "",
  });

  // Handle text input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as keyof FormData]: value,
    }));
  };

  // Handle file input changes (coverPic, cv)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prevData) => ({
        ...prevData,
        [name as keyof FormData]: files[0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      console.error("User not found");
      return; // Ensure that user is available
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("userId", user.id.toString());
    formDataToSubmit.append("fullName", formData.fullName);
    formDataToSubmit.append("phoneNumber", formData.phoneNumber);
    formDataToSubmit.append("location", formData.location);
    formDataToSubmit.append("skills", formData.skills);
    formDataToSubmit.append("language", formData.language);
    formDataToSubmit.append("portfolioLinks", formData.portfolioLinks);
    formDataToSubmit.append("preferedPosition", formData.preferedPosition);
    formDataToSubmit.append("yearsOfExperience", formData.yearsOfExperience);
    if (formData.coverPic)
      formDataToSubmit.append("coverPic", formData.coverPic);
    formDataToSubmit.append(
      "educationalQualifications",
      formData.educationalQualifications
    );
    formDataToSubmit.append("pastExperience", formData.pastExperience);
    if (formData.cv) formDataToSubmit.append("cv", formData.cv);
    formDataToSubmit.append("bio", formData.bio); // Append new field
    formDataToSubmit.append("about", formData.about);

    fetch("https://chakrihub-1.onrender.com/api/candidates/add", {
      method: "POST",
      body: formDataToSubmit,
    })
      .then(async (response) => {
        // Check if response is OK (status code between 200-299)
        if (!response.ok) {
          const text = await response.text(); // Read response as text if not OK
          throw new Error(
            `HTTP error! Status: ${response.status}, Response: ${text}`
          );
        }

        // Read the plain text response
        const responseText = await response.text();
        console.log("Form submitted successfully:", responseText);
        navigate("/home"); // Log the plain text response
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <div className="max-w-5xl mt-12 mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Candidate Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="flex items-center space-x-3">
            <FaUser className="text-gray-500" />
            <div className="w-full">
              <label
                htmlFor="fullName"
                className="block font-semibold text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex items-center space-x-3">
            <FaPhone className="text-gray-500" />
            <div className="w-full">
              <label
                htmlFor="phoneNumber"
                className="block font-semibold text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3">
            <FaLocationArrow className="text-gray-500" />
            <div className="w-full">
              <label
                htmlFor="location"
                className="block font-semibold text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Skills */}
          <div className="flex items-center space-x-3">
            <FaHandshakeSimpleSlash className="text-gray-500" />
            <div className="w-full">
              <label
                htmlFor="skills"
                className="block font-semibold text-gray-700"
              >
                Skills
              </label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* New Fields (Bio, About, Years of Experience, Past Experience) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bio */}
          <div className="flex items-center space-x-3">
            <FaUser className="text-gray-500" />
            <div className="w-full">
              <label
                htmlFor="bio"
                className="block font-semibold text-gray-700"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
          </div>

          {/* About */}
          <div className="flex items-center space-x-3">
            <FaUser className="text-gray-500" />
            <div className="w-full">
              <label
                htmlFor="about"
                className="block font-semibold text-gray-700"
              >
                About
              </label>
              <textarea
                id="about"
                name="about"
                value={formData.about}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Years of Experience */}
        <div className="flex items-center space-x-3">
          <FaBriefcase className="text-gray-500" />
          <div className="w-full">
            <label
              htmlFor="yearsOfExperience"
              className="block font-semibold text-gray-700"
            >
              Years of Experience
            </label>
            <input
              type="text"
              id="yearsOfExperience"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Past Experience */}
        <div className="flex items-center space-x-3">
          <FaGraduationCap className="text-gray-500" />
          <div className="w-full">
            <label
              htmlFor="pastExperience"
              className="block font-semibold text-gray-700"
            >
              Past Experience
            </label>
            <textarea
              id="pastExperience"
              name="pastExperience"
              value={formData.pastExperience}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>
        </div>

        {/* CV and Cover Picture */}
        <div className="flex items-center space-x-3">
          <FaFileAlt className="text-gray-500" />
          <div className="w-full">
            <label htmlFor="cv" className="block font-semibold text-gray-700">
              CV
            </label>
            <input
              type="file"
              id="cv"
              name="cv"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <FaFileAlt className="text-gray-500" />
          <div className="w-full">
            <label
              htmlFor="coverPic"
              className="block font-semibold text-gray-700"
            >
              Cover Picture
            </label>
            <input
              type="file"
              id="coverPic"
              name="coverPic"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CandidateProfile;
