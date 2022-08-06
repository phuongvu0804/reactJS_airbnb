import axiosClient from "./config/axiosClient";

const resourceName = "reviews";

const reviewApi = {
    createReview: (roomId, data) => {
        const url = `${resourceName}?roomId=${roomId}`;
        return axiosClient.post(url, data);
    },
    getReviewListByRoom: (roomId) => {
        const url = `${resourceName}/byRoom?roomId=${roomId}`;
        return axiosClient.get(url);
    },
};

export default reviewApi;
