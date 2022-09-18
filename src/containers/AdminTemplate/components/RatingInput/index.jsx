import { useController } from "react-hook-form";

// Material UI
import { Stack, Rating, FormLabel } from "@mui/material";

const RatingInput = ({ name, label, control, disabled = false }) => {
    const { field } = useController({ name, control });

    return (
        <Stack spacing={1}>
            <FormLabel className="admin-input-label">{label}</FormLabel>
            <Rating {...field} value={+field.value} max={10} precision={0.5} disabled={disabled} />
        </Stack>
    );
};

export default RatingInput;
