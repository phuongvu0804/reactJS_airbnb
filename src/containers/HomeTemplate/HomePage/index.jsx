import React from "react";
import Carousel from "../components/Carousel";
import PlaceList from "../components/PlaceList";
import RoomList from "../components/RoomList";

export default function HomePage() {
    return (
        <div id="home-page">
            <Carousel />
            <PlaceList />
            <RoomList />
        </div>
    );
}
