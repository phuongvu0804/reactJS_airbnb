import { authApi } from "@/api";
import * as actTypes from "../constants/auth";

// Log in
const actLoginRequest = () => ({
    type: actTypes.LOGIN_REQUEST,
});

const actLoginSuccess = () => ({
    type: actTypes.LOGIN_SUCCESS,
});

const actLoginFail = (error) => ({
    type: actTypes.LOGIN_FAIL,
    payload: error,
});

const actLogin = (user, auth, navigate) => {
    return async (dispatch) => {
        dispatch(actLoginRequest());

        try {
            const { data } = await authApi.login(user);
            user = { ...data.content.user, token: data.content.token };
            dispatch(actLoginSuccess());
            auth.login(user);
            navigate(-1);
        } catch (error) {
            dispatch(actLoginFail(error));
        }
    };
};

// Sign up
const actSignupRequest = () => ({
    type: actTypes.SIGNUP_REQUEST,
});

const actSignupSuccess = () => ({
    type: actTypes.SIGNUP_SUCCESS,
});

const actSignupFail = (error) => ({
    type: actTypes.SIGNUP_FAIL,
    payload: error,
});

const actSignup = (user, navigate) => {
    return async (dispatch) => {
        dispatch(actSignupRequest());

        try {
            await authApi.signup(user);
            dispatch(actSignupSuccess());
            navigate("/auth/login");
        } catch (error) {
            dispatch(actSignupFail(error));
        }
    };
};

export { actLogin, actSignup };
