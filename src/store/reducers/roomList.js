import * as actTypes from "../constants/roomList";

const initState = {
    loading: false,
    roomList: [],
    filteredList: [],
    guestNumber: 0,
    error: null,
};

const roomListReducer = (state = initState, action) => {
    switch (action.type) {
        case actTypes.GET_ROOM_LIST_REQUEST:
            return { ...state, loading: true };

        case actTypes.GET_ROOM_LIST_SUCCESS:
            return { ...state, loading: false, roomList: action.payload, filteredList: action.payload };

        case actTypes.GET_ROOM_LIST_FAIL:
            return { ...state, loading: false, error: action.payload };

        case actTypes.GET_FILTERED_LIST_REQUEST:
            return { ...state, loading: true };

        case actTypes.GET_FILTERED_LIST_SUCCESS:
            return { ...state, loading: false, filteredList: action.payload };

        case actTypes.GET_ROOM_LIST_FAIL:
            return { ...state, loading: false, error: action.payload };

        case actTypes.GET_GUEST_NUMBER:
            return { ...state, loading: false, guestNumber: action.payload };

        default:
            return { ...state };
    }
};

export default roomListReducer;
