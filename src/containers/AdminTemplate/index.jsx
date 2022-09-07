import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useIsFetching, useIsMutating } from "react-query";

// Material UI
import { Box, Stack, Link, LinearProgress, Snackbar, Alert } from "@mui/material";

// Components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Breadcrumbs from "./components/Breadcrumbs";

// Redux actions
import { actCloseModal } from "@/store/actions/admin";

// Style
import "./style.scss";

const AdminTemplate = () => {
    const dispatch = useDispatch();
    const { isOpen, content } = useSelector((store) => store.admin.modal);

    const isFetching = useIsFetching();
    const isMutating = useIsMutating();

    const isLoading = !!(isFetching || isMutating);

    const handleCloseModal = (_, reason) => {
        if (reason === "clickaway") {
            return;
        }

        dispatch(actCloseModal());
    };

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
            <Snackbar
                open={isOpen}
                autoHideDuration={1000}
                onClose={handleCloseModal}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert onClose={handleCloseModal} severity="success" sx={{ width: "100%" }}>
                    {/* {isError ? "Cannot delete user!" : "Delete user successfully!"} */}
                    {content}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default AdminTemplate;
