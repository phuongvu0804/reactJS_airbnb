import { useState } from "react";
import Image from "@/components/Image";
import { Button, Container, Grid, IconButton, Modal } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Favorite } from "@mui/icons-material";

//Material UI
import { Box } from "@mui/system";

//Others
import "./style.scss";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import RoomFilterModal from "./components/RoomFilterModal";

function RoomListPage() {
    const roomList = useSelector((state) => state.roomList.roomList);

    const error = useSelector((state) => state.roomList.error);

    const [like, setLike] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

    const handleLike = () => {
        const user = localStorage.getItem("user");
        if (user) {
            setLike(true);
        } else {
            navigate("/auth/login");
        }
    };

    const renderRooms = () => {
        return roomList?.map((room, index) => (
            <Grid item xs={12} sm={4} md={3} key={index} className="room-list__room-card">
                <div className="room-card__img">
                    <Image src={room.image} alt="room's image" />
                    <IconButton
                        className={like ? "room-card__favorite-btn active" : "room-card__favorite-btn"}
                        onClick={handleLike}
                    >
                        <Favorite />
                    </IconButton>
                </div>
                <Box className="room-card__content" component={Link} to={`/rooms/${room._id}`}>
                    <h5>{room.name}</h5>
                    <div className="room-card__body">
                        <p className="room-card__body-item">{room.bedRoom} bedroom</p>
                        <p className="room-card__body-item">{room.bath} bathroom</p>
                        <p className="room-card__body-item">{room.kitchen ? "Kitchen" : "No kitchen"}</p>
                    </div>
                    <div className="room-card__foot">
                        <span className="room-card__foot-currency">VND</span>
                        <span className="room-card__foot-price">{room.price}</span>
                        <span className="room-card__foot-time">/ night</span>
                    </div>
                </Box>
            </Grid>
        ));
    };

    return (
        <div id="room-list-page">
            <Container maxWidth="lg" className="room-list__head">
                <div className="room-list__title-wrapper">
                    <span className="room-list__room-number">Over 1,000 stays</span>
                    <h3 className="page__main-title room-list__title">Accomodation in your selected area</h3>
                </div>
                <Button
                    className="room-list__filter-button"
                    variant="outlined"
                    startIcon={<FilterAltIcon />}
                    onClick={handleOpen}
                >
                    Filters
                </Button>
            </Container>
            <Container maxWidth="lg" className="room-list__content">
                {error && <p>{error}</p>}
                <Grid container spacing={2}>
                    {renderRooms()}
                </Grid>
            </Container>
            <RoomFilterModal onOpen={open} onClose={handleClose} />
        </div>
    );
}

export default RoomListPage;
