import React from "react";
import { Link, useNavigate } from "react-router-dom";

//Material UI
import { Favorite } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";

//Components
import Image from "@/components/Image";

//others
import "./style.scss";
import WaveSkeleton from "@/components/WaveSkeleton";
import { handleLike } from "@/constants";
import { useDispatch } from "react-redux";

function RoomCard({ room, handleLikeClass, likedRoomList }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Grid item xs={12} sm={4} md={3} className="room-list__room-card">
            <div className="room-card__img">
                <Image src={room.hinhAnh} alt="room's image" />
                <IconButton
                    className={handleLikeClass(room.id)}
                    onClick={() => handleLike(room.id, likedRoomList, dispatch, navigate)}
                >
                    <Favorite />
                </IconButton>
            </div>
            <Box className="room-card__content" component={Link} to={`/room-details/${room.id}`}>
                <h5>{room.tenPhong}</h5>
                <div className="room-card__body">
                    <p className="room-card__body-item">{room.phongNgu} bedroom</p>
                    <p className="room-card__body-item">{room.phongTam} bathroom</p>
                    <p className="room-card__body-item">{room.bep ? "Kitchen available" : "No kitchen"}</p>
                </div>
                <div className="room-card__foot">
                    <span className="room-card__foot-price">{room.khach}</span>
                    <span className="room-card__foot-time">{room.khach > 1 ? "guests" : "guest"}</span>
                </div>
            </Box>
        </Grid>
    );
}

function Loading() {
    return (
        <Grid item xs={12} sm={4} md={3} sx={{ pb: "20px" }} className="room-list__room-card">
            <div className="room-card__img">
                <WaveSkeleton variant="rectangular" sx={{ height: "250px", width: "100%" }} />
            </div>
            <Box className="room-card__content">
                <WaveSkeleton variant="text" sx={{ fontSize: "16px", width: "250px" }} />
                <div className="room-card__body">
                    <WaveSkeleton variant="text" sx={{ fontSize: "1rem", width: "200px" }} />
                    <WaveSkeleton variant="text" sx={{ fontSize: "1rem", width: "200px" }} />
                    <WaveSkeleton variant="text" sx={{ fontSize: "1rem", width: "200px" }} />
                </div>
                <div className="room-card__foot">
                    <WaveSkeleton variant="text" sx={{ fontSize: "1rem", width: "250px" }} />
                </div>
            </Box>
        </Grid>
    );
}

RoomCard.Loading = Loading;

export default RoomCard;
