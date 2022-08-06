import axiosClient from "./config/axiosClient";

const resourceName = "users";

const userApi = {
    getUserDetails: (id) => {
        const url = `${resourceName}/${id}`;
        return axiosClient.get(url);
    },
};

export default userApi;
