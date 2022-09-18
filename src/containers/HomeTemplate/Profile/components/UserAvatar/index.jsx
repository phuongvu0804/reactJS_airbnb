import { useState, useEffect } from "react";

//Material UI
import Image from "@/components/Image";

//Components
import { Button, Alert } from "@mui/material";
import WaveSkeleton from "@/components/WaveSkeleton";

//Others
import "./style.scss";
import { userApi } from "@/api";
import { callApi } from "@/api/config/request";

function UserAvatar() {
    const [serverResponse, setServerResponse] = useState(null);
    const [avatar, setAvatar] = useState(
        "https://a0.muscache.com/im/pictures/user/64649d26-ed0f-4dbf-bee9-ba973b94398b.jpg?aki_policy=profile_large",
    );

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (serverResponse) {
                setServerResponse(null);
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [serverResponse]);

    const handleEditAvatar = (file) => {
        let formData = new FormData();
        formData.append("File", file, "avatar");
        callApi(
            userApi.editUserPhoto(formData),
            (response) => {
                setAvatar(response);
                setServerResponse({
                    type: "success",
                    content: "Your avatar has been updated successfully!",
                });
            },
            (error) => {
                setServerResponse({
                    type: "error",
                    content: error || "Sorry, there was an error from the server",
                });
            },
        );
    };

    return (
        <div className="user-avatar">
            <Image src={avatar} alt="user's avatar" />
            <label htmlFor="avatarinput"></label>
            <Button
                variant="text"
                component="label"
                sx={{ color: "var(--black)", textDecoration: "underline", textTransform: "none" }}
            >
                Update photo
                <input
                    id="avatarinput"
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={(e) => handleEditAvatar(e.target.files[0])}
                />
            </Button>
            {serverResponse && (
                <Alert severity={serverResponse.type} sx={{ mb: "10px" }}>
                    {serverResponse.content}
                </Alert>
            )}
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
