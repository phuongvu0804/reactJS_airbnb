import axiosClient from "./config/axiosClient";

const RESOURCE_NAME = "dat-phong";

const ticketApi = {
    getTicketList: (params) => {
        return axiosClient.get(RESOURCE_NAME, { params });
    },
    getTicketListByUser: (userId) => {
        const URL = `${RESOURCE_NAME}/lay-theo-nguoi-dung/${userId}`;
        return axiosClient.get(URL);
    },
    deleteTicket: (ticketId) => {
        const url = `${RESOURCE_NAME}/${ticketId}`;
        return axiosClient.delete(url);
    },
    editTicket: (ticketId, data) => {
        const url = `${RESOURCE_NAME}/${ticketId}`;
        return axiosClient.put(url, data);
    },
    createTicket: (data) => {
        return axiosClient.post(RESOURCE_NAME, data);
    },
};

export default ticketApi;
