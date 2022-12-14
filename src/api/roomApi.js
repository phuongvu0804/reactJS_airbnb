import axiosClient from "./config/axiosClient";

const resourceName = "rooms";

const roomApi = {
    createRoom: (room) => {
        return axiosClient.post(resourceName, room);
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
    deleteRoom: (roomId) => {
        const url = `${resourceName}/${roomId}`;
        return axiosClient.delete(url);
    },
    createBooking: (data) => {
        const url = `${resourceName}/booking`;
        return axiosClient.post(url, data);
    },
    updateRoom: (id, room) => {
        const url = `${resourceName}/${id}`;
        return axiosClient.put(url, room);
    },
    updateRoomPhoto: (id, photo) => {
        const url = `${resourceName}/upload-image/${id}`;
        return axiosClient.post(url, photo);
    },
};

export default roomApi;
