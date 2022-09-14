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

const { EDIT } = FUNCTIONALITY;

const defaultValues = {
    name: "",
    province: "",
    country: "",
    valueate: 0,
    image: null,
};

const Edit = () => {
    return (
        <Form
            functionality={EDIT}
            defaultValues={defaultValues}
            columns={columns}
            validator={locationSchema}
            getRequest={locationApi.getLocationDetails}
            postRequest={{ mutatePhoto: locationApi.updateLocationPhoto }}
            putRequest={locationApi.updateLocation}
        />
    );
};

export default Edit;
