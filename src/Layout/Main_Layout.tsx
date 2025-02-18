import React from "react";
import { Outlet } from "react-router-dom";

const Main_Layout: React.FC = () => {
  return (
    <section>
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default Main_Layout;
