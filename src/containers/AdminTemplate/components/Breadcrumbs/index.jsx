import { Link, useLocation } from "react-router-dom";

// Material UI
import { Stack, Typography, Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import { HomeOutlined } from "@mui/icons-material";

const Breadcrumbs = () => {
    const { pathname } = useLocation();

    const subpaths = pathname?.split("/").slice(1);
    const root = "/" + subpaths.shift();

    return (
        <Stack direction="row" spacing={1}>
            <HomeOutlined sx={{ color: "var(--primary)" }} />
            <MuiBreadcrumbs aria-label="breadcrumb">
                {subpaths?.map((subpath, idx) => {
                    if (idx === subpaths.length - 1) {
                        return (
                            <Typography key={idx} sx={{ color: "var(--primary)" }}>
                                <strong>{subpath}</strong>
                            </Typography>
                        );
                    }

                    let path = root;
                    for (let i = 0; i < idx + 1; ++i) {
                        path += "/" + subpaths[i];
                    }

                    return (
                        <Link key={idx} to={path} style={{ textDecoration: "none", color: "var(--lightgray)" }}>
                            {subpath}
                        </Link>
                    );
                })}
            </MuiBreadcrumbs>
        </Stack>
    );
};

export default Breadcrumbs;
