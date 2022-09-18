import React from "react";
import { useState } from "react";

//Material UI
import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Input,
    InputLabel,
    Modal,
    OutlinedInput,
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

function ProfileModal({ open, handleClose }) {
    const [serverResponse, setServerResponse] = useState(null);
    const [birthday, setBirthday] = useState(null);

    const handleBirthday = (newValue) => {
        setBirthday(newValue);
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box id="profile-modal">
                <CloseBtn onClick={handleClose} />
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ my: "14px" }}>
                    Edit profile
                </Typography>
                {/* {serverResponse && (
                    <Alert severity={serverResponse.type} sx={{ mb: "10px" }}>
                        {serverResponse.content}
                    </Alert>
                )} */}
                {/* sx={{ display: "flex", flexDirection: "column" }} */}
                <Grid container spacing={2} component="form">
                    <Grid item xs={12} md={12} lg={6}>
                        <FormControl fullWidth className="profile-modal__input-group">
                            <FormLabel htmlFor="userName">Name</FormLabel>
                            <TextField variant="outlined" id="userName" name="userName" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6}>
                        <FormControl fullWidth className="profile-modal__input-group">
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField variant="outlined" id="email" name="email" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6}>
                        <FormControl fullWidth className="profile-modal__input-group">
                            <FormLabel htmlFor="phone">Phone number</FormLabel>
                            <TextField variant="outlined" id="phone" name="phone" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6}>
                        <FormControl fullWidth className="profile-modal__input-group">
                            <FormLabel htmlFor="address">Address</FormLabel>
                            <TextField variant="outlined" id="address" name="address" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6}>
                        <FormControl fullWidth className="profile-modal__input-group">
                            <FormLabel htmlFor="birthday">Date of birth</FormLabel>
                            <DesktopDatePicker
                                id="birthday"
                                name="birthday"
                                value={birthday}
                                onChange={handleBirthday}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6}>
                        <FormControl fullWidth className="profile-modal__input-group">
                            <FormLabel htmlFor="gender">Gender</FormLabel>
                            <RadioGroup id="gender" name="gender">
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item md={12} sx={{ display: "flex", justifyContent: "right" }}>
                        <SubmitBtn className="edit-modal__submit-btn" sx={{ width: "25%" }}>
                            Save
                        </SubmitBtn>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}

export default ProfileModal;
