import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//Material UI
import Image from "@/components/Image";
import { Button, Container, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { ArrowForwardIos, Favorite, FavoriteBorder, IosShare } from "@mui/icons-material";

//components
import RoomBrief from "./components/RoomBrief";
import RoomRules from "./components/RoomRules";
import Amenities from "./components/Amenities";
import RoomReviews from "./components/RoomReviews";
import Booking from "./components/Booking";
import LoadMoreBtn from "@/components/LoadMoreBtn";

//others
import "./style.scss";
import { actCreateSave, actGetRoomDetails, actGetRoomReview } from "@/store/actions/roomDetails";
import RoomDetailsLoading from "./components/RoomDetailsLoading";
import { LOCAL_STORAGE_KEY } from "@/constants";

function RoomDetailsPage() {
    let roomId = useParams();
    roomId = Number(roomId.id);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const roomDetails = useSelector((state) => state.roomDetails.roomDetails);
    const roomDetailsData = useSelector((state) => state.roomDetails);
    const roomsSaved = useSelector((state) => state.roomDetails.roomSaved);
    const loading = useSelector((state) => state.roomDetails.loading);

    const [visible, setVisible] = useState(105);
    const [favorite, setFavorite] = useState(false);

    //Fetch room's data
    useEffect(() => {
        dispatch(actGetRoomReview(roomId));
        dispatch(actGetRoomDetails(roomId));
    }, []);

    //Handle liked function
    useEffect(() => {
        roomsSaved?.forEach((room) => {
            //if user has liked this room, display it
            if (room === roomId) {
                setFavorite(true);
            }
        });
    }, []);

    const handleLike = () => {
        const user = localStorage.getItem(LOCAL_STORAGE_KEY);
        let filteredList = [...roomsSaved];

        if (user) {
            setFavorite(!favorite);

            if (!favorite) {
                filteredList = [...filteredList, roomId];
            } else {
                filteredList = filteredList.filter((item) => item !== roomId);
            }

            dispatch(actCreateSave(filteredList));
        } else {
            navigate("/auth/login");
        }
    };

    //rooms errors roomdetails
    return !roomDetailsData || !roomDetails || loading ? (
        <RoomDetailsLoading />
    ) : (
        <div id="room-details-page">
            <Container maxWidth="lg">
                <h3 className="page__main-title room-details__title">{roomDetails?.tenPhong}</h3>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p className="room-details__location"></p>
                    <div>
                        <Button className="room-details__btn">
                            <IosShare />
                            Share
                        </Button>
                        <Button
                            className={favorite ? "room-details__btn active" : "room-details__btn"}
                            onClick={handleLike}
                        >
                            <FavoriteBorder className="room-details__btn--not-active" />
                            <Favorite className="room-details__btn-active" />
                            Save
                        </Button>
                    </div>
                </Box>
                <div className="room-details__img">
                    <Image src={roomDetails?.hinhAnh} alt={roomDetails?.tenPhong} />
                </div>
                <Box sx={{ display: "flex" }}>
                    <div className="room-details__content">
                        <RoomBrief data={roomDetails} />
                        <Divider />

                        <RoomRules />
                        <Divider />

                        <div className="room-details__desc">
                            <p>{roomDetails?.moTa.slice(0, visible)}</p>

                            {visible < roomDetails && (
                                <LoadMoreBtn
                                    className="desc__show-btn"
                                    variant="text"
                                    leftIcon={<ArrowForwardIos />}
                                    setVisible={setVisible}
                                    loadNumber={105}
                                >
                                    Show more
                                </LoadMoreBtn>
                            )}
                        </div>
                        <Divider />

                        <Amenities data={roomDetails} />
                    </div>

                    <Booking data={roomDetails} />
                </Box>
                <Divider />
            </Container>

            <RoomReviews data={roomDetailsData} />
        </div>
    );
}

export default RoomDetailsPage;
