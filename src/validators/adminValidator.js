import * as yup from "yup";
import pattern from "./pattern";
import msg from "./messages";

/*
 *  User
 */
const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

const userSchema = {
    add: yup.object({
        name: yup.string().required(msg.required),
        email: yup.string().required(msg.required).email(msg.email),
        gender: yup.boolean(),
        birthday: yup.date().nullable().typeError(msg.birthday.invalid).max(yesterday, msg.birthday.max),
        password: yup.string().matches(pattern.password, msg.password),
        phone: yup.string().required(msg.required).matches(pattern.phone, msg.phone),
        address: yup.string().required(msg.required),
    }),
    edit: yup.object({
        name: yup.string().required(msg.required),
        email: yup.string().required(msg.required).email(msg.email),
        gender: yup.boolean(),
        birthday: yup.date().nullable().typeError(msg.birthday.invalid).max(yesterday, msg.birthday.max),
        phone: yup.string().required(msg.required).matches(pattern.phone, msg.phone),
        address: yup.string().required(msg.required),
    }),
};

/*
 *  Location
 */
const locationSchema = yup.object({
    name: yup.string().required(msg.required),
    province: yup.string().required(msg.required),
    country: yup.string().required(msg.required),
    valueate: yup.number(),
});

/*
 *  Room
 */
const roomSchema = yup.object({
    name: yup.string().required(msg.required),
    guests: yup.number(),
    bedRoom: yup.number(),
    bath: yup.number(),
    description: yup.string().required(msg.required),
    price: yup.number(),
    facilities: yup.array(),
    // locationId: yup.string(),
});

export { userSchema, locationSchema, roomSchema };
