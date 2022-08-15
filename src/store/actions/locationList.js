import { locationApi } from "@/api";
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

        const fetchPlaceList = async () => {
            try {
                const locationList = await locationApi.getLocationList(searchData);
                dispatch(actGetLocationListSuccess(locationList));
            } catch (error) {
                dispatch(actGetLocationListFail(error));
            }
        };

        fetchPlaceList();
    };
};

export { actGetLocationList };
