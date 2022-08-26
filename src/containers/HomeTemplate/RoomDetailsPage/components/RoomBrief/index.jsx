import React from "react";

import "./style.scss";

function RoomBrief({ data }) {
    return (
        <ul className="room-details__summary">
            <li className="room-details__summary-item">
                {data?.guests > 1 ? `${data?.guests} guests` : `${data?.guests} guest`}
            </li>
            <li className="room-details__summary-item">
                {data?.bedRoom > 1 ? `${data?.bedRoom} bedrooms` : `${data?.bedRoom} bedroom`}
            </li>
            <li className="room-details__summary-item">
                {data?.bath > 1 ? `${data?.bath} bathrooms` : `${data?.bath} bathroom`}
            </li>
        </ul>
    );
}

export default RoomBrief;
