import { lazy } from "react";

const ClientRoutes = {
    path: "/",
    element: <div>Home</div>,
    children: [
        { path: "home", element: <div>Home</div> },
        { path: "room-detail", element: <div>Room Detail</div> },
    ],
};

export default ClientRoutes;
