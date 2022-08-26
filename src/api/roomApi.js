import axiosClient from "./config/axiosClient";

const resourceName = "rooms";

const roomApi = {
    createRoom: (data) => {
        return axiosClient.post(resourceName, data);
    },
    getRoomList: (locationId) => {
        if (locationId !== "all-rooms") {
            const url = resourceName + `?locationId=${locationId}`;
            return axiosClient.get(url);
        } else {
            return axiosClient.get(resourceName);
        }
    },
    getRoomDetails: (roomId) => {
        const url = `${resourceName}/${roomId}`;
        return axiosClient.get(url);
    },
    createBooking: (data) => {
        const url = `${resourceName}/booking`;
        return axiosClient.post(url, data);
    },
};

export default roomApi;
