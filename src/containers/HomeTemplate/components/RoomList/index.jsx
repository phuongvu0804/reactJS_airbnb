import React from "react";

//Material UI
import { Container, Grid } from "@mui/material";

//Components
import images from "@/assets/images";
import Image from "@/components/Image";

//others
import "./style.scss";
import { Link } from "react-router-dom";

function RoomList() {
    const roomCategories = [
        {
            name: "Entire place",
            alt: "entire place",
            image: images.roomListEntire,
        },
        {
            name: "Modern place",
            alt: "modern place",
            image: images.roomListModern,
        },
        {
            name: "Surrounded by Nature",
            alt: "places surrounded by Nature",
            image: images.roomListNatural,
        },
    ];

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
