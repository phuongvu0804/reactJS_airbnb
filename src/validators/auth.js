import * as yup from "yup";
import pattern from "./pattern";
import msg from "./message";

// Log in
const loginSchema = yup.object({
    email: yup.string().required(msg.required).email(msg.email),
    password: yup.string().matches(pattern.password, msg.password),
});

// Sign up
const signupSchema = yup.object({
    name: yup.string().required(msg.required),
    email: yup.string().required(msg.required).email(msg.email),
    gender: yup.boolean(),
    birthday: yup.string().required(msg.required),
    password: yup.string().matches(pattern.password, msg.password),
    phone: yup.string().required(msg.required).matches(pattern.phone, msg.phone),
    address: yup.string().required(msg.required),
});

export { loginSchema, signupSchema };
