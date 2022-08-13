import React from "react";

//Components
import images from "@/assets/images";
import Image from "@/components/Image";

//Others
import "./style.scss";
import { Container } from "@mui/material";

function Carousel() {
    return (
        <div className="home-page__carousel">
            <Container maxWidth="lg">
                <Image className="home-page__carousel-img" src={images.carouselImg} alt="Airbnb's carousel" />
                <p className="home-page__carousel-text">Open your door to hosting</p>
            </Container>
        </div>
    );
}

export default Carousel;
