import { locationApi } from "@/api";
import * as actTypes from "../constants/placeList";

const actGetPlaceList = (evaluation) => {
    return (dispatch) => {
        dispatch(actGetPlaceListRequest());

        const fetchPlaceList = async () => {
            try {
                const placeList = await locationApi.getLocationList();
                dispatch(actGetPlaceListSuccess(placeList));
            } catch (error) {
                dispatch(actGetPlaceListFail(error));
            }
        };

        fetchPlaceList();
    };
};

const actGetPlaceListRequest = () => {
    return {
        type: actTypes.GET_PLACE_LIST_REQUEST,
    };
};

const actGetPlaceListSuccess = (data) => {
    return {
        type: actTypes.GET_PLACE_LIST_SUCCESS,
        payload: data,
    };
};

const actGetPlaceListFail = (error) => {
    return {
        type: actTypes.GET_PLACE_LIST_FAIL,
        payload: error,
    };
};

export { actGetPlaceList };
