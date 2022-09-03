// Material UI
import { FormControl, RadioGroup, Radio, FormControlLabel, FormLabel } from "@mui/material";

// Style
import "./style.scss";

const RadioInput = ({ label }) => {
    return (
        <FormControl>
            <FormLabel className="admin-input-label">{label}</FormLabel>
            <RadioGroup
                className="admin-form-radio-group"
                aria-labelledby="demo-controlled-radio-buttons-group"
                value={true}
                // value={radioValue}
                // onChange={handleChangeRadio}
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
