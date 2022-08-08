import React from "react";
import Carousel from "../components/Carousel";
import PlaceList from "../components/PlaceList";
import RoomList from "../components/RoomList";
import SearchBar from "../components/SearchBar";

export default function HomePage() {
    return (
        <div id="home-page">
            <SearchBar />
            <Carousel />
            <PlaceList />
            <RoomList />
        </div>
    );
}
