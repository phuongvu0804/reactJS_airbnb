import * as yup from "yup";
import msg from "./messages";

const filterSchema = yup.object().shape({
    minPrice: yup.number().typeError(msg.number).min(0, msg.positiveNumber),
    maxPrice: yup.number().typeError(msg.number).max(1000000000, msg.maxPrice),
    totalGuest: yup.number().typeError(msg.number).min(0, msg.positiveNumber),
});

export default filterSchema;
