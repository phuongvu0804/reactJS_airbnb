import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "@/hooks";
import { useNavigate } from "react-router-dom";

// Material UI
import { Box, Stack, InputLabel, FormControlLabel, Checkbox, Link, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";

// Components
import Input from "../components/Input";

// Form handler
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/validators/auth";

// Redux actions
import { actLogin } from "@/store/actions/auth";

const LoginPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { login } = useSelector((state) => state.auth);
    const { control, handleSubmit } = useForm({
        reValidateMode: "onSubmit",
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleLogin = (user) => {
        dispatch(actLogin(user, auth, navigate));
    };

    return (
        <Stack component="form" noValidate spacing={2} onSubmit={handleSubmit(handleLogin)}>
            {login.error && <Alert severity="error">{login.error}</Alert>}
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
            <LoadingButton
                loading={login.loading}
                className="auth-btn-submit"
                type="submit"
                fullWidth
                variant="contained"
            >
                Continue
            </LoadingButton>
        </Stack>
    );
};

export default LoginPage;
