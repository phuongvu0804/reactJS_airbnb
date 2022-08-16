import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//Components
import Carousel from "../components/Carousel";
import RoomList from "../components/RoomList";

//Others
import { locationApi } from "@/api";
import PlaceList from "../components/PlaceList";
import { callApi } from "@/api/config/request";

function HomePage() {
    const [locationList, setLocationList] = useState([]);

    useEffect(() => {
        callApi(locationApi.getLocationListByEvaluation(9), (resp) => {
            setLocationList(resp.data.slice(0, 8));
        });
    }, []);

    return (
        <div id="home-page">
            <Carousel />
            <PlaceList data={locationList} />
            <RoomList />
        </div>
    );
}

export default HomePage;
