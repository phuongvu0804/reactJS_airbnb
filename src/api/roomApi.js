import axiosClient from "./config/axiosClient";

const resourceName = "phong-thue";

const roomApi = {
    createRoom: (room) => {
        return axiosClient.post(resourceName, room);
    },
    getRoomList: (locationId) => {
        if (locationId) {
            const url = resourceName + `/lay-phong-theo-vi-tri?maViTri=${locationId}`;
            return axiosClient.get(url);
        }
        return axiosClient.get(resourceName);
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
        return axiosClient.post(resourceName, data);
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
