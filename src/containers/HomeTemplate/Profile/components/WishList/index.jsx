import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//components
import Image from "@/components/Image";
import WaveSkeleton from "@/components/WaveSkeleton";

//Others
import { actCreateSaveFail, actGetRoomDetailsFail } from "@/store/actions/roomDetails";
import { roomApi } from "@/api";
import WishItem from "./components/WishItem";
import { Skeleton } from "@mui/material";

function WishList() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.roomDetails.roomSaved);
    const [wishList, setWishList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setWishList([]);

        //add loading when waiting for api fetching

        if (data?.length !== 0) {
            setLoading(true);
            Promise.all(data.map((item) => roomApi.getRoomDetails(item)))

                .then((response) => {
                    response.forEach((item) => setWishList((prev) => [...prev, item.data.content]));
                })
                .catch((error) => dispatch(actGetRoomDetailsFail(error)))
                .finally(() => setLoading(false));
        }
    }, [data]);
    console.log(wishList);

    const renderWishList = () => {
        if (wishList?.length !== 0) {
            return wishList.map((item, index) => {
                return <WishItem key={index} data={item} />;
            });
        } else if (wishList?.length !== 0 && !loading) {
            return <p>Your wishlist is empty</p>;
        }
    };

    return (
        <ul className="user-details__saved-room-list">
            <h4 className="profile__sub-title">Your wishlists</h4>
            {loading && <Skeleton variant="rounded" width="100%" height={60} />}
            <div>{renderWishList()}</div>
        </ul>
    );
}

function Loading() {
    return (
        <ul className="user-details__saved-room-list">
            <h4 className="profile__sub-title">Your wishlist</h4>
            {Array(2)
                .fill(0)
                .map((item, index) => (
                    <li key={index} className="user-details__saved-room-item">
                        <WaveSkeleton variant="circular" sx={{ width: "56px", height: "56px" }} />
                        <div className="saved-room-item__content">
                            <WaveSkeleton variant="text" sx={{ fontSize: "16px", width: "300px" }} />
                            <WaveSkeleton variant="text" sx={{ fontSize: "16px", width: "200px" }} />
                        </div>
                    </li>
                ))}
        </ul>
    );
}

WishList.Loading = Loading;

export default WishList;
