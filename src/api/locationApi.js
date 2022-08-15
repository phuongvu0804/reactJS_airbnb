import axiosClient from "./config/axiosClient";

const resourceName = "locations";

const locationApi = {
    getLocationList: (searchData) => {
        if (searchData === "") {
            return axiosClient.get(resourceName);
        } else {
            const url = resourceName + `?location=${searchData}`;
            return axiosClient.get(url);
        }
    },
    getLocationListByEvaluation: (evaluation) => {
        const url = resourceName + `/by-valueate?valueate=${evaluation}`;
        return axiosClient.get(url);
    },
    deleteLocation: (id) => {
        return axiosClient.delete(resourceName, { id });
    },
};

export default locationApi;
