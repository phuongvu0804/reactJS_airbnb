import { lazy } from "react";
import { Navigate } from "react-router-dom";

// Template
const AdminTemplate = lazy(() => import("@/containers/AdminTemplate"));

// Pages
const UserManagementPage = lazy(() => import("@/containers/AdminTemplate/UserManagementPage"));
const New = lazy(() => import("@/containers/AdminTemplate/UserManagementPage/New"));

const AdminRoutes = {
    path: "admin",
    element: <AdminTemplate />,
    children: [
        { path: "", element: <Navigate to="dashboard" /> },
        { path: "dashboard", element: <div>Dashboard</div> },
        { path: "users", element: <UserManagementPage /> },
        { path: "users/new", element: <New /> },
    ],
};

export default AdminRoutes;
