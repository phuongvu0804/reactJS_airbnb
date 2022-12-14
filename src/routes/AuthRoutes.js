import { lazy } from "react";
import { Navigate } from "react-router-dom";

// Template
const AuthTemplate = lazy(() => import("@/containers/AuthTemplate"));

// Pages
const LoginPage = lazy(() => import("@/containers/AuthTemplate/LoginPage"));
const SignupPage = lazy(() => import("@/containers/AuthTemplate/SignupPage"));

const AuthRoutes = {
    path: "auth",
    element: <AuthTemplate />,
    children: [
        { path: "", element: <Navigate to="login" /> },
        { path: "login", element: <LoginPage /> },
        { path: "signup", element: <SignupPage /> },
    ],
};

export default AuthRoutes;
