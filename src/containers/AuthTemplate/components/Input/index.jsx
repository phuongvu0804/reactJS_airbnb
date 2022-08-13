import { useController } from "react-hook-form";

// Material UI
import { TextField } from "@mui/material";

const Input = ({ name, control, ...others }) => {
    const {
        field,
        fieldState: { error },
    } = useController({ name, control });

    return (
        <TextField {...field} {...others} error={!!error} helperText={error && error.message} hiddenLabel fullWidth />
    );
};

export default Input;
