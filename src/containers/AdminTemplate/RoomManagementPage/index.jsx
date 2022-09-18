import { useSearchParams } from "react-router-dom";

// Components
import Datatable from "../components/Datatable";

// Api
import { roomApi } from "@/api";

// Style
import "./style.scss";

// Columns
import { tableColumns } from "./tableColumns";

const RoomManagementPage = () => {
    const [searchParams, _] = useSearchParams();
    const locationId = searchParams.get("location");

    return (
        <Datatable
            columns={tableColumns}
            getRequest={() => roomApi.getRoomList(locationId)}
            deleteRequest={roomApi.deleteRoom}
            rowsPerPageOptions={[3, 4, 5]}
            rowHeight={80}
        />
    );
};

export default RoomManagementPage;
