import { lazy } from "react";
import HomeTemplate from "@/containers/HomeTemplate";

// Route Guard
import RequireAuth from "@/guard";

// Constants
import { ROLE } from "@/constants";

// Pages
const HomePage = lazy(() => import("@/containers/HomeTemplate/HomePage"));
const RoomListPage = lazy(() => import("@/containers/HomeTemplate/RoomListPage"));
const RoomDetailsPage = lazy(() => import("@/containers/HomeTemplate/RoomDetailsPage"));
const Profile = lazy(() => import("@/containers/HomeTemplate/Profile"));

const ClientRoutes = {
    path: "/",
    element: <HomeTemplate />,
    children: [
        { path: "", element: <HomePage /> },
        { path: "room-list", element: <RoomListPage /> },
        { path: "room-list/:id", element: <RoomListPage /> },
        { path: "room-details/:id", element: <RoomDetailsPage /> },
        {
            path: "profile",
            element: (
                <RequireAuth roles={[ROLE.ADMIN, ROLE.CLIENT]}>
                    <Profile />
                </RequireAuth>
            ),
        },
    ],
};

export default ClientRoutes;
