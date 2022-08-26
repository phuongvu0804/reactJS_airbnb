import React from "react";
import { Skeleton } from "@mui/material";

function WaveSkeleton({ variant, sx }) {
    return <Skeleton animation="wave" variant={variant} {...sx} />;
}

export default WaveSkeleton;
