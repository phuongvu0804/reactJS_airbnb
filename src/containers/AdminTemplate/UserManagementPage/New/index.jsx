// Components
import Form from "../../components/Form";

// Input validator
import { userSchema } from "@/validators";

// Constants
import { FUNCTIONALITY } from "@/constants";

// Apis
import { userApi } from "@/api";

const { ADD } = FUNCTIONALITY;

const inputs = [
    {
        id: 1,
        name: "name",
        label: "Full Name",
        type: "text",
        placeholder: "Le Nguyen Anh Tu",
    },
    {
        id: 2,
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "tu.lna07@gmail.com",
    },
    {
        id: 3,
        name: "gender",
        label: "Gender",
        type: "radio",
    },
    {
        id: 4,
        name: "password",
        label: "Password",
        type: "password",
    },
    {
        id: 5,
        name: "phone",
        label: "Phone",
        type: "text",
        placeholder: "0946688199",
    },
    {
        id: 6,
        name: "birthday",
        label: "Birthday",
        type: "date",
    },
    {
        id: 7,
        name: "address",
        label: "Address",
        type: "text",
        placeholder: "170 St. Esdan, Wakanda, Earth",
    },
];

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
            inputs={inputs}
            validator={userSchema.add}
            postRequest={{ mutateDetails: userApi.addUser }}
        />
    );
};

export default New;
