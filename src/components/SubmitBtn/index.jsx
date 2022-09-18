import { Button } from "@mui/material";

function SubmitBtn({ children, startIcon, endIcon, className, variant, onSubmit, ...others }) {
    return (
        <Button
            type="submit"
            className={className}
            variant={variant}
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onSubmit}
            {...others}
        >
            {children}
        </Button>
    );
}

export default SubmitBtn;
