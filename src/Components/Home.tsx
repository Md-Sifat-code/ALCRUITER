import React from "react";
import { Outlet } from "react-router-dom";
import LeftSide from "../Pages_component/LeftSide";
import RightSide from "../Pages_component/RightSide";

const Home: React.FC = () => {
  return (
    <section className="mt-12">
      <div className="container mx-auto max-w-6xl gap-8 grid grid-cols-4">
        {/* Left side - Sticky */}
        <div className="hidden md:flex sticky top-0">
          <LeftSide />
        </div>

        {/* Middle section - Scrollable, scrollbar hidden */}
        <div className="col-span-4 md:col-span-2 overflow-y-auto h-screen hide-scrollbar">
          <Outlet />
        </div>

        {/* Right side - Sticky */}
        <div className="hidden md:flex sticky top-0">
          <RightSide />
        </div>
      </div>
    </section>
  );
};

export default Home;
