import React from "react";

//Material UI
import Image from "@/components/Image";
import { Button, Container, Divider, FormControl, Grid, Popover, TextField } from "@mui/material";

//others
import "./style.scss";
import { Box } from "@mui/system";
import {
    ArrowForwardIos,
    Bathtub,
    ChatOutlined,
    DoorFrontOutlined,
    EmojiFlagsOutlined,
    FavoriteBorder,
    Fireplace,
    IosShare,
    KeyboardArrowDown,
    LocationCityOutlined,
    PinDropOutlined,
    Tv,
    Wifi,
} from "@mui/icons-material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import GuestInputField from "../components/SearchBar/components/GuestInputField";
import { useState } from "react";
import { settings } from "../components/SearchBar/components/GuestInputField/constants";

function RoomDetailsPage() {
    const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [guestNumber, setGuestNumber] = useState({
        Adults: 0,
        Children: 0,
        Infants: 0,
        Pets: 0,
    });

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <div id="room-details-page">
            <Container maxWidth="lg">
                <h3 className="page__main-title room-details__title">Unique stay at Amsterdam The Crane by YAYS</h3>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p className="room-details__location">Amsterdam, BH, Netherlands</p>
                    <div>
                        <Button className="room-details__btn">
                            <IosShare />
                            Share
                        </Button>
                        <Button className="room-details__btn">
                            <FavoriteBorder />
                            Save
                        </Button>
                    </div>
                </Box>
                <div className="room-details__img">
                    <Image
                        src="https://a0.muscache.com/im/pictures/22f86e64-0d34-4237-b47c-d41aff588de0.jpg?im_w=1200"
                        alt=""
                    />
                </div>
                <Box sx={{ display: "flex" }}>
                    <div className="room-details__content">
                        <ul className="room-details__summary">
                            <li className="room-details__summary-item">2 guests</li>
                            <li className="room-details__summary-item">1 bedroom</li>
                            <li className="room-details__summary-item">1 bath</li>
                        </ul>

                        <Divider />
                        <ul className="room-details__rule-list">
                            <li className="room-details__rule-item">
                                <DoorFrontOutlined className="rule-item__icon" />
                                <div className="rule-item__content">
                                    <h6 className="rule-item__title">Self check-in</h6>
                                    <p className="rule-item__text">You can check in with the doorman.</p>
                                </div>
                            </li>
                            <li className="room-details__rule-item">
                                <PinDropOutlined className="rule-item__icon" />
                                <div className="rule-item__content">
                                    <h6 className="rule-item__title">Great location</h6>
                                    <p className="rule-item__text">
                                        100% of recent guests gave the location a 5-star rating.
                                    </p>
                                </div>
                            </li>
                            <li className="room-details__rule-item">
                                <ChatOutlined className="rule-item__icon" />
                                <div className="rule-item__content">
                                    <h6 className="rule-item__title">Great communication</h6>
                                    <p className="rule-item__text">
                                        93% of recent guests rated Amsterdam The Crane By YAYS 5-star in communication.
                                    </p>
                                </div>
                            </li>
                        </ul>
                        <Divider />

                        <div className="room-details__desc">
                            <p>
                                As if sleeping in a converted crane isn’t exceptional enough, the interior of this
                                one-of-a-kind three-storey apartment makes your stay even more special. From the
                                spectacular views over the IJ river to the luxury bathroom and kitchen, it’s the perfect
                                hideout to escape the buzz of the city.
                            </p>
                            <Button className="desc__show-btn" variant="text">
                                Show more
                                <ArrowForwardIos />
                            </Button>
                        </div>
                        <Divider />

                        <div className="room-details__amenities">
                            <h5 className="amenities__title">What this place offers</h5>
                            <div className="amenities__item">
                                <Wifi className="amenities__icon" />
                                <p className="amenities__name">Wifi</p>
                            </div>
                            <div className="amenities__item">
                                <Bathtub className="amenities__icon" />
                                <p className="amenities__name">Bathtub</p>
                            </div>
                            <div className="amenities__item">
                                <Tv className="amenities__icon" />
                                <p className="amenities__name">HDTV</p>
                            </div>
                            <div className="amenities__item">
                                <Fireplace className="amenities__icon" />
                                <p className="amenities__name">Fireplace</p>
                            </div>
                            <Button className="amenities__show-btn" variant="outlined">
                                Show all amenities
                            </Button>
                        </div>
                    </div>
                    <div className="room-details__booking">
                        <div className="room-details__booking-card">
                            <div className="booking-card__price">
                                <span className="booking-card__price-currency">VND</span>
                                <span className="booking-card__price-number"> 553</span>
                                <span className="booking-card__price-time"> night</span>
                            </div>
                            <Box className="booking-card__time" sx={{ display: "flex" }}>
                                <FormControl sx={{ mr: "6px", flex: "1" }}>
                                    <DesktopDatePicker
                                        className="booking-card__check-in"
                                        label="Check in"
                                        inputFormat="MM/dd/yyyy"
                                        value={value}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </FormControl>
                                <FormControl sx={{ flex: "1" }}>
                                    <DesktopDatePicker
                                        className="booking-card__check-out"
                                        label="Check out"
                                        inputFormat="MM/dd/yyyy"
                                        value={value}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </FormControl>
                            </Box>
                            <Box className="booking-card__guests-wrapper">
                                <Box className="booking-card__guests" aria-describedby={id} onClick={handleClick}>
                                    <div>
                                        <h4>GUESTS</h4>
                                        <p>1 guests</p>
                                    </div>
                                    <KeyboardArrowDown />
                                </Box>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "left",
                                    }}
                                >
                                    {/* <GuestInputField /> */}
                                </Popover>
                            </Box>
                            <Button className="booking-card__btn">RESERVE</Button>
                            <div className="booking-card__bill">
                                <div className="booking-card__bill-item">
                                    <span className="booking-card__bill-name">€ 553 x 5 nights</span>
                                    <div className="booking-card__bill-price">
                                        <span className="bill-price__number">2,763</span>
                                        <span className="bill-price__currency">VND</span>
                                    </div>
                                </div>
                                <div className="booking-card__bill-item">
                                    <span className="booking-card__bill-name">Service fee</span>
                                    <div className="booking-card__bill-price">
                                        <span className="bill-price__number">0</span>
                                        <span className="bill-price__currency">VND</span>
                                    </div>
                                </div>
                                <Divider sx={{ mt: "20px" }} />
                                <div className="booking-card__bill-summary">
                                    <span className="bill-summary__name">Total</span>
                                    <div className="bill-summary__price">
                                        <span className="price__number">2,763</span>
                                        <span className="price__currency">VND</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button className="room-details__booking-report" startIcon={<EmojiFlagsOutlined />}>
                            Report this listing
                        </Button>
                    </div>
                </Box>
                <Divider />
                <div className="room-review">
                    <h4 className="room-review__total-review">17 reviews</h4>
                    <Grid container spacing={2} className="room-review__list">
                        <Grid item md={6} container className="room-review__review-card">
                            <div className="review-card__top">
                                <Image
                                    className="review-card__img"
                                    src="https://a0.muscache.com/im/pictures/user/a0878906-0863-4761-864a-88758ad9e6aa.jpg?im_w=240"
                                />
                                <div>
                                    <h5 className="review-card__name">Mary</h5>
                                    <p className="review-card__date">July 2022</p>
                                </div>
                            </div>
                            <div className="review-card__bottom">
                                <p>
                                    most beautiful view! so interesting and fun such a crazy cool place to spend your
                                    time in amsterdam
                                </p>
                            </div>
                        </Grid>
                        <Grid md={6} className="room-review__review-card">
                            <div className="review-card__top">
                                <Image
                                    className="review-card__img"
                                    src="https://a0.muscache.com/im/pictures/user/a0878906-0863-4761-864a-88758ad9e6aa.jpg?im_w=240"
                                />
                                <div className="review-card__info">
                                    <h5 className="review-card__name">Mary</h5>
                                    <p className="review-card__date">July 2022</p>
                                </div>
                            </div>
                            <div className="review-card__bottom">
                                <p>
                                    most beautiful view! so interesting and fun such a crazy cool place to spend your
                                    time in amsterdam
                                </p>
                            </div>
                        </Grid>
                    </Grid>
                    <Button className="room-review__show-btn" variant="outlined">
                        Show all reviews
                    </Button>
                </div>
            </Container>
        </div>
    );
}

export default RoomDetailsPage;
