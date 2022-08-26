import { useState } from "react";

//Components
import Carousel from "./components/Carousel";
import RoomList from "./components/RoomList";

//Others
import PlaceList from "./components/PlaceList";
import { nearPlaceList } from "./constants";

function HomePage() {
    return (
        <div id="home-page">
            <Carousel />
            <PlaceList data={nearPlaceList} />
            <RoomList />
        </div>
    );
}

export default HomePage;
