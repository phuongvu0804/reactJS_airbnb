import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//Components
import Carousel from "../components/Carousel";
import PlaceList from "../components/PlaceList";
import RoomList from "../components/RoomList";

//Others
import { locationApi } from "@/api";

function HomePage() {
    const [placeList, setPlaceList] = useState([]);
    const [serverError, setServerError] = useState("");
    useEffect(() => {
        const fetchPlaceList = async () => {
            try {
                const placeList = await locationApi.getLocationListByEvaluation(9);
                setPlaceList(placeList.slice(0, 8));
            } catch (error) {
                //Solve error scenario
                console.log(error);
                setServerError(error);
            }
        };
        fetchPlaceList();
    }, []);
    return (
        <div id="home-page">
            <Carousel />
            <PlaceList data={placeList} />
            <RoomList />
        </div>
    );
}

export default HomePage;
