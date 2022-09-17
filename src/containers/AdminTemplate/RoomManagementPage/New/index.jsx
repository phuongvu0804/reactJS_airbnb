import { useLocation } from "react-router-dom";

// Components
import Form from "../../components/Form";

// Input validator
import { roomSchema } from "@/validators";

// Constants
import { FUNCTIONALITY } from "@/constants";

// Apis
import { roomApi } from "@/api";

// Columns
import { columns } from "./columns";

const { ADD } = FUNCTIONALITY;

const New = () => {
    const { state } = useLocation();

    const defaultValues = {
        name: "",
        guests: 0,
        bedRoom: 0,
        bath: 0,
        description: "",
        price: 0,
        facilities: [],
        locationId: state?.id,
    };

    return (
        <Form
            functionality={ADD}
            defaultValues={defaultValues}
            columns={columns}
            validator={roomSchema}
            postRequest={{
                mutateDetails: roomApi.createRoom,
                mutatePhoto: roomApi.updateRoomPhoto,
            }}
        />
    );
};

export default New;
