import React from "react";
import moment from "moment";

//Material UI
import { Delete, Edit } from "@mui/icons-material";
import { Box, Grid, IconButton } from "@mui/material";

//Components
import Image from "@/components/Image";

//Others
import "./style.scss";
import { useState } from "react";
import EditModal from "../EditModal";

function ShoppingItem({ data, onDelete, toastMsg, setToastMsg }) {
    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <>
            <Grid sm={6} md={6} item sx={{ mb: "20px" }} className="shop-cart__item">
                <div>
                    <Image src={data?.data.roomId.image} />
                    <Box>
                        <div className="shop-cart-item__content">
                            <h4>{data?.data.roomId.name}</h4>
                            <span>Number of guests: {data?.data.roomId.guests}</span>

                            <p>Check in: {moment(data?.data.checkIn).format("DD.MM.YYYY")}</p>
                            <p>Check out: {moment(data?.data.checkOut).format("DD.MM.YYYY")}</p>
                        </div>
                    </Box>
                </div>
                <Box sx={{ ml: "4px" }}>
                    <IconButton variant="contained" size="small" color="error" sx={{ mr: "4px" }} onClick={onDelete}>
                        <Delete />
                    </IconButton>
                    <IconButton variant="contained" size="small" color="info" onClick={() => setOpenModal(true)}>
                        <Edit />
                    </IconButton>
                </Box>
            </Grid>
            <EditModal
                onOpen={openModal}
                onClose={handleCloseModal}
                data={data}
                toastMsg={toastMsg}
                setToastMsg={setToastMsg}
            />
        </>
    );
}

export default ShoppingItem;
