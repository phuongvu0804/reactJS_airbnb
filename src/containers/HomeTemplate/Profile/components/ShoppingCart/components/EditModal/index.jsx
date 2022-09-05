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

function EditModal({ onOpen, onClose, data }) {
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState();
    const [serverResponse, setServerResponse] = useState(null);

    const handleCloseModal = () => {
        if (serverResponse) {
            setServerResponse(null);
        }

        setCheckIn(data.data.checkIn);
        setCheckOut(data.data.checkOut);
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
        const submitData = {
            checkIn: moment(checkIn).format(),
            checkOut: moment(checkOut).format(),
            userId: data.data.userId._id,
            roomId: data.data.roomId._id,
        };

        callApi(
            ticketApi.editTicket(data.data._id, submitData),
            (response) => {
                setServerResponse({
                    type: "success",
                    content: response,
                });
                onClose();
            },
            (error) => {
                setServerResponse({
                    type: "error",
                    content: error,
                });
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
                            value={checkIn || data.data.checkIn}
                            onChange={handleCheckIn}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </FormControl>
                    <FormControl className="edit-modal__input-group">
                        <DesktopDatePicker
                            className="booking-card__check-out"
                            label="Check out"
                            value={checkOut || data.data.checkOut}
                            onChange={handleCheckOut}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </FormControl>
                    <SubmitBtn className="edit-modal__submit-btn" onSubmit={handleSubmit}>
                        Save
                    </SubmitBtn>
                </Box>
            </Box>
        </Modal>
    );
}

export default EditModal;
