import React from "react";
import Slider from "react-slick";

//React Slick config
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PlaceListCard from "../PlaceListCard";
import { Box } from "@mui/system";

function PlaceListMobile({ className, data }) {
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return <div className={className} style={{ ...style, display: "block" }} onClick={onClick} />;
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return <div className={className} style={{ ...style, display: "block" }} onClick={onClick} />;
    }

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        adaptiveHeight: true,
        variableWidth: false,
    };

    const renderListCards = () => {
        return data?.map((item, index) => (
            <Box key={index} className="place-card">
                <PlaceListCard data={item} />
            </Box>
        ));
    };

    return (
        <Slider className={className} {...settings}>
            {renderListCards()}
        </Slider>
    );
}

export default PlaceListMobile;
