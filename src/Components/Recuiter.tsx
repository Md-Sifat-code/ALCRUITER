import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get recruiter ID from URL params

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
          `https://chakrihub-1-sgbz.onrender.com/api/recruiters/${id}`
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
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden p-6 mt-8">
        {/* Skeleton for Cover Photo */}
        <div className="skeleton h-72 w-full bg-gray-300 rounded-2xl"></div>

        {/* Skeleton for Recruiter Info Section */}
        <div className="mt-8">
          <div className="flex items-center space-x-6">
            <div className="skeleton w-20 h-20 rounded-full bg-gray-300"></div>
            <div className="space-y-4">
              <div className="skeleton h-6 w-48 bg-gray-300"></div>
              <div className="skeleton h-4 w-32 bg-gray-300"></div>
              <div className="skeleton h-4 w-48 bg-gray-300"></div>
            </div>
          </div>

          {/* Skeleton for About Company Section */}
          <div className="mt-6 space-y-4">
            <div className="skeleton h-6 w-48 bg-gray-300"></div>
            <div className="skeleton h-4 w-72 bg-gray-300"></div>
            <div className="skeleton h-4 w-72 bg-gray-300"></div>
          </div>
        </div>
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
