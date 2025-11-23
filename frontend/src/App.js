import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from "./layout/AppLayout.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";

import SignIn from "./pages/Auth/SignIn.tsx";
import SignUp from "./pages/Auth/SignUp.tsx";
import AdminSignIn from "./pages/Auth/AdminSignIn.tsx";
import Landing from "./pages/Landing.jsx";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.tsx";
import Utility from "./pages/Utility.jsx";
import Services from "./pages/Services.jsx";
import AdminRequest from "./pages/AdminRequest.jsx";
import BookUtility from "./pages/BookUtility.tsx";
import Dashboard from "./pages/Dashboard.jsx";
import Report from "./pages/Report.jsx";
import EmployeeProfile from "./pages/EmployeeProfile.jsx";
import History from "./pages/History.jsx";
import ViewIncidents from "./pages/ViewIncidents.jsx";
import MakeIncidents from "./pages/MakeIncidents.jsx";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )
      },
      {
        path: "/utility",
        element: (
          <ProtectedRoute>
            <Utility />
          </ProtectedRoute>
        )
      },
      {
        path: "/history",
        element: (
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        )
      },
      {
        path: "/services",
        element: (
          <ProtectedRoute>
            <Services />
          </ProtectedRoute>
        )
      },
      { path: "/about", element: <About /> },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },
      {
        path: "/utility/:id",
        element: (
          <ProtectedRoute>
            <BookUtility />
          </ProtectedRoute>
        ),
      },
      {
        path: "/makeincidents",
        element: (
          <ProtectedRoute>
            <MakeIncidents />
          </ProtectedRoute>
        ),
      }
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/request",
        element: (
          <ProtectedRoute>
            <AdminRequest />
          </ProtectedRoute>
        ),
      },
      {
        path: "/report",
        element: (
          <ProtectedRoute>
            <Report />
          </ProtectedRoute>
        ),
      },
      {
        path: "/employee-profile",
        element: (
          <ProtectedRoute>
            <EmployeeProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/viewincidents",
        element: (
          <ProtectedRoute>
            <ViewIncidents />
          </ProtectedRoute>
        ),
      }
    ],
  },
  {
    path: "/",
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
    path: "/admin-signin",
    element: <AdminSignIn />,
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
