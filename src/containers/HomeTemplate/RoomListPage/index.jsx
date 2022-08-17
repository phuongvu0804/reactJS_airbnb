import { useEffect, useState } from "react";
import Image from "@/components/Image";
import { Button, Container, Grid, IconButton, Modal } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Favorite } from "@mui/icons-material";

//Others
import "./style.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function RoomListPage() {
    const roomList = useSelector((state) => state.roomList.roomList);
    const error = useSelector((state) => state.roomList.error);

    const renderRooms = () => {
        return roomList?.map((room, index) => (
            <Grid item xs={12} sm={4} md={3} key={index} component={Link} to="/" className="room-list__room-card">
                <div className="room-card__img">
                    <Image src={room.image} alt="room's image" />
                    <IconButton className="room-card__favorite-btn">
                        <Favorite />
                    </IconButton>
                </div>
                <div className="room-card__content">
                    <h5>{room.name}</h5>
                    <div className="room-card__body">
                        <p className="room-card__body-item">{room.bedRoom} bedroom</p>
                        <p className="room-card__body-item">{room.bath} bathroom</p>
                        <p className="room-card__body-item">{room.kitchen ? "Kitchen" : "No kitchen"}</p>
                    </div>
                    <div className="room-card__foot">
                        <span className="room-card__foot-currency">VND</span>
                        <span className="room-card__foot-price">{room.price}</span>
                        <span className="room-card__foot-time">/ night</span>
                    </div>
                </div>
            </Grid>
        ));
    };

    return (
        <div id="room-list-page">
            <Container maxWidth="lg" className="room-list__head">
                <div className="room-list__title-wrapper">
                    <span className="room-list__room-number">Over 1,000 stays</span>
                    <h3 className="page__main-title room-list__title">Accomodation in your selected area</h3>
                </div>
                <Button className="room-list__filter-button" variant="outlined" startIcon={<FilterAltIcon />}>
                    Filters
                </Button>
            </Container>
            <Container maxWidth="lg" className="room-list__content">
                {error && <p>{error}</p>}
                <Grid container spacing={2}>
                    {renderRooms()}
                </Grid>
            </Container>
            <div className="room-list__filter-modal"></div>
        </div>
    );
}

export default RoomListPage;
