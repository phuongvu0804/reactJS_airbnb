import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

//Material UI
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
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

//components
import SubmitBtn from "@/components/SubmitBtn";

//others
import { filterSchema } from "@/validators";
import { initialValues } from "./constants";
import { actGetLocationList } from "@/store/actions/locationList";
import { actGetRoomListFail, actGetRoomListSuccess, actGetRoomList } from "@/store/actions/roomList";
import { roomApi } from "@/api";
import { callApi } from "@/api/config/request";
import { useNavigate } from "react-router-dom";
import "./style.scss";

function RoomFilterModal({ onOpen, onClose }) {
    const dispatch = useDispatch();
    const searchLocation = useSelector((state) => state.locationList.data);
    let roomList = useSelector((state) => state.roomList.roomList);
    const [roomFilter, setRoomFilter] = useState(initialValues);

    const handleRoomList = () => {
        //Check if location exists
        if (searchLocation && searchLocation?.length !== 0) {
            const locationId = searchLocation[0]._id;

            callApi(
                roomApi.getRoomList(locationId),
                (resp) => {
                    //Check if location has any room
                    if (resp.length !== 0) {
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

    const handleNumericFilter = (key, room) => {
        if (roomFilter[key] !== 0) {
            switch (key) {
                case "minPrice":
                    return room.price >= roomFilter.minPrice;

                case "maxPrice":
                    return room.price >= roomFilter.maxPrice;

                case "totalGuest":
                    return room.guests >= roomFilter.totalGuest;

                case "bedroom":
                    return room.bedRoom >= roomFilter.bedroom;

                case "bathroom":
                    return room.bath >= roomFilter.bathroom;
            }
        }
        return true;
    };

    const handleRoomListFilter = (data) => {
        return data.filter((room) => {
            for (let key in roomFilter) {
                switch (key) {
                    case "minPrice":
                    case "maxPrice":
                    case "totalGuest":
                    case "bedroom":
                    case "bathroom":
                        return handleNumericFilter(key, room);
                    default:
                        return true;
                }
            }
        });
    };

    const { handleSubmit, values, errors, setFieldValue, handleChange, resetForm } = useFormik({
        initialValues: initialValues,
        validationSchema: filterSchema,
        onSubmit: (values) => {
            setRoomFilter(values);
            roomList = handleRoomListFilter(roomList);
            console.log("roomList done", roomList);
        },
    });

    const handleRadioButton = (e) => {
        return setFieldValue(e.target.name, e.target.value);
    };

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
            <Container sx={style} maxWidth="lg" id="filter-modal-content" component="form" onSubmit={handleSubmit}>
                <div className="filter-modal__head">
                    <CloseBtn onClick={onClose} />
                    <h3 className="filter-modal__title">Filters</h3>
                </div>
                <div className="filter-modal__body">
                    <div className="filter-modal__group">
                        <FormLabel className="filter-modal-group__title">Price range</FormLabel>
                        <div className="filter-modal__sub-group-wrapper">
                            <FormControl className="filter-modal__sub-group" error={errors.minPrice ? true : false}>
                                <InputLabel>min price</InputLabel>
                                <OutlinedInput
                                    label="min price"
                                    name="minPrice"
                                    onChange={handleChange}
                                    value={values.minPrice}
                                    className="sub-group__input"
                                    variant="outlined"
                                    startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                                />
                                <FormHelperText sx={{ visibility: errors.minPrice ? "visible" : "hidden" }}>
                                    {errors.minPrice ? errors.minPrice : "error"}
                                </FormHelperText>
                            </FormControl>
                            <span>-</span>
                            <FormControl className="filter-modal__sub-group" error={errors.maxPrice ? true : false}>
                                <InputLabel>max price</InputLabel>
                                <OutlinedInput
                                    label="max price"
                                    name="maxPrice"
                                    onChange={handleChange}
                                    value={values.maxPrice}
                                    className="sub-group__input"
                                    variant="outlined"
                                    startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                                />
                                <FormHelperText sx={{ visibility: errors.maxPrice ? "visible" : "hidden" }}>
                                    {errors.maxPrice ? errors.maxPrice : "error"}
                                </FormHelperText>
                            </FormControl>
                        </div>
                    </div>
                    <FormControl className="filter-modal__group" error={errors.totalGuest ? true : false}>
                        <FormLabel className="filter-modal-group__title">Number of guests</FormLabel>
                        <OutlinedInput
                            className="filter-modal-group__input"
                            name="totalGuest"
                            onChange={handleChange}
                            value={values.totalGuest}
                            variant="outlined"
                        />
                        <FormHelperText sx={{ visibility: errors.totalGuest ? "visible" : "hidden" }}>
                            {errors.totalGuest ? errors.totalGuest : "error"}
                        </FormHelperText>
                    </FormControl>
                    <div className="filter-modal__group">
                        <h4 className="filter-modal-group__title">Rooms and beds</h4>
                        <FormControl className="filter-modal__sub-group" sx={{ marginBottom: "10px" }}>
                            <FormLabel className="sub-group__title">Bedrooms</FormLabel>
                            <RadioGroup
                                name="bedroom"
                                row
                                className="sub-group__input-wrapper"
                                onChange={handleRadioButton}
                                value={values.bedroom || "Any"}
                            >
                                <FormControlLabel
                                    name="bedroom"
                                    className="sub-group__input"
                                    label="Any"
                                    value="0"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    name="bedroom"
                                    className="sub-group__input"
                                    label="1"
                                    value="1"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    name="bedroom"
                                    className="sub-group__input"
                                    label="2"
                                    value="2"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    name="bedroom"
                                    className="sub-group__input"
                                    label="3"
                                    value="3"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    name="bedroom"
                                    className="sub-group__input"
                                    label="4"
                                    value="4"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    name="bedroom"
                                    className="sub-group__input"
                                    label="5"
                                    value="5"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    name="bedroom"
                                    className="sub-group__input"
                                    label="6"
                                    value="6"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    name="bedroom"
                                    className="sub-group__input"
                                    label="7"
                                    value="7"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    name="bedroom"
                                    className="sub-group__input"
                                    label="8+"
                                    value="8+"
                                    control={<Radio />}
                                />
                            </RadioGroup>
                        </FormControl>
                        <FormControl className="filter-modal__sub-group">
                            <FormLabel className="sub-group__title">Bathrooms</FormLabel>
                            <RadioGroup
                                row
                                className="sub-group__input-wrapper"
                                name="bathroom"
                                onChange={handleRadioButton}
                                value={values.bathroom || "Any"}
                            >
                                <FormControlLabel
                                    className="sub-group__input"
                                    label="Any"
                                    value="0"
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
                                <FormControlLabel
                                    name="wifi"
                                    onChange={handleChange}
                                    checked={values.wifi}
                                    className="sub-group__input"
                                    control={<Checkbox />}
                                    label="Wifi"
                                />
                                <FormControlLabel
                                    name="hotTub"
                                    onChange={handleChange}
                                    checked={values.hotTub}
                                    className="sub-group__input"
                                    control={<Checkbox />}
                                    label="Hot tub"
                                />
                                <FormControlLabel
                                    name="pool"
                                    onChange={handleChange}
                                    checked={values.pool}
                                    className="sub-group__input"
                                    control={<Checkbox />}
                                    label="Pool"
                                />
                                <FormControlLabel
                                    name="dryer"
                                    onChange={handleChange}
                                    checked={values.dryer}
                                    className="sub-group__input"
                                    control={<Checkbox />}
                                    label="Dryer"
                                />
                                <FormControlLabel
                                    name="heating"
                                    onChange={handleChange}
                                    checked={values.heating}
                                    className="sub-group__input"
                                    control={<Checkbox />}
                                    label="Heating"
                                />
                                <FormControlLabel
                                    name="cableTV"
                                    onChange={handleChange}
                                    checked={values.cableTV}
                                    className="sub-group__input"
                                    control={<Checkbox />}
                                    label="Cable TV"
                                />
                                <FormControlLabel
                                    name="fireplace"
                                    onChange={handleChange}
                                    checked={values.fireplace}
                                    className="sub-group__input"
                                    control={<Checkbox />}
                                    label="Fireplace"
                                />
                            </div>
                        </FormControl>
                        <FormControl className="filter-modal__sub-group">
                            <FormLabel className="sub-group__title">Features</FormLabel>
                            <div>
                                <FormControlLabel
                                    name="gym"
                                    onChange={handleChange}
                                    checked={values.gym}
                                    className="sub-group__input"
                                    control={<Checkbox />}
                                    label="Gym"
                                />
                                <FormControlLabel
                                    name="elevator"
                                    onChange={handleChange}
                                    checked={values.elevator}
                                    className="sub-group__input"
                                    control={<Checkbox />}
                                    label="Elevator"
                                />
                            </div>
                        </FormControl>
                    </div>
                </div>
                <div className="filter-modal__foot">
                    <Button className="filter-modal__btn filter-modal__btn--clear" variant="text" onClick={resetForm}>
                        Clear All
                    </Button>
                    <SubmitBtn className="filter-modal__btn filter-modal__btn--search">Show</SubmitBtn>
                </div>
            </Container>
        </Modal>
    );
}

export default RoomFilterModal;
