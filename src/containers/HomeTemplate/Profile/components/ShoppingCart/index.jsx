import { ticketApi } from "@/api";
import { callApi } from "@/api/config/request";
import Image from "@/components/Image";
import WaveSkeleton from "@/components/WaveSkeleton";
import { Close, Delete, Edit } from "@mui/icons-material";
import { Alert, AlertTitle, Box, Button, Collapse, Fade, Grid, IconButton, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import "./style.scss";
function ShoppingCart({ data }) {
    const dispatch = useDispatch();
    const [shoppingList, setShoppingList] = useState(null);
    const [serverError, setServerError] = useState([]);
    const [openMsg, setOpenMsg] = useState(true);

    useEffect(() => {
        if (data) {
            const booking = data.tickets;
            Promise.all(booking.map((item) => ticketApi.getTicketDetails(item)))
                .then((response) => setShoppingList(response))
                .catch((error) => console.log(error));
        }

        const timeId = setTimeout(() => {
            const renewedErrors = serverError.splice(serverError.length - 1, 1);
            setServerError(renewedErrors);
        }, 2000);

        return () => {
            return () => {
                clearTimeout(timeId);
            };
        };
    }, []);

    console.log("render", serverError);
    const handleDelete = () => {
        callApi(
            dispatch(ticketApi.deleteTicket),
            (response) => {
                console.log(response);
            },
            (error) => {
                setServerError([...serverError, error]);
                setOpenMsg(true);
            },
        );
    };

    const renderMsg = () => {
        if (serverError.length > 0) {
            return serverError.map((item, index) => (
                <Collapse key={index} in={openMsg} sx={{ mb: "6px" }}>
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                size="small"
                                color="inherit"
                                onClick={(e) => {
                                    const newServerErrors = serverError.filter(
                                        (item, errorIndex) => errorIndex !== index,
                                    );
                                    setServerError(newServerErrors);
                                }}
                            >
                                <Close />
                            </IconButton>
                        }
                    >
                        {item}
                    </Alert>
                </Collapse>
            ));
        }
    };

    const ShoppingList = ({ data }) => {
        if (data) {
            return (
                <Grid container>
                    {data?.map((item, index) => (
                        <Grid md={6} item key={index} sx={{ mb: "20px" }} className="shop-cart__item">
                            <div>
                                <Image src={item.data.roomId.image} />
                                <Box>
                                    <div className="shop-cart-item__content">
                                        <h4>{item.data.roomId.name}</h4>
                                        <span>Number of guests: {item.data.roomId.guests}</span>

                                        <p>Check in: {moment(item.checkIn).format("DD.MM.YYYY")}</p>
                                        <p>Check out: {moment(item.checkOut).format("DD.MM.YYYY")}</p>
                                    </div>
                                </Box>
                            </div>
                            <Box sx={{ ml: "4px" }}>
                                <IconButton
                                    variant="contained"
                                    size="small"
                                    color="error"
                                    sx={{ mr: "4px" }}
                                    onClick={handleDelete}
                                >
                                    <Delete />
                                </IconButton>
                                <IconButton variant="contained" size="small" color="info">
                                    <Edit />
                                </IconButton>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            );
        } else {
            return <p>Your shopping cart is empty</p>;
        }
    };
    return (
        <ul className="shop-cart-list">
            <h4 className="profile__sub-title">Shopping cart</h4>
            {console.log(serverError)}
            {/* {serverError && (
                <Collapse in={openMsg}>
                    <Alert
                        severity="error"
                        action={
                            <IconButton size="small" color="inherit" onClick={() => setOpenMsg(false)}>
                                <Close />
                            </IconButton>
                        }
                    >
                        {serverError}
                    </Alert>
                </Collapse>
            )} */}
            {renderMsg()}
            <ShoppingList data={shoppingList} />
        </ul>
    );
}

function Loading() {
    return (
        <ul className="user-details__shop-cart-list">
            <h4 className="profile__sub-title">Shopping cart</h4>
            {Array(2)
                .fill(0)
                .map((item, index) => (
                    <li key={index} className="shop-cart__item">
                        <WaveSkeleton variant="circular" sx={{ width: "56px", height: "56px" }} />
                        <div className="shop-cart-item__content">
                            <WaveSkeleton variant="text" sx={{ fontSize: "16px", width: "300px" }} />
                            <WaveSkeleton variant="text" sx={{ fontSize: "16px", width: "200px" }} />
                        </div>
                    </li>
                ))}
        </ul>
    );
}

ShoppingCart.Loading = Loading;

export default ShoppingCart;
