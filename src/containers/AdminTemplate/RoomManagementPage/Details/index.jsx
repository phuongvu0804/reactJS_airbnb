import { useLocation } from "react-router-dom";

// Components
import Form from "../../components/Form";

// Constants
import { FUNCTIONALITY } from "@/constants";

// Apis
import { roomApi } from "@/api";

// Columns
import { formColumns } from "../formColumns";

const { DETAILS } = FUNCTIONALITY;

const Details = () => {
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
            functionality={DETAILS}
            defaultValues={defaultValues}
            columns={formColumns}
            getRequest={roomApi.getRoomDetails}
        />
    );
};

export default Details;
