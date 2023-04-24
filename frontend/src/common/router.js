import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginComponent from "../components/loginComponent";
import ProfileComponent from "../components/profileComponent";
import AuthProvider from "./AuthProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider />,
    children: [
      {
        path: "/login",
        element: <LoginComponent />,
      },
      {
        path: "/profile",
        element: <ProfileComponent />,
      },
    ],
  },
]);

export default router;
