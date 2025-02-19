import React, { useEffect, useState } from "react";
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

const CandidateProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    location: "",
    skills: "",
    language: "",
    portfolioLinks: "",
    preferedPosition: "",
    yearsOfExperience: "",
    coverPic: "",
    educationalQualifications: "",
    pastExperience: "",
    cv: "",
    user: {
      id: 0,
      roles: [{ id: 2, roleType: "candidate" }],
      email: "",
      username: "",
      profilePic: "",
    },
  });

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const email = sessionStorage.getItem("email");

    if (username && email) {
      setFormData((prevData) => ({
        ...prevData,
        user: {
          ...prevData.user,
          username,
          email,
        },
      }));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return (
    <div className="max-w-5xl mt-12 mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Candidate Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3">
            <FaLanguage className="text-gray-500" />
            <div className="w-full">
              <label
                htmlFor="language"
                className="block font-semibold text-gray-700"
              >
                Language
              </label>
              <input
                type="text"
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <FaLink className="text-gray-500" />
            <div className="w-full">
              <label
                htmlFor="portfolioLinks"
                className="block font-semibold text-gray-700"
              >
                Portfolio Links
              </label>
              <input
                type="text"
                id="portfolioLinks"
                name="portfolioLinks"
                value={formData.portfolioLinks}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <FaBriefcase className="text-gray-500" />
          <div className="w-full">
            <label
              htmlFor="preferedPosition"
              className="block font-semibold text-gray-700"
            >
              Preferred Position
            </label>
            <input
              type="text"
              id="preferedPosition"
              name="preferedPosition"
              value={formData.preferedPosition}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <FaGraduationCap className="text-gray-500" />
          <div className="w-full">
            <label
              htmlFor="educationalQualifications"
              className="block font-semibold text-gray-700"
            >
              Educational Qualifications
            </label>
            <textarea
              id="educationalQualifications"
              name="educationalQualifications"
              value={formData.educationalQualifications}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <FaFileAlt className="text-gray-500" />
          <div className="w-full">
            <label htmlFor="cv" className="block font-semibold text-gray-700">
              CV URL
            </label>
            <input
              type="text"
              id="cv"
              name="cv"
              value={formData.cv}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Hidden fields */}
        <input type="hidden" name="user.id" value={formData.user.id} />
        <input
          type="hidden"
          name="user.roles[0].id"
          value={formData.user.roles[0].id}
        />
        <input
          type="hidden"
          name="user.roles[0].roleType"
          value={formData.user.roles[0].roleType}
        />
        <input
          type="hidden"
          name="user.username"
          value={formData.user.username}
        />
        <input type="hidden" name="user.email" value={formData.user.email} />
        <input
          type="hidden"
          name="user.profilePic"
          value={formData.user.profilePic}
        />

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="w-full md:w-1/4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CandidateProfile;
