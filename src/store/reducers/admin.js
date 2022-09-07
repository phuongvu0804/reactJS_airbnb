import * as actTypes from "../constants/admin";

const initState = {
    modal: { isOpen: false, content: "" },
};

const adminReducer = (state = initState, action) => {
    switch (action.type) {
        case actTypes.OPEN_MODAL:
            return {
                ...state,
                modal: {
                    isOpen: true,
                    content: action.payload,
                },
            };

        case actTypes.CLOSE_MODAL:
            return {
                ...state,
                modal: {
                    isOpen: false,
                    content: "",
                },
            };

        default:
            return state;
    }
};

export default adminReducer;
