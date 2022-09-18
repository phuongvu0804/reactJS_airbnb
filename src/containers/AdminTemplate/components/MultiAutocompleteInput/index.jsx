import { useController } from "react-hook-form";

// Material UI
import { InputLabel, TextField, Autocomplete } from "@mui/material";

// Style
import "./style.scss";

const MultiAutocompleteInput = ({ name, label, control, options, placeholder, disabled = false }) => {
    const { field } = useController({ name, control });

    return (
        <>
            <InputLabel className="admin-input-label">{label}</InputLabel>
            <Autocomplete
                multiple
                id="tags-standard"
                {...field}
                onChange={(_, value) => field.onChange(value)}
                options={options}
                getOptionLabel={(option) => option.title}
                isOptionEqualToValue={(option, value) => option.title === value.title}
                filterSelectedOptions
                renderInput={(params) => {
                    return (
                        <TextField
                            {...params}
                            variant="standard"
                            hiddenLabel
                            placeholder={placeholder}
                            className="admin-input-text"
                        />
                    );
                }}
                disabled={disabled}
            />
        </>
    );
};

export default MultiAutocompleteInput;
