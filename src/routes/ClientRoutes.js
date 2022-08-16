import { lazy } from "react";
import HomeTemplate from "@/containers/HomeTemplate";

//Pages
const HomePage = lazy(() => import("@/containers/HomeTemplate/HomePage"));
const RoomListPage = lazy(() => import("@/containers/HomeTemplate/RoomListPage"));

const ClientRoutes = {
    path: "/",
    element: <HomeTemplate />,
    children: [
        { path: "", element: <HomePage /> },
        { path: "room-list", element: <RoomListPage /> },
    ],
};

export default ClientRoutes;
