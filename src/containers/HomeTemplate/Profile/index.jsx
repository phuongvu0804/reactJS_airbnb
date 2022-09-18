import { useEffect } from "react";

//Material UI
import { Container } from "@mui/system";

//components
import ProfilePC from "./components/ProfilePC";
import ProfileTabletMobile from "./components/ProfileTabletMobile";

//others
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { actGetUserData } from "@/store/actions/user";

function Profile() {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.data);
    const loading = useSelector((state) => state.user.loading);
    const wishLists = useSelector((state) => state.roomDetails.roomSaved);
    const userId = JSON.parse(localStorage.getItem("user"))?._id;

    useEffect(() => {
        dispatch(actGetUserData(userId));
    }, [userId]);

    return (
        <Container id="profile-page" maxWidth="lg" sx={{ mt: "100px" }}>
            {!userData || loading ? (
                <>
                    <ProfilePC.Loading />
                    <ProfileTabletMobile.Loading />
                </>
            ) : (
                <>
                    <ProfilePC data={userData} wishLists={wishLists} />
                    <ProfileTabletMobile data={userData} wishLists={wishLists} />
                </>
            )}
        </Container>
    );
}

export default Profile;
