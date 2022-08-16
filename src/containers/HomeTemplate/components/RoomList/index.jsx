import React from "react";
import { Link } from "react-router-dom";

//Material UI
import { Container, Grid } from "@mui/material";

//Components
import Image from "@/components/Image";

//others
import "./style.scss";
import { roomCategories } from "./constants";

function RoomList() {
    const renderRoomList = () => {
        return roomCategories.map((item, index) => (
            <Grid item xs={4} key={index} component={Link} to="/" className="room-card">
                <div className="room-card__img">
                    <Image src={item.image} alt={`Illustrations about ${item.alt}`} />
                </div>
                <p className="room-card__title">{item.name}</p>
            </Grid>
        ));
    };

    return (
        <div className="home-page__room-list">
            <Container>
                <h3 className="home-page__main-title">Stay anywhere</h3>
                <Grid container>{renderRoomList()}</Grid>
            </Container>
        </div>
    );
}

export default RoomList;
