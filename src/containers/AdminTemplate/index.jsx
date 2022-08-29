import { Outlet } from "react-router-dom";
import { useIsFetching, useIsMutating } from "react-query";

// Material UI
import { Box, Stack, Link, LinearProgress } from "@mui/material";

// Components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Breadcrumbs from "./components/Breadcrumbs";

// Style
import "./style.scss";

const AdminTemplate = () => {
    const isFetchingUsers = useIsFetching(["users"]);
    const isMutatingUsers = useIsMutating(["users/delete"]);

    const isLoading = !!(isFetchingUsers || isMutatingUsers);

    return (
        <div className="admin">
            <Box
                className="linear-loader-wrapper"
                sx={{
                    display: isLoading ? "block" : "none",
                }}
            >
                <LinearProgress color="inherit" />
            </Box>
            <Sidebar />
            <div className="admin-container">
                <Navbar />
                <div className="breadcrumbs-wrapper">
                    <Breadcrumbs />
                </div>
                <Outlet />
                <Stack component="footer" className="admin-footer" direction="row" spacing={2} justifyContent="center">
                    <Link className="admin-footer-link" href="#" underline="none">
                        &#169; Airbnb
                    </Link>
                    <Link className="admin-footer-link" href="#" underline="none">
                        Contact
                    </Link>
                    <Link className="admin-footer-link" href="#" underline="none">
                        Privacy & terms
                    </Link>
                </Stack>
            </div>
        </div>
    );
};

export default AdminTemplate;
