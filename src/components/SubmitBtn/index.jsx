import { Button } from "@mui/material";

function SubmitBtn({ children, startIcon, endIcon, className, variant, onSubmit }) {
    return (
        <Button
            type="submit"
            className={className}
            variant={variant}
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onSubmit}
        >
            {children}
        </Button>
    );
}

export default SubmitBtn;
