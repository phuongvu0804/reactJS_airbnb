import { useEffect } from "react";

//Material UI
import { Divider, Grid } from "@mui/material";

//components
import UserProfile from "../UserProfile";
import UserVerification from "../UserVerification";
import DataChecked from "../DataChecked";
import WishList from "../WishList";
import ShoppingCart from "../ShoppingCart";

//others

function ProfileTabletMobile({ data, wishLists }) {
    return (
        <Grid container sx={{ display: { xs: "flex", md: "none" } }}>
            <UserProfile data={data} />
            <Divider sx={{ width: "100%", my: "var(--margin-3)" }} />
            <UserVerification />
            <Divider sx={{ width: "100%", my: "var(--margin-3)" }} />
            <DataChecked />
            <Divider sx={{ width: "100%", my: "var(--margin-3)" }} />
            <WishList data={wishLists} />
            <Divider sx={{ width: "100%", my: "var(--margin-3)" }} />
            {/* <ShoppingCart data={data} /> */}
        </Grid>
    );
}

function Loading() {
    return (
        <Grid container sx={{ display: { xs: "flex", md: "none" } }}>
            <UserProfile.Loading />
            <Divider sx={{ width: "100%", my: "var(--margin-3)" }} />
            <UserVerification.Loading />
            <Divider sx={{ width: "100%", my: "var(--margin-3)" }} />
            <DataChecked.Loading />
            <Divider sx={{ width: "100%", my: "var(--margin-3)" }} />
            <WishList.Loading />
            <Divider sx={{ width: "100%", my: "var(--margin-3)" }} />
            {/* <ShoppingCart.Loading /> */}
        </Grid>
    );
}

ProfileTabletMobile.Loading = Loading;

export default ProfileTabletMobile;
