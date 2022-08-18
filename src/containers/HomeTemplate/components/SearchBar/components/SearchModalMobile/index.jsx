import { useState } from "react";

//Material UI
import { Modal, Typography, TextField, FormControl, FormLabel, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

//others
import "./style.scss";
import GuestInputField from "../GuestInputField";
import SubmitBtn from "@/components/SubmitBtn";
import CloseBtn from "@/components/CloseBtn";

function SearchModalMobile({ onOpen, onClose, guestNumber, setGuestNumber, searchData, setSearchData, onSubmit }) {
    const [value, setValue] = useState(new Date());
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;
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

    return (
        <Modal
            className="search-modal__bg"
            open={onOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="search-modal" component="form" sx={style} onSubmit={onSubmit}>
                <CloseBtn className="search-modal__closing-btn" onClick={onClose} />
                <Typography className="search-modal__title" id="modal-modal-title" variant="h6" component="h2">
                    Where to?
                </Typography>
                <FormControl className="search-modal__search-item">
                    <TextField
                        className="search-item__input"
                        variant="outlined"
                        placeholder="Search destinations"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        onChange={(e) => setSearchData(e.target.value)}
                        value={searchData}
                    />
                </FormControl>
                <FormControl className="search-modal__search-item">
                    <FormLabel className="search-item__title">When</FormLabel>
                    <MobileDatePicker
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField className="search-item__input" {...params} />}
                    />
                </FormControl>
                <FormControl className="search-modal__search-item">
                    <FormLabel className="search-item__title">Who</FormLabel>
                    <Button className="search-item__text" ia-describedby={id} onClick={handleClick}>
                        Add guests
                    </Button>
                    <GuestInputField
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClick={handleClick}
                        guestNumber={guestNumber}
                        setGuestNumber={setGuestNumber}
                    />
                </FormControl>
                <div className="sub-modal__search-btn">
                    <SubmitBtn startIcon={<SearchIcon />}>Search</SubmitBtn>
                </div>
            </Box>
        </Modal>
    );
}

export default SearchModalMobile;
