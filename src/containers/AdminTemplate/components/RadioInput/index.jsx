import { useController } from "react-hook-form";

// Material UI
import { FormControl, RadioGroup, Radio, FormControlLabel, FormLabel } from "@mui/material";

// Style
import "./style.scss";

const RadioInput = ({ name, label, control, disabled = false }) => {
    const { field } = useController({ name, control });

    return (
        <FormControl>
            <FormLabel className="admin-input-label">{label}</FormLabel>
            <RadioGroup
                className="admin-form-radio-group"
                aria-labelledby="demo-controlled-radio-buttons-group"
                {...field}
            >
                <FormControlLabel
                    value={true}
                    control={
                        <Radio
                            sx={{
                                color: "var(--primary)",
                                "&.Mui-checked": {
                                    color: "var(--primary)",
                                },
                            }}
                        />
                    }
                    label="Male"
                    disabled={disabled}
                />
                <FormControlLabel
                    value={false}
                    control={
                        <Radio
                            sx={{
                                color: "var(--primary)",
                                "&.Mui-checked": {
                                    color: "var(--primary)",
                                },
                            }}
                        />
                    }
                    label="Female"
                    disabled={disabled}
                />
            </RadioGroup>
        </FormControl>
    );
};

export default RadioInput;
