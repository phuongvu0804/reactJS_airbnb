import { Button } from "@mui/material";
import React from "react";

function SubmitBtn({ children, startIcon, endIcon, className, variant }) {
    return (
        <Button type="submit" className={className} variant={variant} startIcon={startIcon} endIcon={endIcon}>
            {children}
        </Button>
    );
}

export default SubmitBtn;
