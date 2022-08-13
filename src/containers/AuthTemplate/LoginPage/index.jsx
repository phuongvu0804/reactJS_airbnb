// Material UI
import {
    Container,
    Box,
    Grid,
    Paper,
    Stack,
    Typography,
    InputLabel,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

const LoginPage = () => {
    return (
        <>
            <Paper className="auth-form-container" elevation={3}>
                <Typography className="auth-form-title" component="h2" variant="h5">
                    Sign in to your account
                </Typography>
                <Stack component="form" noValidate spacing={2}>
                    <Box>
                        <InputLabel className="auth-form-input-label">Username</InputLabel>
                        <TextField className="auth-form-input" hiddenLabel fullWidth></TextField>
                    </Box>
                    <Box>
                        <InputLabel className="auth-form-input-label">Password</InputLabel>
                        <TextField className="auth-form-input" hiddenLabel fullWidth></TextField>
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
            </Paper>
            <Typography className="auth-signup-link">
                Don't have an account?{" "}
                <Link href="#" underline="none">
                    Sign up
                </Link>
            </Typography>
        </>
    );
};

export default LoginPage;
