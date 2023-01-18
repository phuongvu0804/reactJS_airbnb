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

const actGetTicketListRequest = () => {
    return {
        type: actTypes.GET_TICKET_LIST_REQUEST,
    };
};

const actGetTicketListSuccess = (data) => {
    return {
        type: actTypes.GET_TICKET_LIST_SUCCESS,
        payload: data,
    };
};

const actGetTicketListFail = (error) => {
    return {
        type: actTypes.GET_TICKET_LIST_FAIL,
        payload: error,
    };
};

const actGetTicketList = (userId) => {
    return (dispatch) => {
        dispatch(actGetTicketListRequest());

        callApi(
            ticketApi.getTicketListByUser(userId),
            (response) => dispatch(actGetTicketListSuccess(response.content)),
            (error) => dispatch(actGetTicketListFail(error)),
        );
    };
};

export { actEditTicket, actGetTicketList, actGetTicketListRequest, actGetTicketListSuccess, actGetTicketListFail };
