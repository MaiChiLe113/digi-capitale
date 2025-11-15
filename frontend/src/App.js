import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/Auth/SignIn.tsx";
import SignUp from "./pages/Auth/SignUp.tsx";
import Landing from "./pages/Landing.jsx";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.tsx";
import Utility from "./pages/Utility.jsx";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <Landing />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/utility",
    element: <Utility />,
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
