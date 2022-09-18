import { lazy } from "react";
import { Navigate } from "react-router-dom";

// Route Guard
import RequireAuth from "@/guard";

// Constants
import { ROLE } from "@/constants";

// Template
const AdminTemplate = lazy(() => import("@/containers/AdminTemplate"));

// Pages
const UserManagementPage = lazy(() => import("@/containers/AdminTemplate/UserManagementPage"));
const NewUser = lazy(() => import("@/containers/AdminTemplate/UserManagementPage/New"));
const EditUser = lazy(() => import("@/containers/AdminTemplate/UserManagementPage/Edit"));
const UserDetails = lazy(() => import("@/containers/AdminTemplate/UserManagementPage/Details"));

const LocationManagementPage = lazy(() => import("@/containers/AdminTemplate/LocationManagementPage"));
const NewLocation = lazy(() => import("@/containers/AdminTemplate/LocationManagementPage/New"));
const EditLocation = lazy(() => import("@/containers/AdminTemplate/LocationManagementPage/Edit"));
const LocationDetails = lazy(() => import("@/containers/AdminTemplate/LocationManagementPage/Details"));

const RoomManagementPage = lazy(() => import("@/containers/AdminTemplate/RoomManagementPage"));
const NewRoom = lazy(() => import("@/containers/AdminTemplate/RoomManagementPage/New"));
const EditRoom = lazy(() => import("@/containers/AdminTemplate/RoomManagementPage/Edit"));
const RoomDetails = lazy(() => import("@/containers/AdminTemplate/RoomManagementPage/Details"));

const AdminRoutes = {
    path: "admin",
    element: (
        <RequireAuth roles={[ROLE.ADMIN]}>
            <AdminTemplate />
        </RequireAuth>
    ),
    children: [
        { path: "", element: <Navigate to="dashboard" /> },
        { path: "dashboard", element: <div>Dashboard</div> },
        // User management pages
        { path: "users", element: <UserManagementPage /> },
        { path: "users/new", element: <NewUser /> },
        { path: "users/edit/:id", element: <EditUser /> },
        { path: "users/details/:id", element: <UserDetails /> },
        // Location management pages
        { path: "locations", element: <LocationManagementPage /> },
        { path: "locations/new", element: <NewLocation /> },
        { path: "locations/edit/:id", element: <EditLocation /> },
        { path: "locations/details/:id", element: <LocationDetails /> },
        // Room management pages
        { path: "rooms", element: <RoomManagementPage /> },
        { path: "rooms/new", element: <NewRoom /> },
        { path: "rooms/edit/:id", element: <EditRoom /> },
        { path: "rooms/details/:id", element: <RoomDetails /> },
    ],
};

export default AdminRoutes;
