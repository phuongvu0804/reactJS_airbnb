// Components
import Form from "../../components/Form";

// Input validator
import { userSchema } from "@/validators";

// Constants
import { FUNCTIONALITY } from "@/constants";

// Apis
import { userApi } from "@/api";

// Columns
import { formColumns } from "../formColumns";

const { DETAILS } = FUNCTIONALITY;

const defaultValues = {
    name: "",
    email: "",
    phone: "",
    birthday: "",
    gender: true,
    address: "",
};

const Details = () => {
    return (
        <Form
            functionality={DETAILS}
            defaultValues={defaultValues}
            columns={formColumns}
            getRequest={userApi.getUserDetails}
        />
    );
};

export default Details;
