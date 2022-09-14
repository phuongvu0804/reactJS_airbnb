// Material UI
import { Stack } from "@mui/material";
import { Star } from "@mui/icons-material";

export const columns = [
    {
        field: "name",
        headerName: "Room",
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
        field: "price",
        headerName: "Price",
        flex: 1,
    },
    {
        field: "guests",
        headerName: "Guest",
        flex: 1,
    },
    {
        field: "bedRoom",
        headerName: "Bedroom",
        flex: 1,
    },
    {
        field: "bath",
        headerName: "Bath",
        flex: 1,
    },
];
