import * as actTypes from "../constants/auth";

const initialState = {
    login: {
        loading: false,
        data: null,
        error: null,
    },
    signup: {
        loading: false,
        data: null,
        error: null,
    },
};

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        // Log in
        case actTypes.LOGIN_REQUEST:
            return {
                ...state,
                login: {
                    loading: true,
                    data: null,
                    error: null,
                },
            };

        case actTypes.LOGIN_SUCCESS:
            return {
                ...state,
                login: {
                    loading: false,
                    data: payload,
                    error: null,
                },
            };

        case actTypes.LOGIN_FAIL:
            return {
                ...state,
                login: {
                    loading: false,
                    data: null,
                    error: payload,
                },
            };

        // Sign up
        case actTypes.SIGNUP_REQUEST:
            return {
                ...state,
                signup: {
                    loading: true,
                    data: null,
                    error: null,
                },
            };

        case actTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                signup: {
                    loading: false,
                    data: payload,
                    error: null,
                },
            };

        case actTypes.SIGNUP_FAIL:
            return {
                ...state,
                signup: {
                    loading: false,
                    data: null,
                    error: payload,
                },
            };

        default:
            return state;
    }
};

export default authReducer;
