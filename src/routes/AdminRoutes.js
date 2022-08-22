import { lazy } from "react";
import { Navigate } from "react-router-dom";

// Template
const AdminTemplate = lazy(() => import("@/containers/AdminTemplate"));

const AdminRoutes = {
    path: "admin",
    element: <AdminTemplate />,
    children: [
        { path: "", element: <Navigate to="dashboard" /> },
        { path: "dashboard", element: <div>Dashboard</div> },
        { path: "users", element: <div>Users</div> },
    ],
};

export default AdminRoutes;
