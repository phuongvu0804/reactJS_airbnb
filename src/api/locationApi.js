import axiosClient from "./config/axiosClient";

const resourceName = "locations/";

const locationApi = {
    getLocationList: (params) => {
        return axiosClient.get(resourceName, { params });
    },
    getLocationListByEvaluation: (evaluation) => {
        const url = resourceName + `by-valueate?valueate=${evaluation}`;
        return axiosClient.get(url);
    },
    deleteLocation: (id) => {
        return axiosClient.delete(resourceName, { id });
    },
};

export default locationApi;
