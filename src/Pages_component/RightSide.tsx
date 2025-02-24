import React from "react";
import { FaUserPlus, FaNewspaper } from "react-icons/fa"; // Using React Icons
import { Link } from "react-router-dom";

const RightSide: React.FC = () => {
  return (
    <section className="">
      <div className="space-y-6">
        {/* Recent News Card */}
        <div className="w-full max-w-xs p-6 bg-white shadow-lg rounded-xl">
          <Link to={"/amnei"}>
            <h3 className="text-lg font-medium flex items-center">
              <FaNewspaper className="mr-2 text-gray-700" />
              Recent News
            </h3>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between">
                <span>Tech Companies Merge</span>
              </div>
              <div className="flex justify-between">
                <span>New JavaScript Framework Released</span>
              </div>
              <div className="flex justify-between">
                <span>Global Stock Market Updates</span>
              </div>
            </div>
          </Link>
        </div>

        {/* People to Follow Card */}
        <div className="w-full max-w-xs p-6 bg-white shadow-lg rounded-xl">
          <h3 className="text-lg font-medium flex items-center">
            <FaUserPlus className="mr-2 text-gray-700" />
            Best Recruiters
          </h3>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span>HEXA</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Jhankar Mahbub</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Sajid</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightSide;
