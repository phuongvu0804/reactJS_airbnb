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

const actEditUserRequest = () => {
    return {
        type: actTypes.EDIT_USER_REQUEST,
    };
};

const actEditUserSuccess = (data) => {
    return {
        type: actTypes.EDIT_USER_SUCCESS,
        payload: data,
    };
};

const actEditUserFail = (data) => {
    return {
        type: actTypes.EDIT_USER_FAIL,
        payload: data,
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

//Xoá redux
const actEditUser = (userId, data) => {
    return (dispatch) => {
        dispatch(actEditUserRequest());

        callApi(
            userApi.editUser(userId, data),
            (response) => dispatch(actEditUserSuccess(response)),
            (error) => dispatch(actEditUserFail(error)),
        );
    };
};

export { actGetUserData, actGetUserDataSuccess, actEditUser };
