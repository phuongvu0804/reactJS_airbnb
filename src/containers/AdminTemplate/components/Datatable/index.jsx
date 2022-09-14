import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

// Material UI
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { Delete, Edit, Search, Clear, MeetingRoomOutlined } from "@mui/icons-material";

// Redux actions
import { actOpenModal } from "@/store/actions/admin";

// Style
import "./style.scss";

const Datatable = ({ columns, getRequest, deleteRequest, ...tableControls }) => {
    const dispatch = useDispatch();

    /*
     *  Get subpaths
     */
    const { pathname } = useLocation();
    const [rootPage, firstLevelSubpath] = pathname.split("/").slice(1);
    const queryKey = `${rootPage}/${firstLevelSubpath}`;

    /*
     *  Fetch users
     */
    const { data, isLoading } = useQuery(queryKey, getRequest, {
        refetchOnWindowFocus: false,
    });
    let rows = data?.data || [];

    /*
     *  Handle search users
     */
    const [searchedUsers, setSearchedUsers] = useState(null);
    const [clearSearch, setClearSearch] = useState(false);
    const searchKey = useRef("");
    const handleSearch = (event) => {
        // If search input is empty
        //   return all users
        const { value } = event.target;
        searchKey.current = value;
        if (!value) {
            setSearchedUsers(rows);
            setClearSearch(false);
            return;
        }

        setClearSearch(true);

        const searchedUsers = rows.filter((row) => {
            if (typeof row.name !== "string") {
                return false;
            }

            const found = row.name.toLowerCase().includes(value.toLowerCase());

            return found;
        });

        setSearchedUsers(searchedUsers);
    };

    const handleClearSearch = () => {
        handleSearch({ target: { value: "" } });
    };

    /*
     *  Handle delete user
     */
    const queryClient = useQueryClient();
    const { mutate } = useMutation(deleteRequest, {
        mutationKey: `${rootPage}/${firstLevelSubpath}/delete`,
        onSuccess: () => {
            dispatch(actOpenModal(`Delete ${firstLevelSubpath.slice(0, -1)} successfully!`));
            (async () => {
                await queryClient.invalidateQueries(queryKey);
                rows = queryClient.getQueryData(queryKey).data;
                handleSearch({ target: { value: searchKey.current } });
            })();
        },
    });

    const handleDelete = (id) => {
        mutate(id);
    };

    /*
     *  Handle change page size
     */
    const [pageSize, setPageSize] = useState(tableControls.rowsPerPageOptions[0]);
    const handleChangePageSize = (pageSize) => {
        setPageSize(pageSize);
    };

    const actionColumn = [
        {
            field: "actions",
            headerName: "Actions",
            flex: 1.5,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => (
                <div className="cell-actions">
                    {firstLevelSubpath === "locations" && (
                        <Link
                            to={`/${rootPage}/rooms?location=${params.row._id}`}
                            state={{ prevPath: "locations" }}
                            style={{ textDecoration: "none" }}
                        >
                            <IconButton className="cell-action btn-view-rooms">
                                <MeetingRoomOutlined />
                            </IconButton>
                        </Link>
                    )}
                    <Link to={`edit/${params.row._id}`} style={{ textDecoration: "none" }}>
                        <IconButton className="cell-action btn-edit">
                            <Edit />
                        </IconButton>
                    </Link>
                    <IconButton className="cell-action btn-delete" onClick={() => handleDelete(params.row._id)}>
                        <Delete />
                    </IconButton>
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="datatable-wrapper">
                <div className="datatable">
                    <div className="top">
                        <div className="search">
                            <input
                                value={searchKey.current}
                                type="text"
                                placeholder="Enter name ..."
                                onChange={handleSearch}
                            />
                            {clearSearch ? (
                                <Clear onClick={handleClearSearch} sx={{ cursor: "pointer" }} />
                            ) : (
                                <Search />
                            )}
                        </div>
                        <Link to="new" className="link">
                            <strong>+</strong> Add New
                        </Link>
                    </div>
                    <DataGrid
                        className={`data-grid data-grid-${firstLevelSubpath}`}
                        rows={searchedUsers || rows}
                        columns={columns.concat(actionColumn)}
                        pageSize={pageSize}
                        onPageSizeChange={handleChangePageSize}
                        getRowId={(row) => row._id}
                        autoHeight
                        loading={isLoading}
                        headerHeight={45}
                        {...tableControls}
                    />
                </div>
            </div>
        </>
    );
};

export default Datatable;
