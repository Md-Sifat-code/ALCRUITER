import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaBuilding,
  FaLocationArrow,
  FaIndustry,
  FaFileAlt,
  FaImage,
} from "react-icons/fa";

const RecruiterProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    coverPhoto: "",
    companyName: "",
    officeLocation: "",
    companyDescription: "",
    industryType: "",
    user: {
      id: 0,
      roles: [{ id: 2, roleType: "recruiter" }],
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
                Cover Photo URL
              </label>
              <input
                type="text"
                id="coverPhoto"
                name="coverPhoto"
                value={formData.coverPhoto}
                onChange={handleChange}
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
              value={formData.companyDescription}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
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

export default RecruiterProfile;
