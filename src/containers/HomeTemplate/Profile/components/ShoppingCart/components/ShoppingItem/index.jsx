import React, { useEffect } from "react";
import moment from "moment";

//Material UI
import { Delete, Visibility } from "@mui/icons-material";
import { Box, Grid, IconButton } from "@mui/material";

//Components
import Image from "@/components/Image";

//Others
import "./style.scss";
import { useState } from "react";
import { roomApi } from "@/api";
import { useNavigate } from "react-router-dom";

function ShoppingItem({ data, onDelete }) {
    const navigate = useNavigate();
    const [roomInfo, setRoomInfo] = useState({
        image: null,
        name: null,
    });
    useEffect(() => {
        roomApi
            .getRoomDetails(data.maPhong)
            .then((response) => {
                setRoomInfo({
                    image: response.data.content.hinhAnh,
                    name: response.data.content.tenPhong,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <Grid sm={6} md={6} item sx={{ mb: "20px" }} className="shop-cart__item">
                <div>
                    <Image src={roomInfo.image} alt={roomInfo.name} />
                    <Box>
                        <div className="shop-cart-item__content">
                            <h4>{roomInfo.name}</h4>
                            <span>Number of guests: {data?.soLuongKhach}</span>

                            <p>Check in: {moment(data?.checkIn).format("DD.MM.YYYY")}</p>
                            <p>Check out: {moment(data?.checkOut).format("DD.MM.YYYY")}</p>
                        </div>
                    </Box>
                </div>
                <Box sx={{ ml: "4px" }}>
                    <IconButton variant="contained" size="small" color="error" sx={{ mr: "4px" }} onClick={onDelete}>
                        <Delete />
                    </IconButton>
                    <IconButton
                        variant="contained"
                        size="small"
                        color="info"
                        onClick={() => navigate(`/room-details/${data.maPhong}`)}
                    >
                        <Visibility />
                    </IconButton>
                </Box>
            </Grid>
        </>
    );
}

export default ShoppingItem;
