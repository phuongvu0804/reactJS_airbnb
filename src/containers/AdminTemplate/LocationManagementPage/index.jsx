// Material UI
import { Stack } from "@mui/material";
import { Star } from "@mui/icons-material";

// Components
import Datatable from "../components/Datatable";

// Api
import { locationApi } from "@/api";

// Style
import "./style.scss";

const columns = [
    {
        field: "name",
        headerName: "Location",
        flex: 2,
    },

    {
        field: "image",
        headerName: "Image",
        flex: 2,
        align: "center",
        renderCell: (params) => {
            return (
                <img
                    width="120"
                    height="70"
                    style={{ objectFit: "cover" }}
                    src={params.row.image}
                    alt={params.row.name}
                />
            );
        },
    },
    {
        field: "valueate",
        headerName: "Rating",
        flex: 1,
        align: "center",
        renderCell: (params) => {
            const perfectRating = params.row.valueate === 10;
            const perfectRatingClass = perfectRating ? "perfect" : "";

            return (
                <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    className={`rating-wrapper ${perfectRatingClass}`}
                >
                    <span>{params.row.valueate}</span> <Star className={`star ${perfectRatingClass}`} />
                </Stack>
            );
        },
    },
    {
        field: "country",
        headerName: "Country",
        flex: 1.2,
    },
    {
        field: "province",
        headerName: "Province",
        flex: 2,
    },
];

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
