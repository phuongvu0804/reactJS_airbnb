import React from "react";

//Material UI
import { Button } from "@mui/material";

//Others
import "./style.scss";

function LoadMoreBtn({ children = "Show more", className, leftIcon, rightIcon, setVisible, loadNumber, ...others }) {
    const handleLoadMore = () => {
        setVisible((prev) => prev + loadNumber);
    };

    return (
        <Button className={`show-btn ${className}`} {...others} onClick={handleLoadMore}>
            {rightIcon && rightIcon}
            {children}
            {leftIcon && leftIcon}
        </Button>
    );
}

export default LoadMoreBtn;
