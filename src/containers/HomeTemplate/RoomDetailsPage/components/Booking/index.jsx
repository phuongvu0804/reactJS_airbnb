import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";

//Material UI
import { EmojiFlagsOutlined, KeyboardArrowDown } from "@mui/icons-material";
import { Box, Button, Container, Divider, FormControl, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";

//components
import GuestInputField from "@/containers/HomeTemplate/components/SearchBar/components/GuestInputField";
import BookingModal from "../BookingModal";

//Others
import "./style.scss";
import { actCreateBooking } from "@/store/actions/roomDetails";

function Booking({ data }) {
    const today = new Date();

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

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleCheckIn = (newValue) => {
        setCheckIn(newValue);
    };

    const handleCheckOut = (newValue) => {
        setCheckOut(newValue);
    };

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const calculateTotalGuest = () => {
        let guestTotal = 0;
        for (let guest in guestNumber) {
            guestTotal += guestNumber[guest];
        }
        return guestTotal;
    };

    const roomPrice = data.price.toLocaleString("en-US");
    const startDate = moment(checkIn, "YYYY-MM-DD");
    const endDate = moment(checkOut, "YYYY-MM-DD");
    const totalDaysStay = moment.duration(endDate.diff(startDate)).asDays();
    const serviceFee = 100000;
    const priceByTotalDays = totalDaysStay * data.price;
    const totalPrice = priceByTotalDays + serviceFee;
    const totalGuest = calculateTotalGuest();

    const handleBooking = () => {
        const user = localStorage.getItem("user");
        const bookingData = {
            roomId: data._id,
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
                    <Box className="booking-card__time" sx={{ display: "flex" }}>
                        <FormControl sx={{ mr: "6px", flex: "1" }}>
                            <DesktopDatePicker
                                className="booking-card__check-in"
                                label="Check in"
                                value={checkIn}
                                inputFormat="MM/dd/yyyy"
                                onChange={handleCheckIn}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </FormControl>
                        <FormControl sx={{ flex: "1" }}>
                            <DesktopDatePicker
                                className="booking-card__check-out"
                                label="Check out"
                                value={checkOut}
                                inputFormat="MM/dd/yyyy"
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

export default Booking;
