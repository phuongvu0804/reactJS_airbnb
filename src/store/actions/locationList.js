import { locationApi } from "@/api";
import { callApi } from "@/api/config/request";
import * as actTypes from "../constants/locationList";

const actGetLocationListRequest = () => {
    return {
        type: actTypes.GET_LOCATION_LIST_REQUEST,
    };
};

const actGetLocationListSuccess = (data) => {
    return {
        type: actTypes.GET_LOCATION_LIST_SUCCESS,
        payload: data,
    };
};

const actGetLocationListFail = (error) => {
    return {
        type: actTypes.GET_LOCATION_LIST_FAIL,
        payload: error,
    };
};

const actGetLocationList = (searchData = "") => {
    return (dispatch) => {
        dispatch(actGetLocationListRequest());

        callApi(
            locationApi.getLocationList(searchData),
            (response) => {
                dispatch(actGetLocationListSuccess(response));
            },
            (error) => {
                dispatch(actGetLocationListFail(error));
            },
        );
    };
};

export { actGetLocationList, actGetLocationListRequest, actGetLocationListSuccess, actGetLocationListFail };
