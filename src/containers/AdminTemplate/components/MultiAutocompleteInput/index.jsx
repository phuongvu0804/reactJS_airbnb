import { useController } from "react-hook-form";

// Material UI
import { InputLabel, TextField, Autocomplete } from "@mui/material";

const MultiAutocompleteInput = ({ name, label, control, options, placeholder }) => {
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
            />
        </>
    );
};

export default MultiAutocompleteInput;
