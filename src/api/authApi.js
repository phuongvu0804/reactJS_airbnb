import axiosClient from "./config/axiosClient";

const resourceName = "auth";

const authApi = {
    login: (user) => {
        const url = resourceName + "/login";
        return axiosClient.post(url, user);
    },
    signup: (user) => {
        const url = resourceName + "/register";
        return axiosClient.post(url, user);
    },
};

export default authApi;
