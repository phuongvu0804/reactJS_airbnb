import { useEffect, useState } from "react";

//Material UI
import { Container } from "@mui/system";

//components

//others
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { actGetUserData } from "@/store/actions/user";
import ProfilePC from "./components/ProfilePC";
import ProfileTabletMobile from "./components/ProfileTabletMobile";

function Profile() {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.data);
    const wishLists = useSelector((state) => state.roomDetails.roomSaved);
    // const shoppingCart = useSelector((state) => state.roomDetails.roomBooked);
    const userLoading = useSelector((state) => state.user.loading);
    const roomLoading = useSelector((state) => state.roomDetails.loading);
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    useEffect(() => {
        dispatch(actGetUserData(userId));
    }, [userId]);

    return (
        <Container id="profile-page" maxWidth="lg" sx={{ mt: "100px" }}>
            {userData && (
                <>
                    <ProfilePC data={userData} wishLists={wishLists} />
                    <ProfileTabletMobile data={userData} wishLists={wishLists} />
                </>
            )}
            {!userData && (
                <>
                    <ProfilePC.Loading />
                    <ProfileTabletMobile.Loading />
                </>
            )}
        </Container>
    );
}

export default Profile;
