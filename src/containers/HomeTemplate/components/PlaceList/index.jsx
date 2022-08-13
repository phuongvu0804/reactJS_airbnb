import React from "react";

//Material UI
import { Container, Grid } from "@mui/material";

//components
import Image from "@/components/Image";

//Others
import "./style.scss";
import PlaceListMobile from "./components/PlaceListMobile";
import PlaceListCard from "./components/PlaceListCard";

function PlaceList() {
    return (
        <div className="home-page__place-list">
            <Container maxWidth="lg">
                <h3 className="home-page__main-title">Discover near places</h3>
                <Grid
                    container
                    className="place-card__tablet-pc-list"
                    sx={{ display: { xs: "none", sm: "flex", md: "flex" } }}
                >
                    <Grid item xs={6} sm={3} className="place-card">
                        <PlaceListCard />
                    </Grid>
                </Grid>
                <PlaceListMobile className="place-card__mobile-list" />
            </Container>
        </div>
    );
}

export default PlaceList;
