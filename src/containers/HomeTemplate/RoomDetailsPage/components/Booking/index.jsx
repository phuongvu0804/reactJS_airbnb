import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";

//Material UI
import { EmojiFlagsOutlined, KeyboardArrowDown } from "@mui/icons-material";
import { Alert, Box, Button, Container, Divider, FormControl, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";

//components
import GuestInputField from "@/containers/HomeTemplate/components/SearchBar/components/GuestInputField";
import BookingModal from "../BookingModal";

//Others
import "./style.scss";
import { actCreateBooking } from "@/store/actions/roomDetails";
import { today } from "../../constants";
import { calculateTotalGuest } from "@/constants";

function Booking({ data }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [checkIn, setCheckIn] = useState(today);
    const [checkOut, setCheckOut] = useState(today);
    const [anchorEl, setAnchorEl] = useState(null);
    const [guestNumber, setGuestNumber] = useState({
        Adults: 0,
        Children: 0,
        Infants: 0,
        Pets: 0,
    });
    const [openModal, setOpenModal] = useState(false);
    const [formErrors, setFormErrors] = useState(null);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const checkValidDate = (date) => {
        return date.setHours(0, 0, 0, 0) >= today._d.setHours(0, 0, 0, 0);
    };

    const checkValidStayTime = (checkInTime, checkOutTime) => {
        return checkInTime._d.setHours(0, 0, 0, 0) <= checkOutTime._d.setHours(0, 0, 0, 0);
    };

    const handleCheckIn = (newValue) => {
        const isValidDate = checkValidDate(newValue._d);
        if (isValidDate) {
            if (checkOut) {
                const isValidCheckIn = checkValidStayTime(newValue, checkOut);

                if (isValidCheckIn) {
                    setFormErrors(null);
                } else {
                    setFormErrors({
                        type: "Invalid check in",
                        content: "Check in date must be the same or ealier than check out time",
                    });
                }
            }
        } else {
            setFormErrors({
                type: "Invalid date",
                content: "Check in date must start from today",
            });
        }

        setCheckIn(newValue);
    };

    const handleCheckOut = (newValue) => {
        setCheckOut(newValue);

        const isValidDate = checkValidDate(newValue._d);
        if (isValidDate) {
            if (checkIn) {
                const isValidCheckOut = checkValidStayTime(checkIn, newValue);

                if (isValidCheckOut) {
                    setFormErrors(null);
                } else {
                    setFormErrors({
                        type: "Invalid check out",
                        content: "Check in date must be the same or later than today",
                    });
                }
            }
        } else {
            setFormErrors({
                type: "Invalid date",
                content: "Check out date must start from today",
            });
        }
    };

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const roomPrice = data.giaTien.toLocaleString("en-US");
    const startDate = moment(checkIn, "YYYY-MM-DD");
    const endDate = moment(checkOut, "YYYY-MM-DD");
    const totalDaysStay = moment.duration(endDate.diff(startDate)).asDays() + 1; //Adjust day calculation to match with Airbnb rule
    const serviceFee = 100000;
    const priceByTotalDays = totalDaysStay * data.giaTien;
    const totalPrice = priceByTotalDays + serviceFee;
    const totalGuest = calculateTotalGuest(guestNumber);

    const handleBooking = () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!formErrors) {
            const bookingData = {
                maPhong: data.id,
                ngayDen: moment(checkIn).format(),
                ngayDi: moment(checkOut).format(),
                maNguoiDung: user.id,
                soLuongKhach: totalGuest,
            };

            if (user) {
                dispatch(actCreateBooking(bookingData));
                navigate("/profile");
            } else {
                navigate("/auth/login");
            }
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? "guest-popover" : undefined;

    return (
        <>
            {/* Booking for PC + tablet */}
            <Box className="room-details__booking">
                <div className="room-details__booking-card">
                    <div className="booking-card__price">
                        <span className="booking-card__price-currency">VND</span>
                        <span className="booking-card__price-number"> {roomPrice}</span>
                        <span className="booking-card__price-time"> /day</span>
                    </div>
                    {formErrors && (
                        <Alert severity="error" sx={{ mb: "20px" }}>
                            {formErrors.content}
                        </Alert>
                    )}
                    <Box className="booking-card__time" sx={{ display: "flex" }}>
                        <FormControl sx={{ mr: "6px", flex: "1" }}>
                            <DesktopDatePicker
                                className="booking-card__check-in"
                                label="Check in"
                                value={checkIn}
                                onChange={handleCheckIn}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </FormControl>
                        <FormControl sx={{ flex: "1" }}>
                            <DesktopDatePicker
                                className="booking-card__check-out"
                                label="Check out"
                                value={checkOut}
                                onChange={handleCheckOut}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </FormControl>
                    </Box>
                    <Box className="booking-card__guests-wrapper">
                        <Box className="booking-card__guests" ia-describedby={id} onClick={handleClick}>
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
                            guestNumber={guestNumber}
                            setGuestNumber={setGuestNumber}
                            onHandleTotalGuest={calculateTotalGuest}
                            totalGuest={totalGuest}
                        />
                    </Box>
                    <Button className="booking-card__btn" onClick={handleBooking}>
                        RESERVE
                    </Button>
                    <div className="booking-card__bill">
                        <div className="booking-card__bill-item">
                            <span className="booking-card__bill-name">
                                VND {roomPrice} x {totalDaysStay} days
                            </span>
                            <div className="booking-card__bill-price">
                                <span className="bill-price__number">{priceByTotalDays.toLocaleString("en-US")}</span>
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
                                <span className="price__number">{totalPrice.toLocaleString("en-US")}</span>
                                <span className="price__currency">VND</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Button className="room-details__booking-report" startIcon={<EmojiFlagsOutlined />}>
                    Report this listing
                </Button>
            </Box>

            {/* Booking for mobile */}
            <Container
                maxWidth="lg"
                className="room-details__booking--mobile"
                sx={{ display: { xs: "block", sm: "none" } }}
            >
                <div>
                    <div className="booking-card__price">
                        <span className="booking-card__price-currency">VND</span>
                        <span className="booking-card__price-number"> {roomPrice}</span>
                        <span className="booking-card__price-time"> /day</span>
                    </div>
                    <div>
                        {moment(checkIn).format("DD/MM/YYYY")} - {moment(checkOut).format("DD/MM/YYYY")}
                    </div>
                </div>

                <Button
                    className="booking-card__btn"
                    onClick={() => {
                        handleOpenModal();
                    }}
                >
                    RESERVE
                </Button>
            </Container>

            <BookingModal
                onOpen={openModal}
                onClose={handleCloseModal}
                data={data}
                serviceFee={serviceFee}
                checkIn={checkIn}
                setCheckIn={setCheckIn}
                checkOut={checkOut}
                setCheckOut={setCheckOut}
                totalDaysStay={totalDaysStay}
                totalGuest={totalGuest}
                guestNumber={guestNumber}
                setGuestNumber={setGuestNumber}
                priceByTotalDays={priceByTotalDays}
                totalPrice={totalPrice}
            />
        </>
    );
}
export default memo(Booking);
