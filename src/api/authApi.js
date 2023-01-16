import axiosClient from "./config/axiosClient";

const resourceName = "auth";

const authApi = {
    login: (user) => {
        const url = resourceName + "/signin";
        return axiosClient.post(url, user);
    },
    signup: (user) => {
        const url = resourceName + "/signup";
        return axiosClient.post(url, user);
    },
};

export default authApi;
