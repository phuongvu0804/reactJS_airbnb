import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Material UI
import TextField from "@mui/material/TextField";
import {
    Box,
    Divider,
    FormControl,
    FormLabel,
    IconButton,
    Modal,
    InputAdornment,
    Typography,
    Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { Search } from "@mui/icons-material";

//Components
import SubmitBtn from "@/components/SubmitBtn";
import SearchModalMobile from "./components/SearchModalMobile";
import GuestInputField from "./components/GuestInputField";
import CloseBtn from "@/components/CloseBtn";

//Others
import "./style.scss";
import { actGetLocationList, actGetLocationListSuccess, actGetLocationListFail } from "@/store/actions/locationList";
import { actGetRoomListFail, actGetRoomListSuccess, actGetRoomList } from "@/store/actions/roomList";
import { locationApi, roomApi } from "@/api";
import { callApi } from "@/api/config/request";
import { useNavigate } from "react-router-dom";

function SearchBar({ searchCategory }) {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "white",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };
    const searchTabsMobile = ["Anywhere", "Any week", "Add guests"];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchLocation = useSelector((state) => state.locationList.data);

    const [openModal, setOpenModal] = useState(false);
    const [checkInTime, setCheckInTime] = useState(new Date());
    const [checkOutTime, setCheckOutTime] = useState(new Date());
    const [value, setValue] = useState(new Date());
    const [searchData, setSearchData] = useState("");
    const [guestNumber, setGuestNumber] = useState({
        Adults: 0,
        Children: 0,
        Infants: 0,
        Pets: 0,
    });

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    const datePickerStyle = {
        height: "1.43rem",
    };

    const handleCloseModal = () => setOpenModal(false);

    const handleOpenModal = () => setOpenModal(true);

    const calculateTotalGuest = () => {
        let guestTotal = 0;
        for (let guest in guestNumber) {
            guestTotal += guestNumber[guest];
        }
        return guestTotal;
    };

    const handleGetRoomByLocation = (locationList) => {
        //Check if location exists
        if (locationList && locationList?.length !== 0) {
            const locationId = locationList[0]._id;

            callApi(
                roomApi.getRoomList(locationId),
                (resp) => {
                    //Check if location has any room
                    if (resp.length !== 0) {
                        const guestTotal = calculateTotalGuest();

                        //Filter rooms by guest number
                        if (guestTotal !== 0) {
                            const filteredResp = resp.filter((room) => room.guests >= guestTotal);

                            //Check if room with filter exists
                            if (filteredResp.length === 0) {
                                return dispatch(actGetRoomListFail("Location has no accomodation satisfied"));
                            }

                            dispatch(actGetRoomListSuccess(filteredResp));
                            navigate("room-list");
                        } else {
                            dispatch(actGetRoomListSuccess(resp));
                            navigate("room-list");
                        }
                    } else {
                        return dispatch(actGetRoomListFail("Location has no accomodation"));
                    }
                },
                (resp) => dispatch(actGetRoomListFail(resp)),
            );
        } else {
            //Navigate to page with no result
            dispatch(actGetRoomListFail("Location doesn't exist"));
        }
    };

    const handleRoomList = () => {
        callApi(
            locationApi.getLocationList(searchData),
            (resp) => {
                dispatch(actGetLocationListSuccess(resp));
                handleGetRoomByLocation(resp);
            },
            (err) => {
                dispatch(actGetLocationListFail(err));
            },
        );
    };

    const SearchBarMobile = ({ onClick }) => {
        return (
            <Box className="search-bar-mobile" sx={{ display: { xs: "block", sm: "none" } }}>
                <IconButton className="search-bar__search-btn" onClick={onClick}>
                    <SearchIcon />
                </IconButton>
                <div className="search-bar__content" onClick={onClick}>
                    <h3 className="search-bar__title">Where to?</h3>
                    <ul className="search-bar__text-wrapper">
                        {searchTabsMobile.map((item, index) => (
                            <li className="search-bar__text" key={index}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <IconButton className="search-bar__filter-btn" onClick={onClick}>
                    <TuneIcon />
                </IconButton>
            </Box>
        );
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchCategory === "Stays") {
            if (searchData === "") {
                dispatch(actGetRoomList());
            } else {
                handleRoomList();
            }
        }
        handleCloseModal();
    };

    return (
        <div className="home-page__search-bar">
            {/* Search for PC + Tablet starts */}
            <Box
                className="search-bar-pc-tablet search-bar__form"
                component="form"
                sx={{ display: { xs: "none", sm: "flex" } }}
                onSubmit={handleSubmit}
            >
                <Box className="search-bar__input-wrapper" sx={{ flex: 1.2 }}>
                    <FormControl className="search-bar__input-control search-bar__input-control--where">
                        <FormLabel className="search-bar__input-label">Where</FormLabel>
                        <TextField
                            className="search-bar__input"
                            placeholder="Search destinations"
                            variant="outlined"
                            value={searchData}
                            onChange={(e) => setSearchData(e.target.value)}
                        />
                    </FormControl>
                </Box>
                <Divider className="search-bar__divider" orientation="vertical" variant="middle" flexItem />
                <Box className="search-bar__input-wrapper" sx={{ flex: 1 }}>
                    <FormControl className="search-bar__input-control search-bar__input-control--where">
                        <FormLabel className="search-bar__input-label">Check in</FormLabel>
                        <DesktopDatePicker
                            value={checkInTime}
                            onChange={(newValue) => {
                                setCheckInTime(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField className="search-bar__input search-bar__input--date-picker" {...params} />
                            )}
                            sx={datePickerStyle}
                        />
                    </FormControl>
                </Box>
                <Divider className="search-bar__divider" orientation="vertical" variant="middle" flexItem />
                <Box className="search-bar__input-wrapper" sx={{ flex: 1 }}>
                    <FormControl className="search-bar__input-control search-bar__input-control--where">
                        <FormLabel className="search-bar__input-label">Check out</FormLabel>
                        <DesktopDatePicker
                            value={checkOutTime}
                            onChange={(newValue) => {
                                setCheckOutTime(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField className="search-bar__input search-bar__input--date-picker" {...params} />
                            )}
                            sx={datePickerStyle}
                        />
                    </FormControl>
                </Box>
                <Divider className="search-bar__divider" orientation="vertical" variant="middle" flexItem />
                <Box className="search-bar__input-wrapper search-bar__input-wrapper--last" sx={{ flex: 1.2 }}>
                    <FormControl
                        className="search-bar__input-control search-bar__input-control--where"
                        ia-describedby={id}
                        onClick={handleClick}
                    >
                        <FormLabel className="search-bar__input-label">Who</FormLabel>
                        <Typography className="search-bar__input-placeholder">Add guests</Typography>
                    </FormControl>
                    <GuestInputField
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        guestNumber={guestNumber}
                        setGuestNumber={setGuestNumber}
                    />
                    <SubmitBtn className="seacrh-bar__form-btn" startIcon={<Search />} variant="contained"></SubmitBtn>
                </Box>
            </Box>
            {/* Search for PC + Tablet ends */}

            <SearchBarMobile onClick={handleOpenModal} />
            <SearchModalMobile
                onOpen={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                guestNumber={guestNumber}
                setGuestNumber={setGuestNumber}
                searchData={searchData}
                setSearchData={setSearchData}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

export default SearchBar;
