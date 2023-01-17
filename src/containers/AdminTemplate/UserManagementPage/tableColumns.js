// Format date
import moment from "moment";

export const tableColumns = [
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
            const momentDate = moment(params.row.birthday).format("DD-MM-YYYY");
            const date = momentDate === "Invalid date" ? params.row.birthday : momentDate;
            return <div>{date}</div>;
        },
    },
    {
        field: "phone",
        headerName: "Phone",
        flex: 1.7,
        align: "center",
        headerAlign: "center",
    },
];
