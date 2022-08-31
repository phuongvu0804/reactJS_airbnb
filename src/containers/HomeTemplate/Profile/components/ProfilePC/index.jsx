import React from "react";

//Material UI
import { Divider, Grid } from "@mui/material";
import { Container } from "@mui/system";

//components
import UserCard from "../UserCard";
import UserDetails from "../UserDetails";
//others

function ProfilePC({ data, wishLists, shoppingCart }) {
    return (
        <Grid container sx={{ display: { xs: "none", md: "flex" } }}>
            <Grid item md={3} className="profile__user-card">
                <UserCard data={data} />
            </Grid>
            <Grid item md={9} className="profile__user-details">
                <UserDetails data={data} wishLists={wishLists} />
            </Grid>
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
