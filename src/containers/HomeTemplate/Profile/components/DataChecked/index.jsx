import React from "react";

//Material UI
import WaveSkeleton from "@/components/WaveSkeleton";
import { Check } from "@mui/icons-material";

//Others
import { VerifiedData } from "../../constants";
import "./style.scss";
function DataChecked() {
    return (
        <div className="data-checked">
            <h4 className="profile__sub-title">Hà confirmed</h4>
            {VerifiedData.map((item, index) => (
                <li key={index} className="data-checked__item">
                    <Check />
                    {item}
                </li>
            ))}
        </div>
    );
}

function Loading() {
    return (
        <div className="data-checked">
            <h4 className="profile__sub-title">Hà confirmed</h4>
            {Array(2)
                .fill(0)
                .map((item, index) => (
                    <WaveSkeleton key={index} sx={{ fontSize: "16px", width: "100%" }} />
                ))}
        </div>
    );
}

DataChecked.Loading = Loading;

export default DataChecked;
