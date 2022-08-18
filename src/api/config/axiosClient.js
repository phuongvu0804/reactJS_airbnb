import axios from "axios";
import apiConfig from "./apiConfig";
import { logError, validateResponse } from "./request";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

axiosClient.interceptors.request.use(
    (config) => {
        config.headers.tokenByClass = apiConfig.authToken;

        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            config.headers.token = `${user?.token}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error.response.data.message),
);

export default axiosClient;
