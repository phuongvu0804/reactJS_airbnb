import { roomApi } from "@/api";
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

        const fetchRoomList = async () => {
            try {
                const roomList = await roomApi.getRoomList(locationId);
                dispatch(actGetRoomListSuccess(roomList));
            } catch (error) {
                dispatch(actGetRoomListFail(error));
            }
        };

        fetchRoomList();
    };
};

export { actGetRoomList, actGetRoomListSuccess };
