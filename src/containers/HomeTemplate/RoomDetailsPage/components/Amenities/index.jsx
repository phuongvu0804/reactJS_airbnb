import { useState } from "react";
import LoadMoreBtn from "@/components/LoadMoreBtn";
import { Box, Grid } from "@mui/material";

//others
import { amenities } from "../../constants";
import "./style.scss";
import WaveSkeleton from "@/components/WaveSkeleton";

function Amenities({ data }) {
    const [visible, setVisible] = useState(5);
    return (
        <div className="room-details__amenities">
            <h5 className="amenities__title">What this place offers</h5>
            <Grid container spacing={2}>
                {amenities.slice(0, visible).map((item) => {
                    const key = item.id;
                    if (data[key])
                        return (
                            <Grid item xs={6} className="amenities__item" key={item.id}>
                                {item.icon}
                                <p className="amenities__name">{item.name}</p>
                            </Grid>
                        );
                })}
            </Grid>
            <LoadMoreBtn className="amenities__show-btn" variant="outlined" setVisible={setVisible} loadNumber={5}>
                Show all amenities
            </LoadMoreBtn>
        </div>
    );
}

function Loading() {
    return (
        <div className="room-details__amenities">
            <h5 className="amenities__title">What this place offers</h5>
            <Grid container spacing={2}>
                {Array(4)
                    .fill(0)
                    .map((item, index) => (
                        <Grid item xs={6} className="amenities__item" key={index}>
                            <Box sx={{ mr: "10px" }}>
                                <WaveSkeleton variant="circular" sx={{ height: "25px", width: "25px" }} />
                            </Box>
                            <WaveSkeleton variant="text" sx={{ fontSize: "14px", width: "100px" }} />
                        </Grid>
                    ))}
            </Grid>
            <LoadMoreBtn className="amenities__show-btn" variant="outlined">
                Show all amenities
            </LoadMoreBtn>
        </div>
    );
}

Amenities.Loading = Loading;
export default Amenities;
