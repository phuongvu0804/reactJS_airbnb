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
    name: "",
    province: "",
    country: "",
    valueate: 0,
    image: null,
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
