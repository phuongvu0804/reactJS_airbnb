import * as actTypes from "../constants/admin";

const actOpenModal = () => ({ type: actTypes.OPEN_MODAL });

const actCloseModal = () => ({ type: actTypes.CLOSE_MODAL });

export { actOpenModal, actCloseModal };
