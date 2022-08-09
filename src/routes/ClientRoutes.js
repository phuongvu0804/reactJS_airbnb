import { lazy } from "react";
import HomeTemplate from "@/containers/HomeTemplate";

//Pages
const HomePage = lazy(() => import("@/containers/HomeTemplate/HomePage"));

const ClientRoutes = {
    path: "/",
    element: <HomeTemplate />,
    children: [
        { path: "", element: <HomePage /> },
        { path: "room-detail", element: <div>Room Detail</div> },
    ],
};

export default ClientRoutes;
