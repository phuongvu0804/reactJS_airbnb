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
import { formColumns } from "../formColumns";

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
        image: null,
    };

    return (
        <Form
            functionality={ADD}
            defaultValues={defaultValues}
            columns={formColumns}
            validator={roomSchema}
            postRequest={{
                mutateDetails: roomApi.createRoom,
                mutatePhoto: roomApi.updateRoomPhoto,
            }}
        />
    );
};

export default New;
