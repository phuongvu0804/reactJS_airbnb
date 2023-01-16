import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";

//Material UI
import { Button, Container, Divider, FormControl, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { KeyboardArrowDown } from "@mui/icons-material";
import { DesktopDatePicker } from "@mui/x-date-pickers";

//Components
import CloseBtn from "@/components/CloseBtn";

//others
import { modalStyle, buttonStyle } from "./constants";
import GuestInputField from "@/containers/HomeTemplate/components/SearchBar/components/GuestInputField";
import { actCreateBooking } from "@/store/actions/roomDetails";

function BookingModal({
    onOpen,
    onClose,
    data,
    serviceFee,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    totalDaysStay,
    totalGuest,
    ...others
}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleBooking = () => {
        const user = localStorage.getItem("user");
        const bookingData = {
            roomId: data.id,
            checkIn: moment(checkIn).format(),
            checkOut: moment(checkOut).format(),
        };

        if (user) {
            dispatch(actCreateBooking(bookingData));
            navigate("/profile");
        } else {
            navigate("/auth/login");
        }
    };

    return (
        <Modal
            open={onOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="room-details__booking-modal" sx={modalStyle}>
                <Container maxWidth="lg">
                    <CloseBtn sx={{ padding: "30px 0" }} onClick={onClose} />
                    <Typography
                        className="booking-modal__title"
                        variant="h6"
                        component="h2"
                        sx={{ marginBottom: "20px" }}
                    >
                        Your trip
                    </Typography>

                    <div className="booking-modal__input-wrapper">
                        <Box className="booking-card__time" sx={{ display: "flex" }}>
                            <FormControl sx={{ mr: "6px", flex: "1" }}>
                                <DesktopDatePicker
                                    className="booking-card__check-in"
                                    label="Check in"
                                    inputFormat="MM/dd/yyyy"
                                    value={checkIn}
                                    onChange={setCheckIn}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </FormControl>
                            <FormControl sx={{ flex: "1" }}>
                                <DesktopDatePicker
                                    className="booking-card__check-out"
                                    label="Check out"
                                    inputFormat="MM/dd/yyyy"
                                    value={checkOut}
                                    onChange={setCheckOut}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </FormControl>
                        </Box>
                        <Box className="booking-card__guests-wrapper">
                            <Box className="booking-card__guests" aria-describedby={id} onClick={handleClick}>
                                <div>
                                    <h4>GUESTS</h4>
                                    <p>{totalGuest > 1 ? `${totalGuest} guests` : `${totalGuest} guest`}</p>
                                </div>
                                <KeyboardArrowDown />
                            </Box>
                            <GuestInputField
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClick={handleClose}
                                guestNumber={others.guestNumber}
                                setGuestNumber={others.setGuestNumber}
                                totalGuest={totalGuest}
                            />
                        </Box>
                    </div>
                    <div className="booking-card__bill">
                        <div className="booking-card__bill-item">
                            <span className="booking-card__bill-name">
                                VND {data.giaTien.toLocaleString("en-US")} x {totalDaysStay} days
                            </span>
                            <div className="booking-card__bill-price">
                                <span className="bill-price__number">
                                    {others.priceByTotalDays.toLocaleString("en-US")}
                                </span>
                                <span className="bill-price__currency">VND</span>
                            </div>
                        </div>
                        <div className="booking-card__bill-item">
                            <span className="booking-card__bill-name">Service fee</span>
                            <div className="booking-card__bill-price">
                                <span className="bill-price__number">{serviceFee.toLocaleString("en-US")}</span>
                                <span className="bill-price__currency">VND</span>
                            </div>
                        </div>
                        <Divider sx={{ mt: "20px" }} />
                        <div className="booking-card__bill-summary">
                            <span className="bill-summary__name">Total</span>
                            <div className="bill-summary__price">
                                <span className="price__number">{others.totalPrice.toLocaleString("en-US")}</span>
                                <span className="price__currency">VND</span>
                            </div>
                        </div>
                    </div>
                </Container>
                <Box sx={buttonStyle}>
                    <Button className="booking-card__btn" onClick={handleBooking}>
                        RESERVE
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default BookingModal;
