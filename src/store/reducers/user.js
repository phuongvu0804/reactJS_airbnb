import * as actTypes from "../constants/user";

const initState = {
    loading: false,
    data: null,
    error: null,
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case actTypes.GET_USER_DATA_REQUEST:
            state.loading = true;
            state.data = null;
            state.error = null;
            return { ...state };

        case actTypes.GET_USER_DATA_SUCCESS:
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return { ...state };

        case actTypes.GET_USER_DATA_FAIL:
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            return { ...state };

        default:
            return { ...state };
    }
};

export default userReducer;
