import React from "react";

//Material UI
import { Button } from "@mui/material";

function LoadMoreBtn({ children, className, leftIcon, rightIcon, setVisible, loadNumber, ...others }) {
    const handleLoadMore = () => {
        setVisible((prev) => prev + loadNumber);
    };

    return (
        <Button className={className} {...others} onClick={handleLoadMore}>
            {rightIcon && rightIcon}
            {children}
            {leftIcon && leftIcon}
        </Button>
    );
}

export default LoadMoreBtn;
