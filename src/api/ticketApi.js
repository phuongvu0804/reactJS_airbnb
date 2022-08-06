import axiosClient from "./config/axiosClient";

const resourceName = "tickets";

const ticketApi = {
    getTicketList: (params) => {
        return axiosClient.get(resourceName, { params });
    },
};

export default ticketApi;
