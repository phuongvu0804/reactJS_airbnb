import { useRoutes } from "react-router-dom";

//Routes
import AuthRoutes from "./AuthRoutes";
import ClientRoutes from "./ClientRoutes";
import AdminRoutes from "./AdminRoutes";
import NotFoundRoute from "./NotFoundRoute";

const ThemeRoutes = () => useRoutes([AuthRoutes, ClientRoutes, AdminRoutes, NotFoundRoute]);

export default ThemeRoutes;
