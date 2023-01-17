import axiosClient from "./config/axiosClient";

const resourceName = "vi-tri";

const locationApi = {
    getLocationList: (searchData) => {
        if (!searchData) {
            return axiosClient.get(resourceName);
        }

        const url = resourceName + `/${searchData}`;
        return axiosClient.get(url);
    },
    getLocations: () => {
        return axiosClient.get(resourceName);
    },
    getLocationListByEvaluation: (evaluation) => {
        //Not available
        const url = resourceName + `/by-valueate?valueate=${evaluation}`;
        return axiosClient.get(url);
    },
    getLocationDetails: (id) => {
        const url = `${resourceName}/${id}`;
        return axiosClient.get(url);
    },
    //Below are not available
    addLocation: (location) => {
        const url = resourceName;
        return axiosClient.post(url, location);
    },
    updateLocation: (id, location) => {
        const url = `${resourceName}/${id}`;
        return axiosClient.put(url, location);
    },
    updateLocationPhoto: (id, photo) => {
        const url = `${resourceName}/upload-hinh-vitri?maViTri=${id}`;
        return axiosClient.post(url, photo);
    },
    deleteLocation: (id) => {
        const url = `${resourceName}/${id}`;
        return axiosClient.delete(url);
    },
};

export default locationApi;
