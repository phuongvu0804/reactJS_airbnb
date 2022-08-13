import { Button } from "@mui/material";

function SubmitBtn({ children, startIcon, endIcon, className, variant }) {
    return (
        <Button type="submit" className={className} variant={variant} startIcon={startIcon} endIcon={endIcon}>
            {children}
        </Button>
    );
}

export default SubmitBtn;
