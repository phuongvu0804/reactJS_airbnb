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
import { initialValues, style, radioOptions, checkBoxOptions_essentials, checkBoxOptions_features } from "./constants";
import { actGetFilteredListRequest, actGetFilteredListSuccess } from "@/store/actions/roomList";
import "./style.scss";

function RoomFilterModal({ onOpen, onClose }) {
    const dispatch = useDispatch();
    const roomList = useSelector((state) => state.roomList.roomList);

    const handleRadioOptions = (roomList, roomFilter) => {
        return roomList.filter((room) => {
            return (
                room.price >= roomFilter.minPrice &&
                room.price <= roomFilter.maxPrice &&
                room.guests >= roomFilter.totalGuest &&
                room.bedRoom >= roomFilter.bedroom &&
                room.bath >= roomFilter.bathroom
            );
        });
    };

    const handleCheckBox = (roomList, roomFilter) => {
        const checkBoxOptions = [
            "wifi",
            "hotTub",
            "pool",
            "dryer",
            "heating",
            "cableTV",
            "indoorFireplace",
            "gym",
            "elevator",
        ];

        let allRooms = true;
        for (let key of checkBoxOptions) {
            if (roomFilter[key]) allRooms = false;
        }

        return roomList.filter((room) => {
            if (allRooms) return room;
            for (let key of checkBoxOptions) {
                if (roomFilter[key] === room[key]) return room;
            }
        });
    };

    const handleRoomListFilter = (roomList, roomFilter) => {
        let filteredRooms = [];
        filteredRooms = handleRadioOptions(roomList, roomFilter);
        filteredRooms = handleCheckBox(filteredRooms, roomFilter);

        return filteredRooms;
    };

    const handleGetRoomFiltered = (roomFilter) => {
        //Get room list from redux store
        if (roomList) {
            const filteredList = handleRoomListFilter(roomList, roomFilter);

            //Push filtered list to redux store
            dispatch(actGetFilteredListSuccess(filteredList));
        }
    };

    const { handleSubmit, values, errors, setFieldValue, handleChange, resetForm } = useFormik({
        initialValues: initialValues,
        validationSchema: filterSchema,
        onSubmit: (values) => {
            dispatch(actGetFilteredListRequest());
            handleGetRoomFiltered(values);
            onClose();
        },
    });

    const handleRadioButton = (e) => {
        return setFieldValue(e.target.name, e.target.value);
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
                                value={values.bedroom || "0"}
                            >
                                {radioOptions.map((item, index) => (
                                    <FormControlLabel
                                        key={index}
                                        name="bedroom"
                                        className="sub-group__input"
                                        label={item.label}
                                        value={item.value}
                                        control={<Radio />}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <FormControl className="filter-modal__sub-group">
                            <FormLabel className="sub-group__title">Bathrooms</FormLabel>
                            <RadioGroup
                                row
                                className="sub-group__input-wrapper"
                                name="bathroom"
                                onChange={handleRadioButton}
                                value={values.bathroom || "0"}
                            >
                                {radioOptions.map((item, index) => (
                                    <FormControlLabel
                                        key={index}
                                        name="bathroom"
                                        className="sub-group__input"
                                        label={item.label}
                                        value={item.value}
                                        control={<Radio />}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="filter-modal__group filter-modal__group--amenities">
                        <h4 className="filter-modal-group__title">Amenities</h4>
                        <FormControl className="filter-modal__sub-group" sx={{ marginBottom: "10px" }}>
                            <FormLabel className="sub-group__title">Essentials</FormLabel>
                            <div>
                                {checkBoxOptions_essentials.map((item, index) => (
                                    <FormControlLabel
                                        key={index}
                                        name={item.value}
                                        onChange={handleChange}
                                        checked={values[item.value]}
                                        className="sub-group__input"
                                        control={<Checkbox />}
                                        label={item.label}
                                    />
                                ))}
                            </div>
                        </FormControl>
                        <FormControl className="filter-modal__sub-group">
                            <FormLabel className="sub-group__title">Features</FormLabel>
                            <div>
                                {checkBoxOptions_features.map((item, index) => (
                                    <FormControlLabel
                                        key={index}
                                        name={item.value}
                                        onChange={handleChange}
                                        checked={values[item.value]}
                                        className="sub-group__input"
                                        control={<Checkbox />}
                                        label={item.label}
                                    />
                                ))}
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
