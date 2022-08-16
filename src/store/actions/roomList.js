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

const actGetRoomList = (locationId = "") => {
    return (dispatch) => {
        dispatch(actGetRoomListRequest());

        callApi(
            roomApi.getRoomList(locationId),
            (response) => dispatch(actGetRoomListSuccess(response)),
            (error) => dispatch(actGetRoomListFail(error)),
        );
    };
};

export { actGetRoomList, actGetRoomListSuccess };
