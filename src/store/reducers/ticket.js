import * as actTypes from "../constants/ticket";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case actTypes.EDIT_TICKET_REQUEST:
        case actTypes.GET_TICKET_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actTypes.EDIT_TICKET_SUCCESS:
        case actTypes.GET_TICKET_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case actTypes.EDIT_TICKET_FAIL:
        case actTypes.GET_TICKET_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return { ...state };
    }
};

export default ticketReducer;
