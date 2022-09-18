import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//components
import Image from "@/components/Image";
import "./style.scss";

//Others
import { actGetRoomList } from "@/store/actions/roomList";

function PlaceListCard({ data }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGetRoomList = (locationId) => {
        dispatch(actGetRoomList(locationId));
        navigate(`/room-list/${data._id}`);
    };

    return (
        <div onClick={() => handleGetRoomList(data._id)} className="place-card">
            <div className="place-card__img">
                <Image src={data?.image} alt="Scence illustration" />
            </div>
            <div className="place-card__content">
                <p className="place-card__title">{data?.name}</p>
                <p className="place-card__text">Evaluation: {data?.valueate}</p>
            </div>
        </div>
    );
}

export default PlaceListCard;
