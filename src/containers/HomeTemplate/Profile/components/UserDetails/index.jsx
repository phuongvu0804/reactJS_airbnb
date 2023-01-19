import React from "react";

//Material UI
import { Divider } from "@mui/material";

//components
import UserInfo from "../UserInfo";
import WishList from "../WishList";

//others
import "./style.scss";
import ShoppingCart from "../ShoppingCart";

function UserDetails({ data, timeOutId }) {
    return (
        <>
            <UserInfo data={data} />
            <Divider sx={{ my: "30px" }} />

            <WishList />
            <Divider sx={{ my: "30px" }} />

            <ShoppingCart data={data} timeOutId={timeOutId} />
        </>
    );
}

function Loading() {
    return (
        <>
            <UserInfo.Loading />
            <Divider sx={{ my: "30px" }} />

            <WishList.Loading />
            <Divider sx={{ my: "30px" }} />

            <ShoppingCart.Loading />
        </>
    );
}

UserDetails.Loading = Loading;

export default UserDetails;
