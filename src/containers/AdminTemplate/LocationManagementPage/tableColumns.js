import Image from "@/components/Image";

// Material UI
import { Stack } from "@mui/material";
import { Star } from "@mui/icons-material";

export const tableColumns = [
    {
        field: "tenViTri",
        headerName: "Location",
        flex: 2,
    },
    {
        field: "hinhAnh",
        headerName: "Image",
        flex: 2,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
            return (
                <Image
                    width="120"
                    height="70"
                    style={{ objectFit: "cover" }}
                    src={params.row.hinhAnh}
                    alt={params.row.name}
                />
            );
        },
    },
    // {
    //     field: "valueate",
    //     headerName: "Rating",
    //     flex: 1,
    //     align: "center",
    //     headerAlign: "center",
    //     renderCell: (params) => {
    //         const perfectRating = params.row.valueate === 10;
    //         const perfectRatingClass = perfectRating ? "perfect" : "";

    //         return (
    //             <Stack
    //                 direction="row"
    //                 spacing={0.5}
    //                 alignItems="center"
    //                 justifyContent="center"
    //                 className={`rating-wrapper ${perfectRatingClass}`}
    //             >
    //                 <span>{params.row.valueate}</span> <Star className={`star ${perfectRatingClass}`} />
    //             </Stack>
    //         );
    //     },
    // },
    {
        field: "quocGia",
        headerName: "Country",
        flex: 1.8,
        align: "center",
        headerAlign: "center",
    },
    {
        field: "tinhThanh",
        headerName: "Province",
        flex: 2,
        headerAlign: "center",
    },
];
