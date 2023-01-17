// Components
import Form from "../../components/Form";

// Input validator
import { locationSchema } from "@/validators";

// Constants
import { FUNCTIONALITY } from "@/constants";

// Apis
import { locationApi } from "@/api";

// Columns
import { formColumns } from "../formColumns";

const { EDIT } = FUNCTIONALITY;

const defaultValues = {
    tenViTri: "",
    tinhThanh: "",
    quocGia: "",
    hinhAnh: null,
};

const Edit = () => {
    return (
        <Form
            functionality={EDIT}
            defaultValues={defaultValues}
            columns={formColumns}
            validator={locationSchema}
            getRequest={locationApi.getLocationDetails}
            postRequest={{ mutatePhoto: locationApi.updateLocationPhoto }}
            putRequest={locationApi.updateLocation}
        />
    );
};

export default Edit;
