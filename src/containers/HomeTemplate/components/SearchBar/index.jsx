import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

//Material UI
import TextField from "@mui/material/TextField";
import { Box, Divider, FormControl, FormLabel, IconButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Search } from "@mui/icons-material";

//Components
import SubmitBtn from "@/components/SubmitBtn";
import SearchModalMobile from "./components/SearchModalMobile";
import GuestInputField from "./components/GuestInputField";

//Others
import "./style.scss";
import { actGetLocationListFail } from "@/store/actions/locationList";
import { actGetRoomListFail, actGetRoomListSuccess, actGetRoomList } from "@/store/actions/roomList";
import { locationApi, roomApi } from "@/api";
import { callApi } from "@/api/config/request";
import { handleFilterResultList, renderPosition, searchTabsMobile } from "./constants";
import { useEffect } from "react";
import { calculateTotalGuest } from "@/constants";

function SearchBar({ searchCategory }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const LOCATION_LIST = useSelector((state) => state.locationList.data);

    const [openModal, setOpenModal] = useState(false);
    const [checkInTime, setCheckInTime] = useState(new Date());
    const [checkOutTime, setCheckOutTime] = useState(new Date());
    const [searchData, setSearchData] = useState("");
    const [guestNumber, setGuestNumber] = useState({
        Adults: 0,
        Children: 0,
        Infants: 0,
        Pets: 0,
    });
    const [anchorEl, setAnchorEl] = useState(null);
    const [resultList, setResultList] = useState([]);
    const [filteredValues, setFilteredValues] = useState({
        locationId: null,
        locationName: null,
        checkInTime: null,
        checkOutTime: null,
        guestNumber: 0,
    });
    const [isActiveSearchResult, setIsActiveSearchResult] = useState(false);

    useEffect(() => {
        handleFilterResultList(searchData, LOCATION_LIST, setResultList);
    }, [searchData]);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setIsActiveSearchResult(false);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    const datePickerStyle = {
        height: "1.43rem",
    };

    const handleCloseModal = () => setOpenModal(false);

    const handleOpenModal = () => setOpenModal(true);

    const handleGetRoomByLocation = (locationId) => {
        callApi(
            roomApi.getRoomList(locationId),
            (resp) => {
                //Check if location has any room
                if (resp.content.length !== 0) {
                    //Filter rooms by guest number
                    if (filteredValues.totalGuest !== 0) {
                        const filteredResp = resp.content.filter((room) => room.guests >= filteredValues.totalGuest);

                        //Check if room with filter exists
                        if (filteredResp.length === 0) {
                            dispatch(actGetRoomListFail("Location has no accomodation satisfied"));
                        } else {
                            dispatch(actGetRoomListSuccess(filteredResp.content));
                        }

                        navigate(`room-list/${locationId}`);
                    } else {
                        dispatch(actGetRoomListSuccess(resp.content));
                        navigate(`room-list/${locationId}`);
                    }
                } else {
                    return dispatch(actGetRoomListFail("Location has no accomodation"));
                }
            },
            (error) => dispatch(actGetRoomListFail(error.content)),
        );
    };

    const handleDispatchRoomList = () => {
        if (searchCategory === "Stays") {
            if (!filteredValues.locationId) {
                dispatch(actGetRoomList(""));
                navigate("room-list");
            } else {
                callApi(
                    locationApi.getLocationList(filteredValues.locationId),
                    (resp) => {
                        handleGetRoomByLocation(filteredValues.locationId);
                    },
                    (err) => {
                        dispatch(actGetLocationListFail(err));
                    },
                );
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("click");
        setIsActiveSearchResult(false);

        const totalGuest = calculateTotalGuest(guestNumber);
        setFilteredValues({
            ...filteredValues,
            totalGuest,
            checkInTime,
            checkOutTime,
        });

        handleDispatchRoomList();

        handleCloseModal();
    };

    const SearchBarMobile = () => {
        return (
            <Box className="search-bar-mobile" sx={{ display: { xs: "block", sm: "none" } }}>
                <IconButton className="search-bar__search-btn" onClick={handleOpenModal}>
                    <SearchIcon />
                </IconButton>
                <div className="search-bar__content" onClick={handleOpenModal}>
                    <h3 className="search-bar__title">Where to?</h3>
                    <ul className="search-bar__text-wrapper">
                        {searchTabsMobile.map((item, index) => (
                            <li className="search-bar__text" key={index}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <IconButton className="search-bar__filter-btn" onClick={handleOpenModal}>
                    <TuneIcon />
                </IconButton>
            </Box>
        );
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
                            onClick={() => setIsActiveSearchResult(true)}
                        />
                    </FormControl>
                    {isActiveSearchResult && (
                        <div className="search-bar__result-list" onClick={() => setIsActiveSearchResult(true)}>
                            {renderPosition(
                                resultList,
                                filteredValues,
                                setFilteredValues,
                                setSearchData,
                                setIsActiveSearchResult,
                            )}
                        </div>
                    )}
                </Box>
                <Divider className="search-bar__divider" orientation="vertical" variant="middle" flexItem />
                <Box className="search-bar__input-wrapper" sx={{ flex: 1 }}>
                    <FormControl
                        className="search-bar__input-control search-bar__input-control--where"
                        onClick={() => setIsActiveSearchResult(false)}
                    >
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
                    <FormControl
                        className="search-bar__input-control search-bar__input-control--where"
                        onClick={() => setIsActiveSearchResult(false)}
                    >
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
                        onHandleTotalGuest={calculateTotalGuest}
                    />
                    <SubmitBtn className="seacrh-bar__form-btn" startIcon={<Search />} variant="contained"></SubmitBtn>
                </Box>
            </Box>
            {/* Search for PC + Tablet ends */}

            <SearchBarMobile />
            <SearchModalMobile
                onOpen={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                guestNumber={guestNumber}
                setGuestNumber={setGuestNumber}
                searchData={searchData}
                setSearchData={setSearchData}
                resultList={resultList}
                setResultList={setResultList}
                filteredValues={filteredValues}
                setFilteredValues={setFilteredValues}
                isActiveSearchResult={isActiveSearchResult}
                setIsActiveSearchResult={setIsActiveSearchResult}
                onHandleTotalGuest={calculateTotalGuest}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

export default SearchBar;
