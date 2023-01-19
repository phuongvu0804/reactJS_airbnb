import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Material UI
import { Container } from "@mui/system";

//components
import ProfilePC from "./Layouts/ProfilePC";
import ProfileTabletMobile from "./Layouts/ProfileTabletMobile";

//others
import "./style.scss";
import { actGetUserData } from "@/store/actions/user";
import { actGetTicketList } from "@/store/actions/ticket";
import { LOCAL_STORAGE_KEY } from "@/constants";

function Profile() {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);
    const ticketData = useSelector((state) => state.ticket);
    const wishLists = useSelector((state) => state.roomDetails.roomSaved);

    //Fetch user's info + booking
    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))?.id;

        dispatch(actGetUserData(userId));
        dispatch(actGetTicketList(userId));
    }, []);

    return (
        <Container id="profile-page" maxWidth="lg" sx={{ mt: "100px" }}>
            {userData.loading || ticketData.loading ? (
                <>
                    <ProfilePC.Loading />
                    <ProfileTabletMobile.Loading />
                </>
            ) : (
                <>
                    <ProfilePC data={userData.data} wishLists={wishLists} />
                    <ProfileTabletMobile data={userData.data} wishLists={wishLists} />
                </>
            )}
        </Container>
    );
}

export default Profile;
