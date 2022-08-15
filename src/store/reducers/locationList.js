import * as actTypes from "../constants/locationList";

const initState = {
    loading: false,
    data: null,
    error: null,
};

const locationListReducer = (state = initState, action) => {
    switch (action.type) {
        case actTypes.GET_LOCATION_LIST_REQUEST:
            state.loading = true;
            state.data = null;
            state.error = null;
            return { ...state };

        case actTypes.GET_LOCATION_LIST_SUCCESS:
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return { ...state };

        case actTypes.GET_LOCATION_LIST_FAIL:
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            return { ...state };

        default:
            return { ...state };
    }
};

export default locationListReducer;
