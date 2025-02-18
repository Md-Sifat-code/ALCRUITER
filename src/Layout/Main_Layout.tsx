import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Pages_component/Navbar";

const Main_Layout: React.FC = () => {
  return (
    <section>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </section>
  );
};

export default Main_Layout;
