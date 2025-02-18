import React from "react";
import { Outlet } from "react-router-dom";

const Auth_Layout: React.FC = () => {
  return (
    <section>
      <Outlet />
    </section>
  );
};

export default Auth_Layout;
