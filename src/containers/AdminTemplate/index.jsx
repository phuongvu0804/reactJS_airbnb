import { Outlet } from "react-router-dom";

// Material UI
import { Stack, Link } from "@mui/material";

// Components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

// Style
import "./style.scss";

const AdminTemplate = () => {
    return (
        <div className="admin">
            <Sidebar />
            <div className="admin-container">
                <Navbar />
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
