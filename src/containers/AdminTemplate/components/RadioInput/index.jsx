import { useController } from "react-hook-form";

// Material UI
import { FormControl, RadioGroup, Radio, FormControlLabel, FormLabel } from "@mui/material";

// Style
import "./style.scss";

const RadioInput = ({ name, label, control }) => {
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
                />
            </RadioGroup>
        </FormControl>
    );
};

export default RadioInput;
