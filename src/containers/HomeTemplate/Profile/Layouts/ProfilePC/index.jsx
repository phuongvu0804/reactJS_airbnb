import React from "react";
import { useSelector } from "react-redux";

//Material UI
import { Grid } from "@mui/material";

//components
import UserCard from "../../components/UserCard";
import UserDetails from "../../components/UserDetails";
import MUIAlert from "@/components/MUIAlert";
//others

function ProfilePC({ data, wishLists }) {
    let timeOutId;

    const alertData = useSelector((state) => state.alert.data);

    return (
        <Grid container sx={{ display: { xs: "none", md: "flex" } }}>
            <Grid item md={3} className="profile__user-card">
                <UserCard data={data} />
            </Grid>
            <Grid item md={9} className="profile__user-details">
                <UserDetails data={data} timeOutId={timeOutId} />
            </Grid>
            <MUIAlert alert={alertData} timeOutId={timeOutId} />
        </Grid>
    );
}

function Loading() {
    return (
        <Grid container sx={{ display: { xs: "none", md: "flex" } }}>
            <Grid item md={3} className="profile__user-card">
                <UserCard.Loading />
            </Grid>
            <Grid item md={9} className="profile__user-details">
                <UserDetails.Loading />
            </Grid>
        </Grid>
    );
}

ProfilePC.Loading = Loading;

export default ProfilePC;
