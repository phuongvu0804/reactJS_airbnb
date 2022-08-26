import React from "react";

//others
import { rules } from "../../constants";
import "./style.scss";

function RoomRules() {
    return (
        <ul className="room-details__rule-list">
            {rules.map((rule, index) => (
                <li className="room-details__rule-item" key={index}>
                    {rule.icon}
                    <div className="rule-item__content">
                        <h6 className="rule-item__title">{rule.name}</h6>
                        <p className="rule-item__text">{rule.content}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default RoomRules;
