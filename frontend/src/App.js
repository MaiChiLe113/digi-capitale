import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from "./AppLayout.jsx";

import SignIn from "./pages/Auth/SignIn.tsx";
import SignUp from "./pages/Auth/SignUp.tsx";
import Landing from "./pages/Landing.jsx";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.tsx";
import Utility from "./pages/Utility.jsx";
import Services from "./pages/Services.jsx";
import AdminRequest from "./pages/AdminRequest.jsx";
import BookUtility from "./pages/BookUtility.tsx";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/utility", element: <Utility /> },
      { path: "/services", element: <Services /> },
      { path: "/about", element: <About /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
  {
    path: "/*",
    element: <Landing />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <AdminRequest />,
  },
  {
    path: "/utility/:id",
    element: <BookUtility />,
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
