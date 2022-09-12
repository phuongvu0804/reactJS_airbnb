import { useController } from "react-hook-form";

// Material UI
import { Stack, Rating, FormLabel } from "@mui/material";

const RatingInput = ({ name, label, control }) => {
    const { field } = useController({ name, control });

    return (
        <Stack spacing={1}>
            <FormLabel className="admin-input-label">{label}</FormLabel>
            <Rating {...field} max={10} precision={0.5} />
        </Stack>
    );
};

export default RatingInput;
