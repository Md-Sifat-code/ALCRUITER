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
import Candidate from "./Pages/Candidate";
import Recruiter from "./Pages/Recruiter";
import { LoginProvider } from "./Context/LoginContext";
import { UserProvider } from "./Context/UserContext";
import Choose from "./Authentication/Auth_component/Choose";
import Jobs from "./Pages/Jobs";

// Define the router with routes
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
      {
        path: "/choose",
        element: <Choose />,
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
        path: "/home/jobs",
        element: <Jobs />,
      },
      {
        path: "/home/profile/info/candidate",
        element: <Candidate_profile />,
      },
      {
        path: "/home/profile/info/recruiter",
        element: <Recruiter_profile />,
      },
      {
        path: "/home/profile/candidate",
        element: <Candidate />,
      },
      {
        path: "/home/profile/recruiter",
        element: <Recruiter />,
      },
    ],
  },
]);

// Ensure the RouterProvider wraps the entire app, including context providers
const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <LoginProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </LoginProvider>
    </React.StrictMode>
  );
}
