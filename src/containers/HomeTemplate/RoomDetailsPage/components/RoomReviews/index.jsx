import { useState } from "react";

//Material UI
import Image from "@/components/Image";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";

//others
import "./style.scss";
import LoadMoreBtn from "@/components/LoadMoreBtn";
import WaveSkeleton from "@/components/WaveSkeleton";

function RoomReviews({ data }) {
    const [visible, setVisible] = useState(6);

    return data.roomReviews ? (
        <Container maxWidth="lg" className="room-review">
            <h4 className="room-review__total-review">17 reviews</h4>
            <Grid container spacing={2} className="room-review__list">
                {data.roomReviews?.slice(0, visible).map((item, index) => (
                    <Grid item key={index} md={6} className="room-review__review-card">
                        <div className="review-card__top">
                            <Image className="review-card__img" src={item.userId?.avatar} />
                            <div>
                                <h5 className="review-card__name">
                                    {item.userId?.name ? item.userId?.name : "Anonymous"}
                                </h5>
                                <p className="review-card__date">{item.created_at}</p>
                            </div>
                        </div>
                        <div className="review-card__bottom">
                            <p>{item.content}</p>
                        </div>
                    </Grid>
                ))}
            </Grid>

            <LoadMoreBtn className="room-review__show-btn" variant="outlined" setVisible={setVisible} loadNumber={6}>
                Show all reviews
            </LoadMoreBtn>
        </Container>
    ) : (
        data.errorRoomDetails
    );
}

function Loading() {
    return (
        <Container maxWidth="lg" className="room-review">
            <WaveSkeleton variant="text" sx={{ fontSize: "27px", width: "150px" }} />
            <Grid container spacing={2} className="room-review__list" sx={{ mt: "10px" }}>
                {Array(6)
                    .fill(0)
                    .map((item, index) => (
                        <Grid item key={index} md={6} className="room-review__review-card">
                            <div className="review-card__top">
                                <WaveSkeleton variant="circular" sx={{ height: "40px", width: "40px" }} />

                                <div style={{ marginLeft: "10px" }}>
                                    <WaveSkeleton variant="text" sx={{ fontSize: "16px", width: "150px" }} />
                                    <WaveSkeleton variant="text" sx={{ fontSize: "14px", width: "100px" }} />
                                </div>
                            </div>
                            <div className="review-card__bottom">
                                <WaveSkeleton variant="text" sx={{ fontSize: "16px", width: "90%" }} />
                            </div>
                        </Grid>
                    ))}
            </Grid>

            <LoadMoreBtn className="room-review__show-btn" variant="outlined">
                Show all reviews
            </LoadMoreBtn>
        </Container>
    );
}

RoomReviews.Loading = Loading;

export default RoomReviews;
