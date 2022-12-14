import moment from "moment";
import React from "react";
import { useState } from "react";

//Material UI
import { Alert, FormControl, Modal, TextField, Typography } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Box } from "@mui/system";

//components
import CloseBtn from "@/components/CloseBtn";
import SubmitBtn from "@/components/SubmitBtn";

//Others
import { ticketApi } from "@/api";
import { callApi } from "@/api/config/request";
import { modalStyle } from "./constants";
import "./style.scss";

function EditModal({ onOpen, onClose, data, toastMsg, setToastMsg }) {
    const [checkIn, setCheckIn] = useState(data?.data.checkIn);
    const [checkOut, setCheckOut] = useState(data?.data.checkOut);
    const [serverResponse, setServerResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCloseModal = () => {
        if (serverResponse) {
            setServerResponse(null);
        }

        setCheckIn(data?.data.checkIn);
        setCheckOut(data?.data.checkOut);
        onClose();
    };

    const handleCheckIn = (newValue) => {
        setCheckIn(newValue);
    };

    const handleCheckOut = (newValue) => {
        setCheckOut(newValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        const submitData = {
            checkIn: moment(checkIn).format(),
            checkOut: moment(checkOut).format(),
            userId: data?.data.userId._id,
            roomId: data?.data.roomId._id,
        };

        callApi(
            ticketApi.editTicket(data.data._id, submitData),
            (response) => {
                setToastMsg([
                    ...toastMsg,
                    {
                        type: "success",
                        content: "Your have updated successfully!",
                    },
                ]);

                setLoading(false);

                handleCloseModal();
            },
            (error) => {
                setToastMsg([
                    ...toastMsg,
                    {
                        type: "error",
                        content: error || "Sorry, there was an error from the serve",
                    },
                ]);
            },
        );
    };

    return (
        <Modal open={onOpen} onClose={handleCloseModal}>
            <Box sx={modalStyle}>
                <CloseBtn className="edit-modal__close-btn" onClick={handleCloseModal} />
                <Typography variant="h6" component="h2" sx={{ my: "14px" }}>
                    Edit booking
                </Typography>
                {serverResponse && (
                    <Alert severity={serverResponse.type} sx={{ mb: "10px" }}>
                        {serverResponse.content}
                    </Alert>
                )}
                <Box className="edit-modal__content" component="form">
                    <FormControl className="edit-modal__input-group">
                        <DesktopDatePicker
                            className="booking-card__check-in"
                            label="Check in"
                            value={checkIn || data?.data.checkIn}
                            onChange={handleCheckIn}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </FormControl>
                    <FormControl className="edit-modal__input-group">
                        <DesktopDatePicker
                            className="booking-card__check-out"
                            label="Check out"
                            value={checkOut || data?.data.checkOut}
                            onChange={handleCheckOut}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </FormControl>
                    <SubmitBtn
                        type="submit"
                        className="edit-modal__submit-btn"
                        onClick={handleSubmit}
                        loading={loading}
                    >
                        Save
                    </SubmitBtn>
                </Box>
            </Box>
        </Modal>
    );
}

export default EditModal;
