import React from "react";

//Material UI
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import "./style.scss";
function CloseBtn({ className, onClick, sx, ...others }) {
    return (
        <IconButton className={`closing-btn ${className}`} onClick={onClick} sx={sx} {...others}>
            <CloseIcon />
        </IconButton>
    );
}

export default CloseBtn;
