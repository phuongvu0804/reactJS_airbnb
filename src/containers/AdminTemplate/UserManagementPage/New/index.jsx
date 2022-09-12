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

const New = () => {
    return (
        <Form
            functionality={ADD}
            defaultValues={defaultValues}
            columns={columns}
            validator={userSchema.add}
            postRequest={{ mutateDetails: userApi.addUser }}
        />
    );
};

export default New;
