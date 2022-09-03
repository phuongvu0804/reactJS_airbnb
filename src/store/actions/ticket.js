import { ticketApi } from "@/api";
import { callApi } from "@/api/config/request";
import * as actTypes from "../constants/ticket";

const actEditTicketRequest = () => {
    return {
        type: actTypes.EDIT_TICKET_REQUEST,
    };
};

const actEditTicketSuccess = (data) => {
    return {
        type: actTypes.EDIT_TICKET_SUCCESS,
        payload: data,
    };
};

const actEditTicketFail = (error) => {
    return {
        type: actTypes.EDIT_TICKET_FAIL,
        payload: error,
    };
};

const actEditTicket = (ticketId) => {
    return (dispatch) => {
        dispatch(actEditTicketRequest());

        callApi(
            ticketApi.editTicket(ticketId),
            (response) => dispatch(actEditTicketSuccess(response)),
            (error) => dispatch(actEditTicketFail(error)),
        );
    };
};

export { actEditTicket };
