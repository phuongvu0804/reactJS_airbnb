import React from "react";

//Material UI
import Image from "@/components/Image";

//Components
import { Button } from "@mui/material";
import WaveSkeleton from "@/components/WaveSkeleton";

//Others
import "./style.scss";

function UserAvatar() {
    return (
        <div className="user-avatar">
            <Image
                src="https://a0.muscache.com/im/pictures/user/64649d26-ed0f-4dbf-bee9-ba973b94398b.jpg?aki_policy=profile_large"
                alt="user's avatar"
            />
            <Button variant="text">Update photo</Button>
        </div>
    );
}

function Loading() {
    return (
        <div className="user-avatar">
            <WaveSkeleton variant="circular" sx={{ width: "128px", height: "128px" }} />
            <WaveSkeleton variant="text" sx={{ fontSize: "14px", width: "100px" }} />
        </div>
    );
}

UserAvatar.Loading = Loading;
export default UserAvatar;
