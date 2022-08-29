// Material UI
import { Backdrop, CircularProgress } from "@mui/material";

const PageLoader = () => {
    return (
        <Backdrop sx={{ color: "transparent" }} open>
            <CircularProgress sx={{ color: "var(--primary)" }} size={60} />
        </Backdrop>
    );
};

export default PageLoader;
