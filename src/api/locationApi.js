import axiosClient from "./config/axiosClient";

const resourceName = "locations";

const locationApi = {
    getLocationList: (searchData) => {
        if (!searchData) {
            return axiosClient.get(resourceName);
        }

        const url = resourceName + `?location=${searchData}`;
        return axiosClient.get(url);
    },
    getLocationListByEvaluation: (evaluation) => {
        const url = resourceName + `/by-valueate?valueate=${evaluation}`;
        return axiosClient.get(url);
    },
    getLocationDetails: (id) => {
        const url = `${resourceName}/${id}`;
        return axiosClient.get(url);
    },
    addLocation: (location) => {
        const url = resourceName;
        return axiosClient.post(url, location);
    },
    updateLocation: (id, location) => {
        const url = `${resourceName}/${id}`;
        return axiosClient.put(url, location);
    },
    updateLocationPhoto: (id, photo) => {
        const url = `${resourceName}/upload-images/${id}`;
        return axiosClient.post(url, photo);
    },
    deleteLocation: (id) => {
        const url = `${resourceName}/${id}`;
        return axiosClient.delete(url);
    },
};

export default locationApi;
