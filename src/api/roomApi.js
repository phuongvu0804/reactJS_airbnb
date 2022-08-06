import axiosClient from "./config/axiosClient";

const resourceName = "rooms";

const roomApi = {
    createRoom: (data) => {
        return axiosClient.post(resourceName, data);
    },
};

export default roomApi;
