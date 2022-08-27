import LoadMoreBtn from "@/components/LoadMoreBtn";
import WaveSkeleton from "@/components/WaveSkeleton";
import { ArrowForwardIos, Favorite, FavoriteBorder, IosShare } from "@mui/icons-material";
import { Button, Container, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Amenities from "../Amenities";
import RoomReviews from "../RoomReviews";
import RoomRules from "../RoomRules";

import "./style.scss";
function RoomDetailsLoading() {
    return (
        <div id="room-details-page">
            <Container maxWidth="lg">
                <WaveSkeleton variant="text" sx={{ fontSize: "27px", width: "200px" }} />
                <Box
                    className="room-details__location"
                    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                    <WaveSkeleton variant="text" sx={{ fontSize: "16px", width: "120px" }} />
                    <div>
                        <Button className="room-details__btn">
                            <IosShare />
                            Share
                        </Button>
                        <Button className="room-details__btn">
                            <FavoriteBorder className="room-details__btn--not-active" />
                            Save
                        </Button>
                    </div>
                </Box>
                <div className="room-details__img">
                    <WaveSkeleton variant="rectangular" sx={{ height: "500px", width: "100%" }} />
                </div>
                <Box sx={{ display: "flex", my: "10px" }}>
                    <div className="room-details__content">
                        <WaveSkeleton variant="text" sx={{ fontSize: "16px", width: "120px" }} />

                        <Divider sx={{ mt: "10px" }} />
                        <RoomRules.Loading />
                        <Divider />

                        <div className="room-details__desc">
                            <WaveSkeleton variant="text" sx={{ fontSize: "16px", width: "50%" }} />
                            <LoadMoreBtn className="desc__show-btn" variant="text" leftIcon={<ArrowForwardIos />}>
                                Show more
                            </LoadMoreBtn>
                        </div>
                        <Divider />

                        <Amenities.Loading />
                    </div>
                </Box>
                <Divider />
            </Container>
            <RoomReviews.Loading />
        </div>
    );
}
export default RoomDetailsLoading;
