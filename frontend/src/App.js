import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { EmailVerification } from "./screens/EmailVerification";
// import { PasswordReset } from "./screens/PasswordReset";
import { PasswordReset } from "./pages/Auth/PasswordReset.tsx";
import { SetNewPassword } from "./pages/Auth/SetNewPassword.tsx";
import SignIn from "./pages/Auth/SignIn.tsx";
import SignUp from "./pages/Auth/SignUp.tsx";
import Landing from "./pages/Landing.jsx";
import About from "./pages/About.jsx";

// import { SuccessConfirmation } from "./screens/SuccessConfirmation";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <SignUp />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  // {
  //   path: "/email-verification",
  //   element: <EmailVerification />,
  // },
  {
    path: "/set-new-password",
    element: <SetNewPassword />,
  },
  // {
  //   path: "/password-reset-success-confirmation",
  //   element: <PasswordReset />,
  // },
  {
    path: "/password-reset-request",
    element: <PasswordReset />,
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
  }

  // {
  //   path: "/success-confirmation-page",
  //   element: <SuccessConfirmation />,
  // },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
