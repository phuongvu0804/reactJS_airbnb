// Components
import Form from "../../components/Form";

// Input validator
import { userSchema } from "@/validators";

// Constants
import { FUNCTIONALITY } from "@/constants";

// Apis
import { userApi } from "@/api";

// Columns
import { columns } from "./columns";

const { EDIT } = FUNCTIONALITY;

const defaultValues = {
    name: "",
    email: "",
    phone: "",
    birthday: "",
    gender: true,
    type: "ADMIN",
    address: "",
};

const Edit = () => {
    return (
        <Form
            functionality={EDIT}
            defaultValues={defaultValues}
            columns={columns}
            validator={userSchema.edit}
            getRequest={userApi.getUserDetails}
            putRequest={userApi.updateUser}
        />
    );
};

export default Edit;
