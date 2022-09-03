import { useController } from "react-hook-form";

// Material UI
import { InputLabel, TextField } from "@mui/material";

// Style
import "./style.scss";

const TextInput = ({ name, label, control, ...others }) => {
    const {
        field,
        fieldState: { error },
    } = useController({ name, control });

    return (
        <>
            <InputLabel className="admin-input-label">{label}</InputLabel>
            <TextField
                {...field}
                {...others}
                className="admin-input-text"
                error={!!error}
                helperText={error && error.message}
                hiddenLabel
                fullWidth={others.type !== "date"}
                variant="standard"
            />
        </>
    );
};

export default TextInput;
