// Components
import Form from "../../components/Form";

// Input validator
import { locationSchema } from "@/validators";

// Constants
import { FUNCTIONALITY } from "@/constants";

// Apis
import { locationApi } from "@/api";

// Columns
import { formColumns } from "../formColumns";

const { DETAILS } = FUNCTIONALITY;

const defaultValues = {
    name: "",
    province: "",
    country: "",
    valueate: 0,
    image: null,
};

const Details = () => {
    return (
        <Form
            functionality={DETAILS}
            defaultValues={defaultValues}
            columns={formColumns}
            getRequest={locationApi.getLocationDetails}
        />
    );
};

export default Details;
