import axiosClient from "./config/axiosClient";

const resourceName = "binh-luan";

const reviewApi = {
    createReview: (roomId, data) => {
        //Not available
        const url = `${resourceName}?roomId=${roomId}`;
        return axiosClient.post(url, data);
    },
    getReviewListByRoom: () => {
        return axiosClient.get(resourceName);
    },
};

export default reviewApi;
