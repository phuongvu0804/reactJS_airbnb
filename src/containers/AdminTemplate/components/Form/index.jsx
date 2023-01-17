import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { useDispatch } from "react-redux";

// Material UI
import { Box, Grid, Button, Menu, MenuItem, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { EditOutlined } from "@mui/icons-material";

// Components
import FormInputs from "../FormInputs";

// Form handler
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Constants
import { FUNCTIONALITY } from "@/constants";
import { facilityOptions } from "../../RoomManagementPage/formColumns";

// Date formatter
import moment from "moment";

// Redux actions
import { actOpenModal } from "@/store/actions/admin";

// Style
import "./style.scss";

const { ADD, EDIT, DETAILS } = FUNCTIONALITY;

const Form = ({
    functionality = ADD,
    defaultValues,
    columns,
    validator,
    getRequest = () => {},
    postRequest = () => {},
    putRequest = {
        mutateDetails: () => {},
        mutatePhoto: () => {},
    },
}) => {
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
        resolver: validator && yupResolver(validator),
        defaultValues,
    });

    /*
     *  If editing details, get details beforehand
     */
    const { isLoading } = useQuery(
        [`${rootPage}/${firstLevelSubpath}/${functionality.toLowerCase()}`, id],
        () => getRequest(id),
        {
            enabled: functionality !== ADD,
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                const details = data?.data?.content;

                for (const key in defaultValues) {
                    if (key === "birthday") {
                        details[key] = moment(details[key]).format("YYYY-MM-DD");
                    }

                    if (key === "facilities") {
                        details[key] = facilityOptions.filter((option) => details[option.title]);
                    }

                    if (key === "locationId") {
                        continue;
                    }

                    setValue(key, details[key]);
                }
            },
        },
    );

    const mutationPhoto = useMutation(
        ({ id, photoFormData }) => {
            return postRequest.mutatePhoto(id, photoFormData);
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
                if (!getValues("hinhAnh") || typeof getValues("hinhAnh") === "string") {
                    dispatch(actOpenModal(`${functionality} ${firstLevelSubpath.slice(0, -1)} successfully!`));
                    return;
                }

                const id = data.data?.content?.id;

                const photoKey = firstLevelSubpath.slice(0, -1);

                const photoFormData = new FormData();
                photoFormData.append(photoKey, getValues("hinhAnh"));
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
        setValue("hinhAnh", image);
        setAnchorEl(null);
    };

    const handleDisplayPhoto = () => {
        if (!getValues("hinhAnh")) {
            return "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg";
        }

        if (typeof getValues("hinhAnh") === "string") {
            return getValues("hinhAnh");
        }

        return URL.createObjectURL(getValues("hinhAnh"));
    };

    const handleRemovePhoto = () => {
        setValue("hinhAnh", null);
        setAnchorEl(null);
    };

    /*
     *  Handle submit
     */
    const handleSubmitData = (value) => {
        let { hinhAnh, facilities, ...details } = value;

        // Convert facilities array to object
        if (facilities) {
            const facilityObj = {};
            for (const facility of facilities) {
                facilityObj[facility.title] = true;
            }
            details = { ...details, ...facilityObj };
        }

        mutationDetails.mutate({ id, details });
    };

    /*
     *  Render upload image column
     */
    const uploadPhotoColumn = (
        <div className="right">
            <div className="img-wrapper">
                <img src={handleDisplayPhoto()} className={functionality === DETAILS ? "details" : undefined} alt="" />
                {functionality !== DETAILS && (
                    <>
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
                                {...register("hinhAnh")}
                                id="upload-photo"
                                type="file"
                                style={{ display: "none" }}
                                accept="image/png, image/jpeg"
                                onChange={handleUpdatePhoto}
                            />
                            <MenuItem
                                className="menu-handle-img__item"
                                onClick={handleRemovePhoto}
                                disabled={!getValues("hinhAnh")}
                            >
                                Remove photo
                            </MenuItem>
                        </Menu>{" "}
                    </>
                )}
            </div>
        </div>
    );

    return (
        <div className="admin-form-container">
            <div className="admin-form-wrapper">
                <Box className="admin-form" component="form" noValidate onSubmit={handleSubmit(handleSubmitData)}>
                    <div className="left">
                        <Grid container columns={12} spacing={4}>
                            <FormInputs
                                loading={isLoading}
                                disabled={functionality === DETAILS}
                                columns={columns}
                                control={control}
                            />
                        </Grid>
                        {functionality !== DETAILS && (
                            <Stack direction="row" justifyContent="center">
                                <LoadingButton type="submit" className="btn-submit">
                                    {functionality}
                                </LoadingButton>
                            </Stack>
                        )}
                    </div>
                    {!isUsersPage && uploadPhotoColumn}
                </Box>
            </div>
        </div>
    );
};

export default Form;
