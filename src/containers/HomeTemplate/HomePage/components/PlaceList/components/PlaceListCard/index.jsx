import { Link } from "react-router-dom";
import React from "react";

//components
import Image from "@/components/Image";
import "./style.scss";

function PlaceListCard({ data }) {
    return (
        <Link to={`/room-list/${data._id}`} className="place-card">
            <div className="place-card__img">
                <Image src={data?.image} alt="Scence illustration" />
            </div>
            <div className="place-card__content">
                <p className="place-card__title">{data?.name}</p>
                <p className="place-card__text">Evaluation: {data?.valueate}</p>
            </div>
        </Link>
    );
}

export default PlaceListCard;
