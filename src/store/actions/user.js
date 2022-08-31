import { userApi } from "@/api";
import { callApi } from "@/api/config/request";
import * as actTypes from "../constants/user";

const actGetUserDataRequest = () => {
    return {
        type: actTypes.GET_USER_DATA_REQUEST,
    };
};

const actGetUserDataSuccess = (data) => {
    return {
        type: actTypes.GET_USER_DATA_SUCCESS,
        payload: data,
    };
};

const actGetUserDataFail = (error) => {
    return {
        type: actTypes.GET_USER_DATA_FAIL,
        payload: error,
    };
};

const actGetUserData = (userId) => {
    return (dispatch) => {
        dispatch(actGetUserDataRequest());

        callApi(
            userApi.getUserDetails(userId),
            (response) => dispatch(actGetUserDataSuccess(response)),
            (error) => dispatch(actGetUserDataFail(error)),
        );
    };
};

export { actGetUserData };
