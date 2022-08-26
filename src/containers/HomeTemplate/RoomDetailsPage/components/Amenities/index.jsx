import { useState } from "react";
import LoadMoreBtn from "@/components/LoadMoreBtn";
import { Grid } from "@mui/material";

//others
import { amenities } from "../../constants";
import "./style.scss";

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

export default Amenities;
