import { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useFormik } from "formik";

//Material UI
import {
    Alert,
    Box,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    Modal,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";

//Components
import CloseBtn from "@/components/CloseBtn";
import SubmitBtn from "@/components/SubmitBtn";

//Others
import "./style.scss";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { signupSchema } from "@/validators";
import { actGetUserDataSuccess } from "@/store/actions/user";
import { userApi } from "@/api";
import { callApi } from "@/api/config/request";

function ProfileModal({ open, handleClose, userData, serverResponse, setServerResponse }) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const initialValues = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        birthday: userData.birthday,
        gender: userData.gender,
        address: userData.address,
        type: userData.type,
    };

    const { handleSubmit, values, errors, setFieldValue, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: signupSchema,
        onSubmit: (values) => {
            setLoading(true);
            callApi(
                userApi.editUser(userData._id, values),
                (response) => {
                    dispatch(actGetUserDataSuccess(response));
                    setLoading(false);

                    setServerResponse({
                        type: "success",
                        content: "Your profile has been edited",
                    });

                    handleClose();
                },
                (error) => {
                    setServerResponse({
                        type: "error",
                        content: error,
                    });

                    handleClose();
                },
            );
        },
    });

    const handleBirthday = (newValue) => {
        setFieldValue("birthday", moment(newValue).format());
    };

    const handleGenderInput = (e) => {
        switch (e.target.value) {
            case "true":
                setFieldValue(e.target.name, true);
                break;
            case "false":
                setFieldValue(e.target.name, false);
                break;
            case "undefined":
                setFieldValue(e.target.name, undefined);
        }
    };
    return (
        <Modal open={open} onClose={handleClose}>
            <Box id="profile-modal">
                <CloseBtn onClick={handleClose} />
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ my: "14px" }}>
                    Edit profile
                </Typography>
                <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
                    <Grid item xs={12} md={12} lg={6}>
                        <FormControl fullWidth className="profile-modal__input-group">
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <TextField
                                variant="outlined"
                                id="name"
                                name="name"
                                onChange={handleChange}
                                value={values.name}
                            />
                            <FormHelperText>{errors.name && errors.name}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6}>
                        <FormControl fullWidth className="profile-modal__input-group">
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                variant="outlined"
                                id="email"
                                name="email"
                                onChange={handleChange}
                                value={values.email}
                            />
                            <FormHelperText>{errors.email && errors.email}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6}>
                        <FormControl fullWidth className="profile-modal__input-group">
                            <FormLabel htmlFor="phone">Phone number</FormLabel>
                            <TextField
                                variant="outlined"
                                id="phone"
                                name="phone"
                                onChange={handleChange}
                                value={values.phone}
                            />
                            <FormHelperText>{errors.phone && errors.phone}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6}>
                        <FormControl fullWidth className="profile-modal__input-group">
                            <FormLabel htmlFor="address">Address</FormLabel>
                            <TextField
                                variant="outlined"
                                id="address"
                                name="address"
                                onChange={handleChange}
                                value={values.address}
                            />
                            <FormHelperText>{errors.address && errors.address}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6}>
                        <FormControl fullWidth className="profile-modal__input-group">
                            <FormLabel htmlFor="birthday">Date of birth</FormLabel>
                            <DesktopDatePicker
                                id="birthday"
                                name="birthday"
                                value={values.birthday}
                                onChange={handleBirthday}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <FormHelperText>{errors.birthday && errors.birthday}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6}>
                        <FormControl fullWidth className="profile-modal__input-group">
                            <FormLabel htmlFor="gender">Gender</FormLabel>
                            <RadioGroup id="gender" name="gender" onChange={handleGenderInput} value={values.gender}>
                                <FormControlLabel value="false" control={<Radio />} label="Female" />
                                <FormControlLabel value="true" control={<Radio />} label="Male" />
                            </RadioGroup>
                            <FormHelperText>{errors.gender && errors.gender}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item md={12} sx={{ display: "flex", justifyContent: "right" }}>
                        <SubmitBtn
                            loading={loading}
                            type="submit"
                            className="edit-modal__submit-btn"
                            sx={{ width: "25%" }}
                        >
                            Save
                        </SubmitBtn>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}

export default ProfileModal;
