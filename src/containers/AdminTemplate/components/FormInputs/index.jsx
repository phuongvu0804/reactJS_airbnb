// Material UI
import { Stack, Grid } from "@mui/material";

// Components
import TextInput from "../../components/TextInput";
import RadioInput from "../../components/RadioInput";
import WaveSkeleton from "@/components/WaveSkeleton";

const FormInputs = ({ inputs, control, loading }) => {
    return inputs.map((input) => {
        const { id, name, label, type, placeholder } = input;
        let inputNode = null;

        switch (loading || type) {
            case "text":
            case "email":
            case "password":
            case "date":
                inputNode = (
                    <TextInput name={name} type={type} label={label} placeholder={placeholder} control={control} />
                );
                break;
            case "radio":
                inputNode = <RadioInput name={name} label={label} control={control} />;
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
            <Grid item xs={5} key={id}>
                {inputNode}
            </Grid>
        );
    });
};

export default FormInputs;
