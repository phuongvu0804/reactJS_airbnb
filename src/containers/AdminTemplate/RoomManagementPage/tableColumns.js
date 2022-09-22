import Image from "@/components/Image";

export const tableColumns = [
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
        headerAlign: "center",
        renderCell: (params) => {
            return (
                <Image
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
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
            if (!params.row.price) {
                return <span>${0}</span>;
            }

            const formattedCurrency = params.row.price
                .toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                })
                .slice(0, -3);

            return <span>{formattedCurrency}</span>;
        },
    },
    {
        field: "guests",
        headerName: "Guest",
        flex: 0.8,
        align: "center",
        headerAlign: "center",
    },
    {
        field: "bedRoom",
        headerName: "Bedroom",
        flex: 1,
        align: "center",
        headerAlign: "center",
    },
    {
        field: "bath",
        headerName: "Bath",
        flex: 0.8,
        align: "center",
        headerAlign: "center",
    },
    {
        field: "description",
        headerName: "Description",
        flex: 3.5,
        headerAlign: "center",
    },
];
