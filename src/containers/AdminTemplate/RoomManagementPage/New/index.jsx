// Components
import Form from "../../components/Form";

// Input validator
import { locationSchema } from "@/validators";

// Constants
import { FUNCTIONALITY } from "@/constants";

// Apis
import { locationApi } from "@/api";

// Columns
import { columns } from "./columns";

const { ADD } = FUNCTIONALITY;

const defaultValues = {
    name: "Phòng Siêu Vip Pro",
    guests: 2,
    bedRoom: 2,
    bath: 3,
    description: "Khách Sạn này thật tuyệt vời",
    price: 100000,
    facilities: [],
    locationId: "617af2e4da03f39db76165fe",
};

const New = () => {
    return (
        <Form
            functionality={ADD}
            defaultValues={defaultValues}
            columns={columns}
            validator={locationSchema}
            postRequest={{
                mutateDetails: locationApi.addLocation,
                mutatePhoto: locationApi.updateLocationPhoto,
            }}
        />
    );
};

export default New;
