import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";

function SubmitBtn({ children, startIcon, endIcon, className, variant, onSubmit, loading = false, ...others }) {
    return (
        <LoadingButton
            type="submit"
            className={className}
            variant={variant}
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onSubmit}
            loading={loading}
            {...others}
        >
            {children}
        </LoadingButton>
    );
}

export default SubmitBtn;
