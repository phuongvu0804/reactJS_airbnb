// Components
import Datatable from "../components/Datatable";

// Api
import { userApi } from "@/api";

// Columns
import { tableColumns } from "./tableColumns";

const UserManagementPage = () => {
    return (
        <Datatable
            columns={tableColumns}
            getRequest={userApi.getUsers}
            deleteRequest={userApi.deleteUser}
            rowsPerPageOptions={[4, 6, 8]}
            rowHeight={40}
        />
    );
};

export default UserManagementPage;
