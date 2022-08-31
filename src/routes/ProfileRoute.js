import { lazy } from "react";

const Profile = lazy(() => import("@/containers/HomeTemplate/Profile"));

const ProfileRoute = {
    path: "profile",
    element: <Profile />,
};

export default ProfileRoute;
