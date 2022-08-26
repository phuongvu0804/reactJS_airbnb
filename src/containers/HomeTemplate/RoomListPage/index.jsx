import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

//Material UI
import { Box } from "@mui/system";
import { Button, Container, Grid, IconButton, Modal } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

//Components
import RoomFilterModal from "./components/RoomFilterModal";
import RoomCard from "./components/RoomCard";

//Others
import Image from "@/components/Image";
import "./style.scss";
import { actCreateSave } from "@/store/actions/roomDetails";
import { actGetRoomList } from "@/store/actions/roomList";
import LoadMoreBtn from "@/components/LoadMoreBtn";

function RoomListPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const locationId = useParams();

    const roomList = useSelector((state) => state.roomList.roomList);
    let roomsSaved = useSelector((state) => state.roomDetails.roomSaved);
    const roomListLoading = useSelector((state) => state.roomList.loading);
    const locationLoading = useSelector((state) => state.locationList.loading);
    const error = useSelector((state) => state.locationList.loading);

    const [open, setOpen] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [visible, setVisible] = useState(8);

    useEffect(() => {
        if (!roomListLoading || !locationLoading) {
            setDataLoading(false);
        }

        dispatch(actGetRoomList(locationId.id));
    }, [locationId.id]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    return (
        <div id="room-list-page">
            {dataLoading && (
                <>
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
                            {Array(8)
                                .fill(0)
                                .map((item, index) => (
                                    <RoomCard.Loading key={index} />
                                ))}
                        </Grid>
                    </Container>
                </>
            )}

            {!dataLoading && (
                <>
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
                            {roomList?.slice(0, visible).map((room) => (
                                <RoomCard
                                    key={room._id}
                                    room={room}
                                    handleLikeClass={handleLikeClass}
                                    handleLike={handleLike}
                                />
                            ))}
                        </Grid>
                        <Box sx={{ width: "100%", display: "flex" }}>
                            <LoadMoreBtn
                                className="room-list_load-button"
                                variant="outlined"
                                sx={{ mt: "30px", mx: "auto" }}
                                setVisible={setVisible}
                                loadNumber={8}
                            >
                                Load More
                            </LoadMoreBtn>
                        </Box>
                    </Container>
                </>
            )}

            <RoomFilterModal onOpen={open} onClose={handleClose} />
        </div>
    );
}

export default RoomListPage;
