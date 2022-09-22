import { useNavigate, useLocation, useParams } from "react-router-dom";

// Material UI
import { Stack, Typography, Breadcrumbs as MuiBreadcrumbs, Link } from "@mui/material";
import { HomeOutlined } from "@mui/icons-material";

const subpath = {
    users: {
        title: "users",
        prevLevel: "",
        nextLevel: "",
    },
    locations: {
        title: "locations",
        prevLevel: "",
        nextLevel: "rooms",
    },
    rooms: {
        title: "rooms",
        prevLevel: "locations",
        nextLevel: "",
    },
};

const Breadcrumbs = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { id } = useParams();

    const subpaths = pathname.split("/").slice(2);
    // Remove id in subpaths
    if (id === subpaths.at(-1)) {
        subpaths.pop();
    }

    while (true) {
        if (!subpath[subpaths[0]]?.prevLevel) {
            break;
        }

        subpaths.unshift(subpath[subpaths[0]]?.prevLevel);
    }

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

                    return (
                        <Link
                            key={idx}
                            onClick={() => navigate(1 + idx - subpaths.length)}
                            style={{ textDecoration: "none", cursor: "pointer", color: "var(--lightgray)" }}
                        >
                            {subpath}
                        </Link>
                    );
                })}
            </MuiBreadcrumbs>
        </Stack>
    );
};

export default Breadcrumbs;
