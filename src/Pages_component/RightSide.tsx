import React from "react";
import { FaUserPlus, FaNewspaper } from "react-icons/fa"; // Using React Icons

const RightSide: React.FC = () => {
  return (
    <section className="">
      <div className="space-y-6">
        {/* Recent News Card */}
        <div className="w-full max-w-xs p-6 bg-white shadow-lg rounded-xl">
          <h3 className="text-lg font-medium flex items-center">
            <FaNewspaper className="mr-2 text-gray-700" />
            Recent News
          </h3>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between">
              <span>Tech Companies Merge</span>
              <span className="text-sm text-gray-500">2h ago</span>
            </div>
            <div className="flex justify-between">
              <span>New JavaScript Framework Released</span>
              <span className="text-sm text-gray-500">4h ago</span>
            </div>
            <div className="flex justify-between">
              <span>Global Stock Market Updates</span>
              <span className="text-sm text-gray-500">1d ago</span>
            </div>
          </div>
        </div>

        {/* People to Follow Card */}
        <div className="w-full max-w-xs p-6 bg-white shadow-lg rounded-xl">
          <h3 className="text-lg font-medium flex items-center">
            <FaUserPlus className="mr-2 text-gray-700" />
            People to Follow
          </h3>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span>Jane Smith</span>
              <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded-full">
                Follow
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span>Michael Brown</span>
              <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded-full">
                Follow
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span>Sarah Lee</span>
              <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded-full">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightSide;
