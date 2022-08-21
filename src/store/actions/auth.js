import { authApi } from "@/api";
import * as actTypes from "../constants/auth";

// Log in
const actLoginRequest = () => ({
    type: actTypes.LOGIN_REQUEST,
});

const actLoginSuccess = (data) => ({
    type: actTypes.LOGIN_SUCCESS,
    payload: data,
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
            user = { ...data.user, token: data.token };
            dispatch(actLoginSuccess(user));
            auth.login(user);
            navigate(-1);
        } catch (error) {
            dispatch(actLoginFail(error));
        }
    };
};

// Sign up
// const actSignupRequest = () => ({
//     type: actTypes.SIGNUP_REQUEST,
// });

// const actSignupSuccess = (data) => ({
//     type: actTypes.SIGNUP_SUCCESS,
//     payload: data,
// });

// const actSignupFail = (error) => ({
//     type: actTypes.SIGNUP_FAIL,
//     payload: error,
// });

// const actSignup = (user) => {
//     return (dispatch) => {
//         dispatch(actSignupRequest());

//         callApi(
//             authApi.signup(user),
//             (response) => {
//                 dispatch(actSignupSuccess(response));
//             },
//             (error) => {
//                 dispatch(actSignupFail(error));
//             },
//         );
//     };
// };

export { actLogin };
