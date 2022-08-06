import axiosClient from "./config/axiosClient";

const resourceName = "locations";

const locationApi = {
    getLocationList: (params) => {
        return axiosClient.get(resourceName, { params });
    },
    deleteLocation: (id) => {
        return axiosClient.delete(resourceName, { id });
    },
};

export default locationApi;
