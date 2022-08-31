import React from "react";
import Image from "@/components/Image";
import WaveSkeleton from "@/components/WaveSkeleton";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { callApi } from "@/api/config/request";
import { roomApi } from "@/api";
import { useState } from "react";
import { actCreateSaveFail } from "@/store/actions/roomDetails";
import { KeyboardReturnOutlined } from "@mui/icons-material";

function WishList({ data }) {
    const dispatch = useDispatch();
    const [wishList, setWishList] = useState([]);

    useEffect(() => {
        if (data.length !== 0) {
            Promise.all(data.map((item) => roomApi.getRoomDetails(item)))
                .then((response) => {
                    setWishList(response);
                })
                .catch((error) => dispatch(actCreateSaveFail(error)));
        }
    }, []);

    const WishList = ({ data }) => {
        if (data.length !== 0) {
            return data?.map((item, index) => {
                return (
                    <li key={index} className="user-details__saved-room-item">
                        <Image src={item?.data.image} alt={item?.data.name} />
                        <div className="saved-room-item__content">
                            <h4>{item?.data.name}</h4>
                            <p>{item?.data.locationId?.name}</p>
                        </div>
                    </li>
                );
            });
        } else {
            return <p>Your wishlist is empty</p>;
        }
    };

    return (
        <ul className="user-details__saved-room-list">
            <h4 className="profile__sub-title">Your wishlists</h4>
            <WishList data={wishList} />
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
