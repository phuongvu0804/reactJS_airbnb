import { reviewApi, roomApi } from "@/api";
import { callApi } from "@/api/config/request";
import * as actTypes from "../constants/roomDetails";

const actGetRoomDetailsRequest = () => {
    return {
        type: actTypes.GET_ROOM_DETAILS_REQUEST,
    };
};

const actGetRoomDetailsSuccess = (data) => {
    return {
        type: actTypes.GET_ROOM_DETAILS_SUCCESS,
        payload: data,
    };
};

const actGetRoomDetailsFail = (error) => {
    return {
        type: actTypes.GET_ROOM_DETAILS_FAIL,
        payload: error,
    };
};

const actGetRoomReviewRequest = () => {
    return {
        type: actTypes.GET_ROOM_REVIEW_REQUEST,
    };
};

const actGetRoomReviewSuccess = (data) => {
    return {
        type: actTypes.GET_ROOM_REVIEW_SUCCESS,
        payload: data,
    };
};

const actGetRoomReviewFail = (error) => {
    return {
        type: actTypes.GET_ROOM_REVIEW_FAIL,
        payload: error,
    };
};

const actCreateBookingRequest = () => {
    return {
        type: actTypes.CREATE_BOOKING_REQUEST,
    };
};

const actCreateBookingSuccess = (data) => {
    return {
        type: actTypes.CREATE_BOOKING_SUCCESS,
        payload: data,
    };
};

const actCreateBookingFail = (error) => {
    return {
        type: actTypes.CREATE_BOOKING_FAIL,
        payload: error,
    };
};

const actCreateSaveRequest = () => {
    return {
        type: actTypes.CREATE_SAVE_REQUEST,
    };
};

const actCreateSaveSuccess = (data) => {
    return {
        type: actTypes.CREATE_SAVE_SUCCESS,
        payload: data,
    };
};

const actCreateSaveFail = (error) => {
    return {
        type: actTypes.CREATE_SAVE_FAIL,
        payload: error,
    };
};

const actGetRoomDetails = (roomId) => {
    return (dispatch) => {
        dispatch(actGetRoomDetailsRequest());

        callApi(
            roomApi.getRoomDetails(roomId),
            (response) => dispatch(actGetRoomDetailsSuccess(response.content)),
            (error) => dispatch(actGetRoomDetailsFail(error)),
        );
    };
};

const actGetRoomReview = (roomId) => {
    return (dispatch) => {
        dispatch(actGetRoomReviewRequest());

        callApi(
            reviewApi.getReviewListByRoom(),
            (response) => {
                let arrComment = [...response.content];

                let arrCommentId = arrComment.filter((item) => {
                    return item.maPhong == roomId;
                });
                dispatch(actGetRoomReviewSuccess(arrCommentId));
            },
            (error) => dispatch(actGetRoomReviewFail(error)),
        );
    };
};

const actCreateBooking = (data) => {
    return (dispatch) => {
        dispatch(actCreateBookingRequest());

        callApi(
            roomApi.createBooking(data),
            (response) => dispatch(actCreateBookingSuccess(response)),
            (error) => dispatch(actCreateBookingFail(error)),
        );
    };
};

const actCreateSave = (data) => {
    return (dispatch) => {
        dispatch(actCreateSaveRequest());

        try {
            dispatch(actCreateSaveSuccess(data));
        } catch (error) {
            dispatch(actCreateSaveFail(error));
        }
    };
};

export { actGetRoomDetails, actGetRoomReview, actCreateBooking, actCreateSave, actCreateSaveFail };
