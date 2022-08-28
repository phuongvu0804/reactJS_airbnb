import { useQuery } from "react-query";

// Components
import Datatable from "../components/Datatable";

// Api
import { userApi } from "@/api";

// Moment
import moment from "moment";

const columns = [
    {
        field: "name",
        headerName: "Full name",
        flex: 2.5,
    },
    {
        field: "email",
        headerName: "Email",
        flex: 2.8,
    },
    {
        field: "gender",
        headerName: "Gender",
        flex: 1.2,
        renderCell: (params) => {
            return <div>{params.row.gender ? "Male" : "Female"}</div>;
        },
    },
    {
        field: "birthday",
        headerName: "Birthday",
        flex: 1.5,
        renderCell: (params) => {
            return <div>{moment(params.row.birthday).format("DD-MM-YYYY")}</div>;
        },
    },
    {
        field: "phone",
        headerName: "Phone",
        flex: 1.5,
    },
    {
        field: "address",
        headerName: "Address",
        flex: 3.5,
    },
];

const UserManagementPage = () => {
    const { data, isLoading } = useQuery("users", userApi.getUsers);
    const users = data?.data ? [...data?.data].reverse() : [];

    return (
        <Datatable title={"users"} columns={columns} rows={users} loading={isLoading} deleteRow={userApi.deleteUser} />
    );
};

export default UserManagementPage;
