import { useLocation } from "react-router-dom";

// Components
import Form from "../../components/Form";

// Constants
import { FUNCTIONALITY } from "@/constants";

// Apis
import { roomApi } from "@/api";

// Columns
import { formColumns } from "../formColumns";

const { DETAILS } = FUNCTIONALITY;

const Details = () => {
    const { state } = useLocation();

    const defaultValues = {
        tenPhong: "",
        khach: 0,
        phongNgu: 0,
        phongTam: 0,
        moTa: "",
        giaTien: 0,
        facilities: [],
        maViTri: state?.id,
        hinhAnh: null,
    };

    return (
        <Form
            functionality={DETAILS}
            defaultValues={defaultValues}
            columns={formColumns}
            getRequest={roomApi.getRoomDetails}
        />
    );
};

export default Details;
