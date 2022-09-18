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

const { EDIT } = FUNCTIONALITY;

const Edit = () => {
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
            functionality={EDIT}
            defaultValues={defaultValues}
            columns={formColumns}
            validator={roomSchema}
            getRequest={roomApi.getRoomDetails}
            postRequest={{ mutatePhoto: roomApi.updateRoomPhoto }}
            putRequest={roomApi.updateRoom}
        />
    );
};

export default Edit;
