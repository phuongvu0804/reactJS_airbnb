import React from "react";

import "./style.scss";

function RoomBrief({ data }) {
    return (
        <ul className="room-details__summary">
            <li className="room-details__summary-item">
                {data?.khach > 1 ? `${data?.khach} guests` : `${data?.khach} guest`}
            </li>
            <li className="room-details__summary-item">
                {data?.phongNgu > 1 ? `${data?.phongNgu} bedrooms` : `${data?.phongNgu} bedroom`}
            </li>
            <li className="room-details__summary-item">
                {data?.phongTam > 1 ? `${data?.phongTam} bathrooms` : `${data?.phongTam} bathroom`}
            </li>
        </ul>
    );
}

export default RoomBrief;
