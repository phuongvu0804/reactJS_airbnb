import axiosClient from "./config/axiosClient";

const resourceName = "users";

const userApi = {
    getUsers: () => {
        const url = resourceName;
        return axiosClient.get(url);
    },
    getUserDetails: (id) => {
        const url = `${resourceName}/${id}`;
        return axiosClient.get(url);
    },
    addUser: (user) => {
        const url = resourceName;
        return axiosClient.post(url, user);
    },
    updateUser: (id, user) => {
        const url = `${resourceName}/${id}`;
        return axiosClient.put(url, user);
    },
    deleteUser: (id) => {
        const url = `${resourceName}/${id}`;
        return axiosClient.delete(url);
    },
    updateUserPhoto: (photo) => {
        const url = `${resourceName}/upload-avatar`;
        return axiosClient.post(url, photo);
    },
};

export default userApi;
