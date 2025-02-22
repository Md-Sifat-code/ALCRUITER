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
import Post_details from "./Components/Post_details";
import Recuiter from "./Components/Recuiter";
import Match from "./Components/Match";
import Matched_candiates from "./Pages/Matched_candiates";
import Error_el from "./Error/Error_el";

// Define the router with routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth_Layout />,
    errorElement: <Error_el />,
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
    errorElement: <Error_el />,
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
        path: "/home/jobs/:userId",
        element: <Jobs />,
      },
      {
        path: "/home/matched/candidates/:postId",
        element: <Matched_candiates />,
      },
      {
        path: "/home/post/:id",
        element: <Post_details />,
      },
      {
        path: "/home/matchjob/:candidateId",
        element: <Match />,
      },
      {
        path: "/home/recruiter/:id",
        element: <Recuiter />,
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
