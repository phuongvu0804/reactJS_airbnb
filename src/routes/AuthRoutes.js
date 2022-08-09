import { lazy } from "react";

const Form = lazy(() => import("@/components/Form"));

const AuthRoutes = {
    path: "auth",
    element: <Form />,
    children: [
        { path: "login", element: <div>Login</div> },
        { path: "signup", element: <div>Signup</div> },
    ],
};

export default AuthRoutes;
