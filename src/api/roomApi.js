import axiosClient from "./config/axiosClient";

const resourceName = "rooms";

const roomApi = {
    createRoom: (data) => {
        return axiosClient.post(resourceName, data);
    },
    getRoomList: (locationId) => {
        if (locationId !== "") {
            const url = resourceName + `?locationId=${locationId}`;
            return axiosClient.get(url);
        } else {
            return axiosClient.get(resourceName);
        }
    },
};

export default roomApi;
