import { useLocation } from "react-router-dom";

// Components
import Form from "../../components/Form";

// Input validator
import { roomSchema } from "@/validators";

// Constants
import { FUNCTIONALITY } from "@/constants";

// Apis
import { roomApi } from "@/api";

// Columns
import { formColumns } from "../formColumns";

const { EDIT } = FUNCTIONALITY;

const Edit = () => {
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
            functionality={EDIT}
            defaultValues={defaultValues}
            columns={formColumns}
            validator={roomSchema}
            getRequest={roomApi.getRoomDetails}
            postRequest={{ mutatePhoto: roomApi.updateRoomPhoto }}
            putRequest={roomApi.updateRoom}
        />
    );
};

export default Edit;
