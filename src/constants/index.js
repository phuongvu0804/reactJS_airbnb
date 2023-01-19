import { actCreateSave } from "@/store/actions/roomDetails";

const ROLE = {
    ADMIN: "ADMIN",
    CLIENT: "CLIENT",
};

const FUNCTIONALITY = {
    ADD: "Add",
    EDIT: "Edit",
    DETAILS: "Details",
};

const LOCAL_STORAGE_KEY = "user";

const calculateTotalGuest = (guestNumber) => {
    let guestTotal = 0;
    for (let guest in guestNumber) {
        guestTotal += guestNumber[guest];
    }
    return guestTotal;
};

const handleLike = (roomId, likedRoomList, dispatch, navigate) => {
    const user = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (user) {
        if (likedRoomList.length !== 0) {
            let filteredList = [...likedRoomList];
            const isExisted = filteredList.indexOf(roomId) !== -1;

            //If user already liked the room, remove this id
            if (isExisted) {
                filteredList = filteredList.filter((item) => item !== roomId);
            } else {
                filteredList = [...filteredList, roomId];
            }

            dispatch(actCreateSave(filteredList));
        } else {
            dispatch(actCreateSave([roomId]));
        }
    } else {
        navigate("/auth/login");
    }
};

export { ROLE, FUNCTIONALITY, LOCAL_STORAGE_KEY, calculateTotalGuest, handleLike };
