// Format date
import moment from "moment";

export const columns = [
    {
        field: "name",
        headerName: "Full Name",
        flex: 2.8,
    },
    {
        field: "email",
        headerName: "Email",
        flex: 2.5,
        headerAlign: "center",
    },
    {
        field: "gender",
        headerName: "Gender",
        flex: 1.2,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
            return <div>{params.row.gender ? "Male" : "Female"}</div>;
        },
    },
    {
        field: "birthday",
        headerName: "Birthday",
        flex: 1.7,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
            return <div>{moment(params.row.birthday).format("DD-MM-YYYY")}</div>;
        },
    },
    {
        field: "phone",
        headerName: "Phone",
        flex: 1.7,
        align: "center",
        headerAlign: "center",
    },
    {
        field: "address",
        headerName: "Address",
        flex: 3.5,
        headerAlign: "center",
    },
];
