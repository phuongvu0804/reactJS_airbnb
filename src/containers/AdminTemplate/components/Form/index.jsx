import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";

// Material UI
import { Box, Grid, Button, Menu, MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { EditOutlined } from "@mui/icons-material";

// Components
import FormInputs from "../FormInputs";

// Form handler
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Constants
import { FUNCTIONALITY } from "@/constants";

// Date formatter
import moment from "moment";

// Style
import "./style.scss";

const { ADD } = FUNCTIONALITY;

const Form = ({ functionality = ADD, defaultValues, inputs, validator, getRequest, postRequest, putRequest }) => {
    const { id } = useParams();

    /*
     *  Get subpaths
     */
    const { pathname } = useLocation();
    const [rootPage, firstLevelSubpath] = pathname.split("/").slice(1);
    const isUsersPage = firstLevelSubpath === "users";
    const isAddFunctionality = functionality === ADD;

    /*
     *  Handle form
     */
    const { register, control, handleSubmit, setValue, getValues } = useForm({
        reValidateMode: "onSubmit",
        resolver: yupResolver(validator),
        defaultValues,
    });

    /*
     *  if editing user, get user details beforehand
     */
    const { isLoading } = useQuery([`${rootPage}/${functionality.toLowerCase()}`, id], () => getRequest(id), {
        enabled: !isAddFunctionality,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            const user = data.data;

            for (let key in defaultValues) {
                if (key === "birthday") {
                    user[key] = moment(user[key]).format("YYYY-MM-DD");
                }

                setValue(key, user[key]);
            }
        },
    });
    const mutatePhoto = postRequest?.mutatePhoto || (() => {});
    const mutationPhoto = useMutation(mutatePhoto);
    const mutationDetails = useMutation(
        ({ id, details }) => {
            return isAddFunctionality ? postRequest.mutateDetails(details) : putRequest(id, details);
        },
        {
            onSuccess: (data) => {
                if (isAddFunctionality) {
                    return;
                }

                const { _id: id } = data.data;

                let photoKey = "";
                switch (firstLevelSubpath) {
                    case "locations":
                        photoKey = "location";
                        break;
                    case "rooms":
                        photoKey = "room";
                        break;
                    default:
                        break;
                }

                const photoFormData = new FormData();
                photoFormData.append(photoKey, getValues("photo"));
                mutationPhoto.mutate(id, photoFormData);
            },
        },
    );

    /*
     *  Handle upload / remove photo
     */
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleUpdatePhoto = (event) => {
        const photo = event.target.files[0];
        setValue("photo", photo);
        setAnchorEl(null);
    };

    const handleRemovePhoto = () => {
        setValue("photo", null);
        setAnchorEl(null);
    };

    /*
     *  Handle submit
     */
    const handleSubmitData = (value) => {
        const { photo, ...details } = value;
        mutationDetails.mutate({ id, details });
    };

    /*
     *  Render upload photo column
     */
    const uploadPhotoColumn = (
        <div className="right">
            <div className="img-wrapper">
                <img
                    src={
                        getValues("photo")
                            ? URL.createObjectURL(getValues("photo"))
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
                        {...register("photo")}
                        id="upload-photo"
                        type="file"
                        style={{ display: "none" }}
                        accept="image/png, image/jpeg"
                        onChange={handleUpdatePhoto}
                    />
                    <MenuItem
                        className="menu-handle-img__item"
                        onClick={handleRemovePhoto}
                        disabled={!getValues("photo")}
                    >
                        Remove photo
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );

    return (
        <div className="admin-form-container">
            <div className="admin-form-wrapper">
                <Box className="admin-form" component="form" noValidate onSubmit={handleSubmit(handleSubmitData)}>
                    <div className="left">
                        <Grid container columns={12} spacing={4}>
                            <FormInputs loading={isLoading} inputs={inputs} control={control} />
                            <Grid item xs={5}>
                                <LoadingButton type="submit" className="btn-submit">
                                    {functionality}
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </div>
                    {!isUsersPage && uploadPhotoColumn}
                </Box>
            </div>
        </div>
    );
};

export default Form;
