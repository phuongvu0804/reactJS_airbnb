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
    }),
    edit: yup.object({
        name: yup.string().required(msg.required),
        email: yup.string().required(msg.required).email(msg.email),
        gender: yup.boolean(),
        birthday: yup.date().nullable().typeError(msg.birthday.invalid).max(yesterday, msg.birthday.max),
        phone: yup.string().required(msg.required).matches(pattern.phone, msg.phone),
    }),
};

/*
 *  Location
 */
const locationSchema = yup.object({
    tenViTri: yup.string().required(msg.required),
    tinhThanh: yup.string().required(msg.required),
    quocGia: yup.string().required(msg.required),
    // valueate: yup.number(),
});

/*
 *  Room
 */
const roomSchema = yup.object({
    tenPhong: yup.string().required(msg.required),
    khach: yup.number(),
    phongNgu: yup.number(),
    phongTam: yup.number(),
    moTa: yup.string().required(msg.required),
    giaTien: yup.number(),
    facilities: yup.array(),
    // locationId: yup.string(),
});

export { userSchema, locationSchema, roomSchema };
