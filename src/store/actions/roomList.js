import { roomApi } from "@/api";
import { callApi } from "@/api/config/request";
import * as actTypes from "../constants/roomList";

const actGetRoomListRequest = () => {
    return {
        type: actTypes.GET_ROOM_LIST_REQUEST,
    };
};

const actGetRoomListSuccess = (data) => {
    return {
        type: actTypes.GET_ROOM_LIST_SUCCESS,
        payload: data,
    };
};

const actGetRoomListFail = (error) => {
    return {
        type: actTypes.GET_ROOM_LIST_FAIL,
        payload: error,
    };
};

const actGetFilteredListRequest = () => {
    return {
        type: actTypes.GET_FILTERED_LIST_REQUEST,
    };
};

const actGetFilteredListSuccess = (data) => {
    return {
        type: actTypes.GET_FILTERED_LIST_SUCCESS,
        payload: data,
    };
};

const actGetFilteredListFail = (error) => {
    return {
        type: actTypes.GET_FILTERED_LIST_FAIL,
        payload: error,
    };
};

const actGetRoomList = (locationId) => {
    return (dispatch) => {
        dispatch(actGetRoomListRequest());

        callApi(
            roomApi.getRoomList(locationId),
            (response) => dispatch(actGetRoomListSuccess(response.content)),
            (error) => dispatch(actGetRoomListFail(error)),
        );
    };
};

export {
    actGetRoomList,
    actGetRoomListRequest,
    actGetRoomListSuccess,
    actGetRoomListFail,
    actGetFilteredListRequest,
    actGetFilteredListSuccess,
    actGetFilteredListFail,
};
