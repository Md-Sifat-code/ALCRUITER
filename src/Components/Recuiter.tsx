import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get recruiter ID from URL params
import { FaSpinner } from "react-icons/fa6";

interface Recruiter {
  id: number;
  name: string;
  companyName: string;
  industryType: string;
  officeLocation: string;
  coverPhoto: string;
}

const Recruiter: React.FC = () => {
  const [recruiter, setRecruiter] = useState<Recruiter | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams(); // Get recruiter ID from URL params

  useEffect(() => {
    const fetchRecruiterDetail = async () => {
      if (!id) return;
      try {
        const response = await fetch(
          `https://chakrihub-1.onrender.com/api/recruiters/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recruiter");
        }
        const data = await response.json();
        setRecruiter(data);
      } catch (err) {
        setError("Failed to load recruiter details");
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiterDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen space-x-2">
        <FaSpinner className="animate-spin text-blue-500 w-6 h-6" />
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-xl font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  if (!recruiter) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-xl font-semibold text-gray-600">
          Recruiter not found
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden p-6 mt-8">
      {/* Recruiter Card with Cover Photo */}
      <div
        className="relative w-full h-72 bg-cover bg-center rounded-2xl"
        style={{ backgroundImage: `url(${recruiter.coverPhoto})` }}
      >
        <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black to-transparent w-full rounded-b-2xl">
          <h2 className="text-3xl font-bold text-white">{recruiter.name}</h2>
        </div>
      </div>

      {/* Recruiter Info Section */}
      <div className="mt-8">
        <div className="flex items-center space-x-6">
          <div className="flex-shrink-0">
            {/* Profile Picture */}
            <img
              src={recruiter.coverPhoto}
              alt={recruiter.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">
              {recruiter.companyName}
            </h3>
            <p className="text-sm text-gray-600">{recruiter.industryType}</p>
            <p className="text-sm text-gray-600">{recruiter.officeLocation}</p>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-xl font-semibold text-gray-900">About Company</h4>
          <p className="mt-2 text-gray-700">
            <strong>Office Location:</strong> {recruiter.officeLocation}
          </p>
          <p className="mt-2 text-gray-700">
            <strong>Industry:</strong> {recruiter.industryType}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recruiter;
