import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//Material UI
import Image from "@/components/Image";
import { Button, CircularProgress, Container, Divider, Skeleton } from "@mui/material";
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

function RoomDetailsPage() {
    const roomId = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const roomDetails = useSelector((state) => state.roomDetails.roomDetails);
    const roomDetailsData = useSelector((state) => state.roomDetails);
    let roomsSaved = useSelector((state) => state.roomDetails.roomSaved);
    const loading = useSelector((state) => state.roomDetails.loading);

    const [visible, setVisible] = useState(105);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        dispatch(actGetRoomDetails(roomId.id));
        dispatch(actGetRoomReview(roomId.id));

        roomsSaved?.forEach((room) => {
            if (room === roomId.id) {
                setFavorite(true);
            }
        });
    }, [roomId.id]);

    const handleSave = () => {
        const user = localStorage.getItem("user");
        if (user) {
            setFavorite(!favorite);

            if (favorite) {
                roomsSaved = [...roomsSaved, roomId.id];
            } else {
                roomsSaved = roomsSaved.filter((item) => item !== roomId.id);
            }

            dispatch(actCreateSave(roomsSaved));
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
                <h3 className="page__main-title room-details__title">{roomDetails?.name}</h3>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p className="room-details__location">{roomDetails?.locationId.name}</p>
                    <div>
                        <Button className="room-details__btn">
                            <IosShare />
                            Share
                        </Button>
                        <Button
                            className={favorite ? "room-details__btn active" : "room-details__btn"}
                            onClick={handleSave}
                        >
                            <FavoriteBorder className="room-details__btn--not-active" />
                            <Favorite className="room-details__btn-active" />
                            Save
                        </Button>
                    </div>
                </Box>
                <div className="room-details__img">
                    <Image src={roomDetails?.image} alt={roomDetails?.name} />
                </div>
                <Box sx={{ display: "flex" }}>
                    <div className="room-details__content">
                        <RoomBrief data={roomDetails} />
                        <Divider />

                        <RoomRules />
                        <Divider />

                        <div className="room-details__desc">
                            <p>{roomDetails?.description.slice(0, visible)}</p>

                            <LoadMoreBtn
                                className="desc__show-btn"
                                variant="text"
                                leftIcon={<ArrowForwardIos />}
                                setVisible={setVisible}
                                loadNumber={105}
                            >
                                Show more
                            </LoadMoreBtn>
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
