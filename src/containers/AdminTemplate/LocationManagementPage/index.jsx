// Components
import Datatable from "../components/Datatable";

// Api
import { locationApi } from "@/api";

// Style
import "./style.scss";

// Columns
import { columns } from "./columns";

const LocationManagementPage = () => {
    return (
        <Datatable
            columns={columns}
            getRequest={locationApi.getLocationList}
            deleteRequest={locationApi.deleteLocation}
            rowsPerPageOptions={[3, 4, 5]}
            rowHeight={80}
        />
    );
};

export default LocationManagementPage;
