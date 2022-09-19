import * as actTypes from "../constants/user";

const initState = {
    loading: false,
    data: null,
    editedUser: null,
    errorUser: null,
    deletedShoppingCart: null,
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case actTypes.GET_USER_DATA_REQUEST:
            state.loading = true;
            state.data = null;
            state.editedUser = null;
            state.errorUser = null;
            return { ...state };

        case actTypes.GET_USER_DATA_SUCCESS:
            state.loading = false;
            state.data = action.payload;
            state.editedUser = null;
            state.errorUser = null;
            return { ...state };

        case actTypes.GET_USER_DATA_FAIL:
            state.loading = false;
            state.data = null;
            state.editedUser = null;
            state.errorUser = action.payload;
            return { ...state };

        case actTypes.EDIT_USER_REQUEST:
            state.loading = true;
            state.data = null;
            state.editedUser = null;
            state.errorUser = null;
            return { ...state };

        case actTypes.EDIT_USER_SUCCESS:
            state.loading = false;
            state.editedUser = action.payload;
            state.errorUser = null;
            return { ...state };

        case actTypes.EDIT_USER_FAIL:
            state.loading = false;
            state.errorUser = action.payload;
            return { ...state };

        default:
            return { ...state };
    }
};

export default userReducer;
