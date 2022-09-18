// Components
import Form from "../../components/Form";

// Input validator
import { userSchema } from "@/validators";

// Constants
import { FUNCTIONALITY } from "@/constants";

// Apis
import { userApi } from "@/api";

// Columns
import { formColumns, passwordColumn } from "../formColumns";

const { ADD } = FUNCTIONALITY;

const defaultValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    gender: true,
    type: "ADMIN",
    address: "",
};

let formColumnsWithPassword = [...formColumns];
formColumnsWithPassword.splice(4, 0, passwordColumn);

const New = () => {
    return (
        <Form
            functionality={ADD}
            defaultValues={defaultValues}
            columns={formColumnsWithPassword}
            validator={userSchema.add}
            postRequest={{ mutateDetails: userApi.addUser }}
        />
    );
};

export default New;
