import { useLocation } from "react-router-dom";

// Material UI
import { Stack, Grid } from "@mui/material";

// Components
import TextInput from "../TextInput";
import RadioInput from "../RadioInput";
import RatingInput from "../RatingInput";
import MultiAutocompleteInput from "../MultiAutocompleteInput";
import WaveSkeleton from "@/components/WaveSkeleton";

const FormInputs = ({ columns, control, loading = false, disabled = false }) => {
    /*
     *  Get subpaths
     */
    const { pathname } = useLocation();
    const [firstLevelSubpath] = pathname.split("/").slice(2);
    const isUsersPage = firstLevelSubpath === "users";

    return columns.map((column) => {
        const { id, name, label, type, placeholder, options, multiline } = column;
        let inputNode = null;

        switch (loading || type) {
            case "text":
            case "email":
            case "password":
            case "date":
            case "number":
                inputNode = (
                    <TextInput
                        name={name}
                        type={type}
                        label={label}
                        placeholder={placeholder}
                        control={control}
                        disabled={disabled}
                        multiline={multiline}
                    />
                );
                break;
            case "radio":
                inputNode = <RadioInput name={name} label={label} control={control} disabled={disabled} />;
                break;
            case "rating":
                inputNode = <RatingInput name={name} label={label} control={control} disabled={disabled} />;
                break;
            case "multi-autocomplete":
                inputNode = (
                    <MultiAutocompleteInput
                        name={name}
                        label={label}
                        control={control}
                        options={options}
                        placeholder={placeholder}
                        disabled={disabled}
                    />
                );
                break;
            // Loading state
            default:
                inputNode = (
                    <Stack spacing={0.8}>
                        <WaveSkeleton variant="rectangular" sx={{ width: "40%", height: "12px" }} />
                        <WaveSkeleton variant="rectangular" sx={{ width: "100%", height: "12px" }} />
                    </Stack>
                );
        }

        return (
            <Grid item xs={isUsersPage ? 4 : 6} key={id}>
                {inputNode}
            </Grid>
        );
    });
};

export default FormInputs;
