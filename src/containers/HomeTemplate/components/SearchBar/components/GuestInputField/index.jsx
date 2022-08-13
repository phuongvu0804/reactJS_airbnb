import { useState } from "react";

//Material UI
import {
    Modal,
    Typography,
    TextField,
    FormControl,
    FormLabel,
    InputAdornment,
    Button,
    IconButton,
    Divider,
    Popper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { AddCircleOutlined, Menu, RemoveCircle, RemoveCircleOutlined } from "@mui/icons-material";
import { Box } from "@mui/system";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

//others
import "./style.scss";
import AnimalModal from "../AnimalModal";
import CloseBtn from "@/components/CloseBtn";

function GuestInputField({ id, open, anchorEl, onClick }) {
    const [openAnimalModal, setOpenAnimalModal] = useState(false);
    return (
        <Popper
            id={id}
            className="search-item__sub-modal search-item__sub-modal--guest"
            component="form"
            anchorEl={anchorEl}
            open={open}
        >
            <CloseBtn onClick={onClick} sx={{ display: { xs: "flex", sm: "none" } }} />
            <FormControl className="sub-modal__group" sx={{ display: "flex" }}>
                <div className="group__title">
                    <h4>Adults</h4>
                    <p className="group__sub-text">Ages 13 or above</p>
                </div>
                <div className="group__filter">
                    <IconButton className="group__filter-btn">
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                    <p className="group__filter-number">0</p>
                    <IconButton className="group__filter-btn">
                        <AddCircleOutlineIcon />
                    </IconButton>
                </div>
            </FormControl>
            <Divider />

            <FormControl className="sub-modal__group" sx={{ display: "flex" }}>
                <div className="group__title">
                    <h4>Children</h4>
                    <p className="group__sub-text">Ages 2 - 12</p>
                </div>
                <div className="group__filter">
                    <IconButton className="group__filter-btn">
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                    <p className="group__filter-number">0</p>
                    <IconButton className="group__filter-btn">
                        <AddCircleOutlineIcon />
                    </IconButton>
                </div>
            </FormControl>
            <Divider />
            <FormControl className="sub-modal__group" sx={{ display: "flex" }}>
                <div className="group__title">
                    <h4>Infants</h4>
                    <p className="group__sub-text">Under 2</p>
                </div>
                <div className="group__filter">
                    <IconButton className="group__filter-btn">
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                    <p className="group__filter-number">0</p>
                    <IconButton className="group__filter-btn">
                        <AddCircleOutlineIcon />
                    </IconButton>
                </div>
            </FormControl>
            <Divider />
            <FormControl className="sub-modal__group" sx={{ display: "flex" }}>
                <div className="group__title">
                    <h4>Pets</h4>
                    <Button className="group__sub-text group__sub-text--link" onClick={() => setOpenAnimalModal(true)}>
                        Bringing a service animal ?
                    </Button>
                </div>
                <div className="group__filter">
                    <IconButton className="group__filter-btn">
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                    <p className="group__filter-number">0</p>
                    <IconButton className="group__filter-btn">
                        <AddCircleOutlineIcon />
                    </IconButton>
                </div>
                <AnimalModal onOpen={openAnimalModal} onClose={() => setOpenAnimalModal(false)} />
            </FormControl>
        </Popper>
    );
}

export default GuestInputField;
