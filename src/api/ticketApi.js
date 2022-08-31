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
};

export default ticketApi;
