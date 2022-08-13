import * as actTypes from "../constants/placeList";

const initState = {
    loading: false,
    data: null,
    error: null,
};

const placeListReducer = (state = initState, action) => {
    switch (action.type) {
        case actTypes.GET_PLACE_LIST_REQUEST:
            state.loading = true;
            state.data = null;
            state.error = null;
            return { ...state };

        case actTypes.GET_PLACE_LIST_SUCCESS:
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return { ...state };

        case actTypes.GET_PLACE_LIST_FAIL:
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            return { ...state };

        default:
            return { ...state };
    }
};

export default placeListReducer;
