// Material UI
import { Box, Stack, InputLabel, FormControlLabel, Checkbox, Link } from "@mui/material";
import { LoadingButton } from "@mui/lab";

// Components
import Input from "../components/Input";

// Form handler
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const loginSchema = yup
    .object({
        email: yup.string().required("This field is required.").email(),
        password: yup.string().required(),
    })
    .required();

const LoginPage = () => {
    const { control, handleSubmit } = useForm({
        reValidateMode: "onSubmit",
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleLogin = (user) => {};

    return (
        <Stack component="form" noValidate spacing={2} onSubmit={handleSubmit(handleLogin)}>
            <Box>
                <InputLabel className="auth-form-input-label">Email</InputLabel>
                <Input name="email" className="auth-form-input" type="email" control={control} />
            </Box>
            <Box>
                <InputLabel className="auth-form-input-label">Password</InputLabel>
                <Input name="password" className="auth-form-input" type="password" control={control} />
            </Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <FormControlLabel
                    className="auth-login-remember"
                    control={
                        <Checkbox
                            size="medium"
                            sx={{
                                color: "var(--primary)",
                                "&.Mui-checked": {
                                    color: "var(--primary)",
                                },
                            }}
                        />
                    }
                    label="Remember me"
                />
                <Link className="auth-forgot-password" href="#" underline="none">
                    Forgot your password?
                </Link>
            </Stack>
            <LoadingButton className="auth-btn-submit" type="submit" fullWidth variant="contained">
                Continue
            </LoadingButton>
        </Stack>
    );
};

export default LoginPage;
