import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBuilding,
  FaLocationArrow,
  FaIndustry,
  FaFileAlt,
  FaImage,
  FaPhoneAlt,
} from "react-icons/fa";
import { useUser } from "../Context/UserContext"; // Importing the UserContext

interface FormData {
  name: string;
  coverPhoto: File | null;
  companyName: string;
  officeLocation: string;
  companyDiscription: string;
  industryType: string;
  bio: string; // New field for bio
  phoneNumber: string; // New field for phone number
}

const RecruiterProfile: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    coverPhoto: null,
    companyName: "",
    officeLocation: "",
    companyDiscription: "",
    industryType: "",
    bio: "", // Initialize bio field
    phoneNumber: "",
  });

  const { user } = useUser(); // Get user context
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prevData) => ({
        ...prevData,
        [name as keyof FormData]: files[0], // Storing the file in the state
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      console.error("User not found");
      return;
    }

    // Handle form submission logic (e.g., API call)
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("coverPhoto", formData.coverPhoto || "");
    formDataToSend.append("companyName", formData.companyName);
    formDataToSend.append("officeLocation", formData.officeLocation);
    formDataToSend.append("companyDescription", formData.companyDiscription);
    formDataToSend.append("industryType", formData.industryType);
    formDataToSend.append("bio", formData.bio); // Add bio to formData
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("userId", String(user.id)); // Adding userId from context
    console.log(formDataToSend);
    const response = await fetch(
      "https://chakrihub-1.onrender.com/api/recruiters/add",
      {
        method: "POST",
        body: formDataToSend,
      }
    );

    if (response.ok) {
      // Handle successful form submission (e.g., success message)
      console.log("Recruiter profile submitted successfully!");
      navigate("/home");
      window.location.reload();
    } else {
      // Handle error (e.g., show error message)
      console.error("Failed to submit recruiter profile");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 mt-12 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Recruiter Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3">
            <FaUser className="text-gray-500" />
            <div className="w-full">
              <label
                htmlFor="name"
                className="block font-semibold text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <FaImage className="text-gray-500" />
            <div className="w-full">
              <label
                htmlFor="coverPhoto"
                className="block font-semibold text-gray-700"
              >
                Cover Photo
              </label>
              <input
                type="file"
                id="coverPhoto"
                name="coverPhoto"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3">
            <FaBuilding className="text-gray-500" />
            <div className="w-full">
              <label
                htmlFor="companyName"
                className="block font-semibold text-gray-700"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <FaLocationArrow className="text-gray-500" />
            <div className="w-full">
              <label
                htmlFor="officeLocation"
                className="block font-semibold text-gray-700"
              >
                Office Location
              </label>
              <input
                type="text"
                id="officeLocation"
                name="officeLocation"
                value={formData.officeLocation}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3">
            <FaIndustry className="text-gray-500" />
            <div className="w-full">
              <label
                htmlFor="industryType"
                className="block font-semibold text-gray-700"
              >
                Industry Type
              </label>
              <input
                type="text"
                id="industryType"
                name="industryType"
                value={formData.industryType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <FaPhoneAlt className="text-gray-500" />
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

        <div className="flex items-center space-x-3">
          <FaFileAlt className="text-gray-500" />
          <div className="w-full">
            <label
              htmlFor="companyDescription"
              className="block font-semibold text-gray-700"
            >
              Company Description
            </label>
            <textarea
              id="companyDescription"
              name="companyDescription"
              value={formData.companyDiscription}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <FaUser className="text-gray-500" />
          <div className="w-full">
            <label htmlFor="bio" className="block font-semibold text-gray-700">
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

export default RecruiterProfile;
