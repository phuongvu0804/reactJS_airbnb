import * as actTypes from "../constants/roomList";

const initState = {
    loading: false,
    roomList: [],
    guestNumber: 0,
    error: null,
};

const roomListReducer = (state = initState, action) => {
    switch (action.type) {
        case actTypes.GET_ROOM_LIST_REQUEST:
            state.loading = true;
            state.roomList = [];
            state.guestNumber = 0;
            state.error = null;
            return { ...state };

        case actTypes.GET_ROOM_LIST_SUCCESS:
            state.loading = false;
            state.roomList = action.payload;
            state.guestNumber = 0;
            state.error = null;
            return { ...state };

        case actTypes.GET_ROOM_LIST_FAIL:
            state.loading = false;
            state.roomList = [];
            state.guestNumber = 0;
            state.error = action.payload;
            return { ...state };

        case actTypes.GET_GUEST_NUMBER:
            state.loading = false;
            state.roomList = [];
            state.guestNumber = action.payload;
            state.error = null;
            return { ...state };

        default:
            return { ...state };
    }
};

export default roomListReducer;
