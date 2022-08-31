import React from "react";

//Material UI
import { Divider } from "@mui/material";

//components
import UserVerification from "../UserVerification";
import UserAvatar from "../UserAvatar";
import DataChecked from "../DataChecked";

//others
import "./style.scss";

function UserCard() {
    return (
        <>
            <div className="user-card__img">
                <UserAvatar />
            </div>
            <Divider sx={{ my: "30px" }} />

            <div className="user-card__actions">
                <UserVerification />
            </div>
            <Divider sx={{ my: "20px" }} />

            <ul className="user-card__verify">
                <DataChecked />
            </ul>
        </>
    );
}

function Loading() {
    return (
        <>
            <div className="user-card__img">
                <UserAvatar.Loading />
            </div>
            <Divider sx={{ my: "30px" }} />

            <div className="user-card__actions">
                <UserVerification.Loading />
            </div>
            <Divider sx={{ my: "20px" }} />

            <ul className="user-card__verify">
                <h4 className="profile__sub-title">Hà confirmed</h4>
                <DataChecked.Loading />
            </ul>
        </>
    );
}

UserCard.Loading = Loading;

export default UserCard;
