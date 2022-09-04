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
};

export default userApi;
