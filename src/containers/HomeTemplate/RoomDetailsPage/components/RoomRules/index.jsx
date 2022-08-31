import WaveSkeleton from "@/components/WaveSkeleton";
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

function Loading() {
    return (
        <ul className="room-details__rule-list">
            {Array(3)
                .fill(0)
                .map((rule, index) => (
                    <li className="room-details__rule-item" key={index}>
                        <WaveSkeleton variant="circular" sx={{ height: "25px", width: "25px" }} />

                        <div className="rule-item__content" style={{ marginLeft: "10px" }}>
                            <WaveSkeleton variant="text" sx={{ fontSize: "14px", width: "200px" }} />
                            <WaveSkeleton variant="text" sx={{ fontSize: "14px", width: "200px" }} />
                        </div>
                    </li>
                ))}
        </ul>
    );
}

RoomRules.Loading = Loading;

export default RoomRules;
