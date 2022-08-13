import React from "react";
import Slider from "react-slick";

//React Slick config
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PlaceListCard from "../PlaceListCard";
import { Box } from "@mui/system";
function PlaceListMobile({ className }) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <Slider className={className} {...settings}>
            <Box className="place-card">
                <PlaceListCard />
            </Box>
            <Box className="place-card">
                <PlaceListCard />
            </Box>
            <Box className="place-card">
                <PlaceListCard />
            </Box>
        </Slider>
    );
}

export default PlaceListMobile;
