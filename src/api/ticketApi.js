import axiosClient from "./config/axiosClient";

const resourceName = "tickets";

const ticketApi = {
    getTicketList: (params) => {
        return axiosClient.get(resourceName, { params });
    },
    getTicketDetails: (ticketId) => {
        const url = `${resourceName}/${ticketId}`;
        return axiosClient.get(url);
    },
    deleteTicket: (ticketId) => {
        const url = `${resourceName}/${ticketId}`;
        return axiosClient.delete(url);
    },
    editTicket: (ticketId, data) => {
        const url = `${resourceName}/${ticketId}`;
        return axiosClient.put(url, data);
    },
};

export default ticketApi;
