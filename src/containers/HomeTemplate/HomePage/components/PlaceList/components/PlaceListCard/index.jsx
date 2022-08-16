import React from "react";

//components
import Image from "@/components/Image";

function PlaceListCard({ data }) {
    return (
        <>
            <div className="place-card__img">
                <Image src={data?.image} alt="Scence illustration" />
            </div>
            <div className="place-card__content">
                <p className="place-card__title">{data?.name}</p>
                <p className="place-card__text">Evaluation: {data?.valueate}</p>
            </div>
        </>
    );
}

export default PlaceListCard;
