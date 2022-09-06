import * as actTypes from "../constants/admin";

const initState = {
    modal: { isOpen: false },
};

const adminReducer = (state = initState, action) => {
    switch (action.type) {
        case actTypes.OPEN_MODAL:
            return { ...state, modal: { isOpen: true } };

        case actTypes.CLOSE_MODAL:
            return { ...state, modal: { isOpen: false } };

        default:
            return state;
    }
};

export default adminReducer;
