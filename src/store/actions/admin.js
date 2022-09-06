import * as actTypes from "../constants/admin";


const actOpenModal = () => ({action: actTypes.OPEN_MODAL});

const actCloseModal = () => ({action: actTypes.CLOSE_MODAL});

export {actOpenModal, actCloseModal};