import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Auth_Layout from "./Layout/Auth_Layout";
import Login from "./Authentication/Auth_component/Login";
import Signup from "./Authentication/Auth_component/Signup";
import Main_Layout from "./Layout/Main_Layout";
import Home from "./Components/Home";
import Posts from "./Components/Posts";
import Candidate_profile from "./Pages/Candidate_profile";
import Recruiter_profile from "./Pages/Recruiter_profile";

// Define a simple route using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth_Layout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/home",
    element: <Main_Layout />,
    children: [
      {
        path: "/home",
        element: <Home />,
        children: [
          {
            path: "/home/",
            element: <Posts />,
          },
        ],
      },
      {
        path: "/home/profile/candidate",
        element: <Candidate_profile />,
      },
      {
        path: "/home/profile/recruiter",
        element: <Recruiter_profile />,
      },
    ],
  },
]);

// Get the root element and ensure it's typed properly
const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
