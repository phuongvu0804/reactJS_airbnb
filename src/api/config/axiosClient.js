import axios from "axios";
import apiConfig from "./apiConfig";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

axiosClient.interceptors.request.use(
    (config) => {
        config = {
            ...config,
            headers: {
                tokenCybersoft: apiConfig.TokenCyberSoft,
                Token: JSON.parse(localStorage.getItem("user"))?.token,
            },
        };

        return config;
    },
    (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error.response.data.message),
);

export default axiosClient;
