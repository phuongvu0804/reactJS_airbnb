import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks";

// Material UI
import { Stack, InputLabel, FormControl, FormControlLabel, FormLabel, Grid, RadioGroup, Radio } from "@mui/material";
import { LoadingButton } from "@mui/lab";

// Components
import Input from "../components/Input";

// Form handler
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "@/validators";

// Redux actions
import { actSignup } from "@/store/actions/auth";

const SignupPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useAuth();
    const [radioValue, setRadioValue] = useState(true);
    const { control, handleSubmit, setValue } = useForm({
        reValidateMode: "onSubmit",
        resolver: yupResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            gender: true,
            birthday: "",
            password: "",
            phone: "",
            address: "",
        },
    });
    const { signup } = useSelector((state) => state.auth);

    if (auth.user) {
        return <Navigate to="/" />;
    }

    const handleChangeRadio = (event) => {
        const booleanValue = event.target.value === "true";
        setValue("gender", booleanValue);
        setRadioValue(booleanValue);
    };

    const handleSignup = (user) => {
        dispatch(actSignup(user, navigate));
    };

    return (
        <Stack component="form" noValidate spacing={2} onSubmit={handleSubmit(handleSignup)}>
            <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12} md={6}>
                    <InputLabel className="auth-form-input-label">Full Name</InputLabel>
                    <Input name="name" className="auth-form-input" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel className="auth-form-input-label">Email</InputLabel>
                    <Input name="email" className="auth-form-input" type="email" control={control} />
                </Grid>
                <Grid item xs={12} sm={7} md={6}>
                    <FormControl>
                        <FormLabel className="auth-form-input-label">Gender</FormLabel>
                        <RadioGroup
                            className="auth-form-radio-group"
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            value={radioValue}
                            onChange={handleChangeRadio}
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
                </Grid>
                <Grid item xs={12} sm={5} md={6}>
                    <InputLabel className="auth-form-input-label">Birthday</InputLabel>
                    <Input name="birthday" type="date" className="auth-form-input" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel className="auth-form-input-label">Password</InputLabel>
                    <Input name="password" className="auth-form-input" type="password" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel className="auth-form-input-label">Phone</InputLabel>
                    <Input name="phone" className="auth-form-input" control={control} />
                </Grid>
                <Grid item xs={12}>
                    <InputLabel className="auth-form-input-label">Address</InputLabel>
                    <Input name="address" className="auth-form-input" control={control} />
                </Grid>
            </Grid>
            <LoadingButton
                loading={signup.loading}
                className="auth-btn-submit"
                type="submit"
                fullWidth
                variant="contained"
            >
                Sign Up
            </LoadingButton>
        </Stack>
    );
};

export default SignupPage;
