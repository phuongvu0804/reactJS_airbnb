import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useQuery, useMutation } from "react-query";

// Material UI
import { Box, Grid, Button, Menu, MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { EditOutlined } from "@mui/icons-material";

// Components
import FormInputs from "../FormInputs";

// Style
import "./style.scss";

const Form = ({ functionality = "add", inputs, getRequest, postRequest, putRequest }) => {
    /*
     *  Get root page name
     */
    const { pathname } = useLocation();
    const rootPage = pathname.split("/")[2];

    /*
     *  if editing user, get user details beforehand
     */
    // const {} = useQuery(`${rootPage}/${functionality}`, getRequest, { enabled: functionality === "edit" });
    // const {} = useMutation(postRequest.e);

    /*
     *  Handle form
     */
    const { control, handleSubmit } = useForm({
        reValidateMode: "onSubmit",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phone: "",
            birthday: "",
            gender: true,
            type: "ADMIN",
            address: "",
        },
    });

    /*
     *  Handle upload / remove photo
     */
    const [file, setFile] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleUploadPhoto = (event) => {
        const photo = event.target.files[0];
        setFile(photo);
        setAnchorEl(null);
    };

    const handleRemovePhoto = () => {
        setAnchorEl(null);
        setFile(null);
    };

    return (
        <div className="admin-form-container">
            <div className="admin-form-wrapper">
                <Box className="admin-form" component="form" noValidate onSubmit={handleSubmit(() => {})}>
                    <div className="left">
                        <Grid container columns={12} spacing={3} justifyContent="space-evenly">
                            <FormInputs inputs={inputs} control={control} />
                            <Grid item xs={5}>
                                <LoadingButton className="btn-submit">{functionality}</LoadingButton>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="right">
                        <div className="img-wrapper">
                            <img
                                src={
                                    file
                                        ? URL.createObjectURL(file)
                                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                }
                                alt=""
                            />
                            <Button
                                id="basic-button"
                                variant="outlined"
                                startIcon={<EditOutlined />}
                                size="small"
                                className="btn-handle-img"
                                aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleClick}
                            >
                                Edit
                            </Button>
                            <Menu
                                id="basic-menu"
                                className="menu-handle-img"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={() => setAnchorEl(null)}
                                MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                }}
                            >
                                <MenuItem component="label" htmlFor="upload-photo" className="menu-handle-img__item">
                                    Upload a photo
                                </MenuItem>
                                <input
                                    id="upload-photo"
                                    type="file"
                                    style={{ display: "none" }}
                                    accept="image/png, image/jpeg"
                                    onChange={handleUploadPhoto}
                                />
                                <MenuItem
                                    className="menu-handle-img__item"
                                    onClick={handleRemovePhoto}
                                    disabled={!file}
                                >
                                    Remove photo
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                </Box>
            </div>
        </div>
    );
};

export default Form;
