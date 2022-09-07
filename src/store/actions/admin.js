import * as actTypes from "../constants/admin";

const actOpenModal = (content) => {
    return { type: actTypes.OPEN_MODAL, payload: content };
};

const actCloseModal = () => {
    return { type: actTypes.CLOSE_MODAL };
};

export { actOpenModal, actCloseModal };
