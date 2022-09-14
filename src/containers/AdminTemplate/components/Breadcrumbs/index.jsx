import { useNavigate, useLocation, useParams, useSearchParams } from "react-router-dom";

// Material UI
import { Stack, Typography, Breadcrumbs as MuiBreadcrumbs, Link } from "@mui/material";
import { HomeOutlined } from "@mui/icons-material";

const Breadcrumbs = () => {
    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams();
    const { pathname, state } = useLocation();
    const { id } = useParams();

    const subpaths = pathname.split("/").slice(1);
    // Remove id in subpaths
    if (id === subpaths.at(-1)) {
        subpaths.pop();
    }
    let root = "/" + subpaths.shift();
    if (state?.prevPath && searchParams.has(state.prevPath.slice(0, -1))) {
        subpaths.unshift(state.prevPath);
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
                            onClick={() => navigate(1 - idx - subpaths.length)}
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
