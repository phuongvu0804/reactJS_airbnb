import React from "react";

//Material UI
import WaveSkeleton from "@/components/WaveSkeleton";
import { Button } from "@mui/material";

//Others
import "./style.scss";
import { verificationInfo } from "../../constants";

function UserVerification() {
    return (
        <div className="user-verification">
            {verificationInfo.icon}
            <h4 className="user-verification__action-title">{verificationInfo.title}</h4>
            <p className="user-verification__action-desc">{verificationInfo.desc}</p>
            <Button variant="outlined" className="user-verification__action-btn">
                Get the badge
            </Button>
        </div>
    );
}

function Loading() {
    return (
        <div className="user-verification">
            {verificationInfo.icon}
            <h4 className="user-verification__action-title">{verificationInfo.title}</h4>
            <WaveSkeleton variant="text" sx={{ fontSize: "16px", width: "100%" }} />
            <WaveSkeleton variant="rectangular" sx={{ width: "150px", height: "50px" }} />
        </div>
    );
}

UserVerification.Loading = Loading;

export default UserVerification;
