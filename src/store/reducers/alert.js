import { ALERT_CLOSE, ALERT_OPEN } from "../constants/alert";
import * as actTypes from "../constants/ticket";

const initialState = {
    type: ALERT_CLOSE,
    data: {
        state: false,
        type: "info",
        title: "",
        content: "",
    },
};

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALERT_CLOSE:
            return {
                ...state,
                type: ALERT_CLOSE,
            };
        case ALERT_OPEN:
            return {
                ...state,
                type: ALERT_OPEN,
                data: action.data,
            };

        default:
            return { ...state };
    }
};

export default alertReducer;
