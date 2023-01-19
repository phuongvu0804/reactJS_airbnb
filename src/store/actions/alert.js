import { ALERT_CLOSE, ALERT_OPEN } from "../constants/alert";

export const actCloseAlert = () => {
    return {
        type: ALERT_CLOSE,
    };
};

export const actOpenAlert = (data) => {
    return {
        type: ALERT_OPEN,
        data,
    };
};
