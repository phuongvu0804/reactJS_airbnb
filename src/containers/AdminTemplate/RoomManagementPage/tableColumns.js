import Image from "@/components/Image";

export const tableColumns = [
    {
        field: "tenPhong",
        headerName: "Room",
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
                    alt={params.row.tenPhong}
                />
            );
        },
    },
    {
        field: "giaTien",
        headerName: "Price",
        flex: 1,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
            if (!params.row.giaTien) {
                return <span>${0}</span>;
            }

            const formattedCurrency = params.row.giaTien
                .toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                })
                .slice(0, -3);

            return <span>{formattedCurrency}</span>;
        },
    },
    {
        field: "khach",
        headerName: "Guest",
        flex: 0.8,
        align: "center",
        headerAlign: "center",
    },
    {
        field: "phongNgu",
        headerName: "Bedroom",
        flex: 1,
        align: "center",
        headerAlign: "center",
    },
    {
        field: "phongTam",
        headerName: "Bath",
        flex: 0.8,
        align: "center",
        headerAlign: "center",
    },
    {
        field: "moTa",
        headerName: "Description",
        flex: 3.5,
        headerAlign: "center",
    },
];
