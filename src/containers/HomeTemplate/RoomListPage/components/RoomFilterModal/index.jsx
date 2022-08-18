import React from "react";

//Material UI
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    Input,
    InputAdornment,
    InputLabel,
    Modal,
    OutlinedInput,
    Radio,
    RadioGroup,
} from "@mui/material";
import { Container } from "@mui/system";
import CloseBtn from "@/components/CloseBtn";

//others
import "./style.scss";

function RoomFilterModal({ onOpen, onClose }) {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "var(--white)",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={onOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="room-list__filter-modal"
        >
            <Container sx={style} maxWidth="lg" id="filter-modal-content">
                <div className="filter-modal__head">
                    <CloseBtn onClick={onClose} />
                    <h3 className="filter-modal__title">Filters</h3>
                </div>
                <div className="filter-modal__body">
                    <div className="filter-modal__group">
                        <FormLabel className="filter-modal-group__title">Price range</FormLabel>
                        <div className="filter-modal__sub-group-wrapper">
                            <FormControl className="filter-modal__sub-group">
                                <InputLabel>min price</InputLabel>
                                <OutlinedInput
                                    label="min price"
                                    className="sub-group__input"
                                    variant="outlined"
                                    startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                                />
                            </FormControl>
                            <span>-</span>
                            <FormControl className="filter-modal__sub-group">
                                <InputLabel>max price</InputLabel>
                                <OutlinedInput
                                    label="max price"
                                    className="sub-group__input"
                                    variant="outlined"
                                    startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                                />
                            </FormControl>
                        </div>
                    </div>
                    <FormControl className="filter-modal__group">
                        <FormLabel className="filter-modal-group__title">Number of guests</FormLabel>
                        <OutlinedInput className="filter-modal-group__input" variant="outlined" />
                    </FormControl>
                    <div className="filter-modal__group">
                        <h4 className="filter-modal-group__title">Rooms and beds</h4>
                        <FormControl className="filter-modal__sub-group" sx={{ marginBottom: "10px" }}>
                            <FormLabel className="sub-group__title">Bedrooms</FormLabel>
                            <RadioGroup row className="sub-group__input-wrapper">
                                <FormControlLabel
                                    className="sub-group__input"
                                    label="Any"
                                    value="1"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    className="sub-group__input"
                                    label="1"
                                    value="1"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    className="sub-group__input"
                                    label="2"
                                    value="2"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    className="sub-group__input"
                                    label="3"
                                    value="3"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    className="sub-group__input"
                                    label="4"
                                    value="4"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    className="sub-group__input"
                                    label="5"
                                    value="5"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    className="sub-group__input"
                                    label="6"
                                    value="6"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    className="sub-group__input"
                                    label="7"
                                    value="7"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    className="sub-group__input"
                                    label="8+"
                                    value="8+"
                                    control={<Radio />}
                                />
                            </RadioGroup>
                        </FormControl>
                        <FormControl className="filter-modal__sub-group">
                            <FormLabel className="sub-group__title">Bathrooms</FormLabel>
                            <RadioGroup row className="sub-group__input-wrapper">
                                <FormControlLabel
                                    className="sub-group__input"
                                    label="Any"
                                    value="1"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    className="sub-group__input"
                                    label="1"
                                    value="1"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    className="sub-group__input"
                                    label="2"
                                    value="2"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    className="sub-group__input"
                                    label="3"
                                    value="3"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    className="sub-group__input"
                                    label="4"
                                    value="4"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    className="sub-group__input"
                                    label="5"
                                    value="5"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    className="sub-group__input"
                                    label="6"
                                    value="6"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    className="sub-group__input"
                                    label="7"
                                    value="7"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    className="sub-group__input"
                                    label="8+"
                                    value="8+"
                                    control={<Radio />}
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="filter-modal__group filter-modal__group--amenities">
                        <h4 className="filter-modal-group__title">Amenities</h4>
                        <FormControl className="filter-modal__sub-group" sx={{ marginBottom: "10px" }}>
                            <FormLabel className="sub-group__title">Essentials</FormLabel>
                            <div>
                                <FormControlLabel className="sub-group__input" control={<Checkbox />} label="Wifi" />
                                <FormControlLabel className="sub-group__input" control={<Checkbox />} label="Hot tub" />
                                <FormControlLabel className="sub-group__input" control={<Checkbox />} label="Pool" />
                                <FormControlLabel className="sub-group__input" control={<Checkbox />} label="Dryer" />
                                <FormControlLabel className="sub-group__input" control={<Checkbox />} label="Heating" />
                                <FormControlLabel
                                    className="sub-group__input"
                                    control={<Checkbox />}
                                    label="Cable TV"
                                />
                                <FormControlLabel
                                    className="sub-group__input"
                                    control={<Checkbox />}
                                    label="Fireplace"
                                />
                            </div>
                        </FormControl>
                        <FormControl className="filter-modal__sub-group">
                            <FormLabel className="sub-group__title">Features</FormLabel>
                            <div>
                                <FormControlLabel className="sub-group__input" control={<Checkbox />} label="Gym" />
                                <FormControlLabel
                                    className="sub-group__input"
                                    control={<Checkbox />}
                                    label="Elevator"
                                />
                            </div>
                        </FormControl>
                    </div>
                </div>
                <div className="filter-modal__foot">
                    <Button className="filter-modal__btn filter-modal__btn--clear" variant="text">
                        Clear All
                    </Button>
                    <Button className="filter-modal__btn filter-modal__btn--search" variant="contained">
                        Show
                    </Button>
                </div>
            </Container>
        </Modal>
    );
}

export default RoomFilterModal;
