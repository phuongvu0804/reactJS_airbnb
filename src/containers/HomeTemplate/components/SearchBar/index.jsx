import { useState } from "react";

//Material UI
import TextField from "@mui/material/TextField";
import { Box, Divider, FormControl, FormLabel, IconButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Search } from "@mui/icons-material";

import "./style.scss";
import SubmitBtn from "@/components/SubmitBtn";
import SearchModalMobile from "./components/SearchModalMobile";
import GuestInputField from "./components/GuestInputField";

function SearchBar() {
    const searchTabsMobile = ["Anywhere", "Any week", "Add guests"];

    const [openModal, setOpenModal] = useState(false);
    const [checkInTime, setCheckInTime] = useState(new Date());
    const [checkOutTime, setCheckOutTime] = useState(new Date());
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

    const SearchBarPCTablet = () => {
        return (
            <Box className="search-bar-pc-tablet search-bar__form" sx={{ display: { xs: "none", sm: "flex" } }}>
                <Box className="search-bar__input-wrapper" sx={{ flex: 1.2 }}>
                    <FormControl className="search-bar__input-control search-bar__input-control--where">
                        <FormLabel className="search-bar__input-label">Where</FormLabel>
                        <TextField className="search-bar__input" placeholder="Search destinations" variant="outlined" />
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
                    <GuestInputField id={id} open={open} anchorEl={anchorEl} />
                    <SubmitBtn className="seacrh-bar__form-btn" startIcon={<Search />} variant="contained"></SubmitBtn>
                </Box>
            </Box>
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

    return (
        <div className="home-page__search-bar">
            <SearchBarPCTablet />
            <SearchBarMobile onClick={handleOpenModal} />
            <SearchModalMobile
                onOpen={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            />
        </div>
    );
}

export default SearchBar;
