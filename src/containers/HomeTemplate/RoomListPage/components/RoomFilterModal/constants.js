const initialValues = {
    minPrice: 0,
    maxPrice: 10000000,
    totalGuest: 0,
    bedroom: "0",
    bathroom: "0",
    wifi: false,
    hotTub: false,
    pool: false,
    dryer: false,
    heating: false,
    cableTV: false,
    indoorFireplace: false,
    gym: false,
    elevator: false,
};

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "var(--white)",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const radioOptions = [
    {
        label: "Any",
        value: 0,
    },
    {
        label: "1",
        value: 1,
    },
    {
        label: "2",
        value: 2,
    },
    {
        label: "3",
        value: 3,
    },
    {
        label: "4",
        value: 4,
    },
    {
        label: "5",
        value: 5,
    },
    {
        label: "6",
        value: 6,
    },
    {
        label: "7",
        value: 7,
    },
    {
        label: "8+",
        value: 8,
    },
];

const checkBoxOptions_essentials = [
    { label: "Wifi", value: "wifi" },
    { label: "HotTub", value: "hotTub" },
    { label: "Pool", value: "pool" },
    { label: "Dryer", value: "dryer" },
    { label: "Heating", value: "heating" },
    { label: "TV", value: "cableTV" },
    { label: "Fireplace", value: "indoorFireplace" },
];

const checkBoxOptions_features = [
    { label: "Gym", value: "gym" },
    { label: "Elevator", value: "elevator" },
];

export { initialValues, style, radioOptions, checkBoxOptions_essentials, checkBoxOptions_features };
