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
    deleteUser: (id) => {
        const url = `${resourceName}/${id}`;
        return axiosClient.delete(url);
    },
};

export default userApi;
