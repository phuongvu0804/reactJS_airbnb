// Components
import Datatable from "../components/Datatable";

// Api
import { locationApi } from "@/api";

// Style
import "./style.scss";

// Columns
import { tableColumns } from "./tableColumns";

const LocationManagementPage = () => {
    return (
        <Datatable
            columns={tableColumns}
            getRequest={locationApi.getLocations}
            deleteRequest={locationApi.deleteLocation}
            rowsPerPageOptions={[3, 4, 5]}
            rowHeight={80}
        />
    );
};

export default LocationManagementPage;
