import React from "react";

//components
import Image from "@/components/Image";

function PlaceListCard() {
    return (
        <>
            <div className="place-card__img">
                <Image
                    src="https://a0.muscache.com/im/pictures/aff9e173-b551-44e4-80f3-bd9b9d632f8b.jpg?im_w=240&im_q=lowq"
                    alt="Scence illustration"
                />
            </div>
            <div className="place-card__content">
                <p className="place-card__title">Ho Chi Minh city</p>
                <p className="place-card__text"> 15 minutes</p>
            </div>
        </>
    );
}

export default PlaceListCard;
