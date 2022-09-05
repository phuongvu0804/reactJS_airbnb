import { AccountCircle, ExitToApp, Explore, Search } from "@mui/icons-material";

const noUserbuttonList = [
    {
        id: 1,
        title: "Explore",
        icon: <Search />,
        navigateTo: "/",
    },
    {
        id: 2,
        title: "Log in",
        icon: <AccountCircle />,
        navigateTo: "/auth/login",
    },
];

const withUserbuttonList = [
    {
        id: 1,
        title: "Explore",
        icon: <Search />,
        navigateTo: "/",
    },
    {
        id: 2,
        title: "Profile",
        icon: <AccountCircle />,
        navigateTo: "/profile",
    },
    {
        id: 3,
        title: "Log out",
        icon: <ExitToApp />,
        navigateTo: "/",
    },
];

export { noUserbuttonList, withUserbuttonList };
