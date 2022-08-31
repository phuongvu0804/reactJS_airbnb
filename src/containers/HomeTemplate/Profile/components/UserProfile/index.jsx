import React from "react";

//Material UI
import { Grid } from "@mui/material";

//Components
import UserAvatar from "../UserAvatar";
import UserInfo from "../UserInfo";

function UserProfile({ data }) {
    return (
        <Grid container className="profile__user-profile">
            <Grid item sm={10}>
                <UserInfo className="user-profile__info" data={data} />
            </Grid>
            <Grid item sm={2}>
                <UserAvatar className="user-profile__avatar" data={data} />
            </Grid>
        </Grid>
    );
}

function Loading() {
    return (
        <Grid container className="profile__user-profile">
            <Grid item sm={10}>
                <UserInfo.Loading />
            </Grid>
            <Grid item sm={2}>
                <UserAvatar.Loading />
            </Grid>
        </Grid>
    );
}

UserProfile.Loading = Loading;

export default UserProfile;
