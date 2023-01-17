import * as yup from "yup";
import pattern from "./pattern";
import msg from "./messages";

/*
 * Log in
 */
const loginSchema = yup.object({
    email: yup.string().required(msg.required).email(msg.email),
    password: yup.string().matches(pattern.password, msg.password),
});

/*
 * Sign up
 */
const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

const signupSchema = yup.object({
    name: yup.string().required(msg.required),
    email: yup.string().required(msg.required).email(msg.email),
    gender: yup.boolean(),
    birthday: yup.date().nullable().typeError(msg.birthday.invalid).max(yesterday, msg.birthday.max),
    password: yup.string().matches(pattern.password, msg.password),
    phone: yup.string().required(msg.required).matches(pattern.phone, msg.phone),
});

export { loginSchema, signupSchema };
