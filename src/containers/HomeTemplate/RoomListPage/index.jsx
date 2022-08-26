import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

//Material UI
import { Box } from "@mui/system";
import { Button, Container, Grid, IconButton, Modal } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Favorite } from "@mui/icons-material";

//Components
import RoomFilterModal from "./components/RoomFilterModal";

//Others
import Image from "@/components/Image";
import "./style.scss";
import { actCreateSave } from "@/store/actions/roomDetails";

function RoomListPage() {
    const dispatch = useDispatch();
    const roomList = useSelector((state) => state.roomList.roomList);
    let roomsSaved = useSelector((state) => state.roomDetails.roomSaved);
    const error = useSelector((state) => state.roomList.error);

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

    const handleLike = (id) => {
        const user = localStorage.getItem("user");
        if (user) {
            if (roomsSaved.length !== 0) {
                const isExisted = roomsSaved.indexOf(id) !== -1;
                if (isExisted) {
                    roomsSaved = roomsSaved.filter((item) => item !== id);
                } else {
                    roomsSaved = [...roomsSaved, id];
                }

                dispatch(actCreateSave(roomsSaved));
            } else {
                console.log("dispatch");
                dispatch(actCreateSave([...roomsSaved, id]));
            }
        } else {
            navigate("/auth/login");
        }
    };

    const handleLikeClass = (id) => {
        let className = "room-card__favorite-btn";
        roomsSaved?.forEach((item) => {
            if (item === id) {
                className = `${className} active`;
            }
        });
        return className;
    };

    const renderRooms = () => {
        return roomList?.map((room, index) => (
            <Grid item xs={12} sm={4} md={3} key={index} className="room-list__room-card">
                <div className="room-card__img">
                    <Image src={room.image} alt="room's image" />
                    <IconButton className={handleLikeClass(room._id)} onClick={() => handleLike(room._id)}>
                        <Favorite />
                    </IconButton>
                </div>
                <Box className="room-card__content" component={Link} to={`/room-details/${room._id}`}>
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
