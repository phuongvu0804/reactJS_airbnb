import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//Components
import Carousel from "../components/Carousel";
import RoomList from "../components/RoomList";

//Others
import { locationApi } from "@/api";
import PlaceList from "../components/PlaceList";

function HomePage() {
    const [locationList, setLocationList] = useState([]);
    const [serverError, setServerError] = useState("");

    useEffect(() => {
        const fetchlocationList = async () => {
            try {
                const locationList = await locationApi.getLocationListByEvaluation(9);
                setLocationList(locationList.slice(0, 8));
            } catch (error) {
                //Solve error scenario
                console.log(error);
                setServerError(error);
            }
        };
        fetchlocationList();
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
