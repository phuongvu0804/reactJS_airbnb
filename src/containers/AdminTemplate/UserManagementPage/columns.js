// Format date
import moment from "moment";

export const columns = [
    {
        field: "name",
        headerName: "Full name",
        flex: 2.8,
    },
    {
        field: "email",
        headerName: "Email",
        flex: 2.5,
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
