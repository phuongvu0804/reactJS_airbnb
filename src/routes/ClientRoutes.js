import { lazy } from "react";
import HomeTemplate from "@/containers/HomeTemplate";

//Pages
const HomePage = lazy(() => import("@/containers/HomeTemplate/HomePage"));
const RoomListPage = lazy(() => import("@/containers/HomeTemplate/RoomListPage"));
const RoomDetailsPage = lazy(() => import("@/containers/HomeTemplate/RoomDetailsPage"));
const Profile = lazy(() => import("@/containers/HomeTemplate/Profile"));

const ClientRoutes = {
    path: "/",
    element: <HomeTemplate />,
    children: [
        { path: "", element: <HomePage /> },
        { path: "room-list/:id", element: <RoomListPage /> },
        { path: "room-details/:id", element: <RoomDetailsPage /> },
        { path: "profile", element: <Profile /> },
    ],
};

export default ClientRoutes;
