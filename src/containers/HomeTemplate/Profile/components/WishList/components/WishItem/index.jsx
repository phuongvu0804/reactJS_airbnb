import Image from "@/components/Image";
import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WishItem = ({ data }) => {
    const navigate = useNavigate();
    return (
        <li className="user-details__saved-room-item" onClick={() => navigate(`/room-details/${data.id}`)}>
            <Image src={data?.hinhAnh} alt={data?.tenPhong} />
            <div className="saved-room-item__content">
                <h4>{data?.tenPhong}</h4>
                <Box sx={{ display: "flex" }}>
                    <span className="room-card__body-item">{data.phongNgu} bedroom</span>
                    <Divider sx={{ marginRight: "6px" }} orientation="vertical" flexItem />
                    <span className="room-card__body-item">{data.phongTam} bathroom</span>
                    <Divider sx={{ marginRight: "6px" }} orientation="vertical" flexItem />
                    <span className="room-card__body-item">{data.bep ? "Kitchen available" : "No kitchen"}</span>
                </Box>
            </div>
        </li>
    );
};

export default WishItem;
