import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Material UI
import { Favorite } from "@mui/icons-material";
import { Divider, IconButton } from "@mui/material";
import { Box } from "@mui/system";

//Components
import Image from "@/components/Image";

//Others
import { handleLike } from "@/constants";

const WishItem = ({ data }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const roomsSaved = useSelector((state) => state.roomDetails.roomSaved);

    return (
        <li className="user-details__saved-room-item">
            <Box onClick={() => navigate(`/room-details/${data.id}`)}>
                <Image src={data?.hinhAnh} alt={data?.tenPhong} />
                <div className="saved-room-item__content">
                    <h4>{data?.tenPhong}</h4>
                    <Box sx={{ display: "flex" }}>
                        <span className="room-card__body-item">{data.phongNgu} bedroom</span>
                        <Divider sx={{ marginRight: "6px" }} orientation="vertical" flexItem />
                        <span className="room-card__body-item">{data.phongTam} bathroom</span>
                        <Divider sx={{ marginRight: "6px" }} orientation="vertical" flexItem />
                        <span className="room-card__body-item">{data.bep ? "Kitchen available" : "No kitchen"}</span>
                    </Box>
                </div>
            </Box>
            <IconButton
                className="saved-room-item__button"
                onClick={() => handleLike(data.id, roomsSaved, dispatch, navigate)}
            >
                <Favorite />
            </IconButton>
        </li>
    );
};

export default WishItem;
