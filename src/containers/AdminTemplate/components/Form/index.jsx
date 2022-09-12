import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { useDispatch } from "react-redux";

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

// Redux actions
import { actOpenModal } from "@/store/actions/admin";

// Style
import "./style.scss";

const { ADD, EDIT } = FUNCTIONALITY;

const Form = ({ functionality = ADD, defaultValues, columns, validator, getRequest, postRequest, putRequest }) => {
    const { id } = useParams();
    const dispatch = useDispatch();

    /*
     *  Get subpaths
     */
    const { pathname } = useLocation();
    const [rootPage, firstLevelSubpath] = pathname.split("/").slice(1);
    const isUsersPage = firstLevelSubpath === "users";

    /*
     *  Handle form
     */
    const { register, control, handleSubmit, setValue, getValues } = useForm({
        reValidateMode: "onSubmit",
        resolver: yupResolver(validator),
        defaultValues,
    });

    /*
     *  If editing details, get details beforehand
     */
    const { isLoading } = useQuery([`${rootPage}/${functionality.toLowerCase()}`, id], () => getRequest(id), {
        enabled: functionality === EDIT,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            const details = data.data;

            for (let key in defaultValues) {
                if (key === "birthday") {
                    details[key] = moment(details[key]).format("YYYY-MM-DD");
                }

                setValue(key, details[key]);
            }
        },
    });
    const mutationPhoto = useMutation(
        ({ id, photoFormData }) => {
            if (!postRequest?.mutatePhoto) {
                return () => {};
            }

            postRequest.mutatePhoto(id, photoFormData);
        },
        {
            onSuccess: () => {
                dispatch(actOpenModal(`${functionality} ${firstLevelSubpath.slice(0, -1)} successfully!`));
            },
        },
    );
    const mutationDetails = useMutation(
        ({ id, details }) => {
            return functionality === ADD ? postRequest.mutateDetails(details) : putRequest(id, details);
        },
        {
            onSuccess: (data) => {
                if (!getValues("image") || typeof getValues("image") === "string") {
                    dispatch(actOpenModal(`${functionality} ${firstLevelSubpath.slice(0, -1)} successfully!`));
                    return;
                }

                const id = data.data._id;

                const photoKey = firstLevelSubpath.slice(0, -1);

                const photoFormData = new FormData();
                photoFormData.append(photoKey, getValues("image"));
                mutationPhoto.mutate({ id, photoFormData });
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
        const image = event.target.files[0];
        setValue("image", image);
        setAnchorEl(null);
    };

    const handleDisplayPhoto = () => {
        if (!getValues("image")) {
            return "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg";
        }

        if (typeof getValues("image") === "string") {
            return getValues("image");
        }

        return URL.createObjectURL(getValues("image"));
    };

    const handleRemovePhoto = () => {
        setValue("image", null);
        setAnchorEl(null);
    };

    /*
     *  Handle submit
     */
    const handleSubmitData = (value) => {
        const { image, ...details } = value;
        mutationDetails.mutate({ id, details });
    };

    /*
     *  Render upload image column
     */
    const uploadPhotoColumn = (
        <div className="right">
            <div className="img-wrapper">
                <img src={handleDisplayPhoto()} alt="image" />
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
                        {...register("image")}
                        id="upload-photo"
                        type="file"
                        style={{ display: "none" }}
                        accept="image/png, image/jpeg"
                        onChange={handleUpdatePhoto}
                    />
                    <MenuItem
                        className="menu-handle-img__item"
                        onClick={handleRemovePhoto}
                        disabled={!getValues("image")}
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
                            <FormInputs loading={isLoading} columns={columns} control={control} />
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
