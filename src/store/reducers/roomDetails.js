import * as actTypes from "../constants/roomDetails";

const initState = {
    loading: false,
    roomDetails: null,
    roomReviews: null,
    roomBooked: null,
    roomSaved: [],
    errorRoomDetails: null,
    errorRoomReview: null,
    errorBooking: null,
    errorSave: null,
};

const roomDetailsReducer = (state = initState, action) => {
    switch (action.type) {
        case actTypes.GET_ROOM_DETAILS_REQUEST:
            return { ...state, loading: true };

        case actTypes.GET_ROOM_DETAILS_SUCCESS:
            return { ...state, roomDetails: action.payload };

        case actTypes.GET_ROOM_DETAILS_FAIL:
            return { ...state, errorRoomDetails: action.payload };

        case actTypes.GET_ROOM_REVIEW_REQUEST:
            return { ...state, loading: true };

        case actTypes.GET_ROOM_REVIEW_SUCCESS:
            return { ...state, roomReviews: action.payload };

        case actTypes.GET_ROOM_REVIEW_FAIL:
            return { ...state, errorRoomReview: action.payload };

        case actTypes.CREATE_BOOKING_REQUEST:
            return { ...state, loading: true };

        case actTypes.CREATE_BOOKING_SUCCESS:
            return { ...state, roomBooked: action.payload };

        case actTypes.CREATE_SAVE_REQUEST:
            return { ...state, errorBooking: action.payload };

        case actTypes.CREATE_SAVE_REQUEST:
            return { ...state, loading: true };

        case actTypes.CREATE_SAVE_SUCCESS:
            return { ...state, roomSaved: [...action.payload] };

        case actTypes.CREATE_SAVE_FAIL:
            return { ...state, errorSave: action.payload };

        default:
            return { ...state };
    }
};

export default roomDetailsReducer;
