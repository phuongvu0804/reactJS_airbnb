import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

// Material UI
import { DataGrid } from "@mui/x-data-grid";

// Components
import Breadcrumbs from "../Breadcrumbs";

// Style
import "./style.scss";

const Datatable = ({ title, columns, rows, loading, deleteRow }) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation(deleteRow, {
        onSuccess: () => {
            queryClient.invalidateQueries(title);
        },
    });

    const handleDelete = (id) => {
        mutate(id);
    };

    const actionColumn = [
        {
            field: "actions",
            headerName: "Actions",
            flex: 1.7,
            renderCell: (params) => (
                <div className="cell-actions">
                    <Link to="/users/test" style={{ textDecoration: "none" }}>
                        <div className="cell-action btn-view">Edit</div>
                    </Link>
                    <div className="cell-action btn-delete" onClick={() => handleDelete(params.row._id)}>
                        Delete
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="datatable">
            <div className="top">
                <Breadcrumbs />
                <Link to="new" className="link">
                    <strong>+</strong> Add New
                </Link>
            </div>
            <DataGrid
                className="data-grid"
                rows={rows}
                columns={columns.concat(actionColumn)}
                pageSize={8}
                rowsPerPageOptions={[8, 15, 25]}
                getRowId={(row) => row._id}
                autoHeight
                loading={loading}
                headerHeight={45}
                rowHeight={40}
            />
        </div>
    );
};

export default Datatable;
