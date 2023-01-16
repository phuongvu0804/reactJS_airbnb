import {
    AcUnit,
    ChatOutlined,
    DoorFrontOutlined,
    Elevator,
    Fireplace,
    HotTub,
    LocalFireDepartment,
    LocalLaundryService,
    LocalParking,
    PinDropOutlined,
    Pool,
    SportsGymnastics,
    Tv,
    Wifi,
} from "@mui/icons-material";
import moment from "moment";

const rules = [
    {
        name: "Self check-in",
        content: "You can check in with the doorman.",
        icon: <DoorFrontOutlined className="rule-item__icon" />,
    },
    {
        name: "Great location",
        content: "100% of recent guests gave the location a 5-star rating.",
        icon: <PinDropOutlined className="rule-item__icon" />,
    },
    {
        name: "Great communication",
        content: "93% of recent guests rated Amsterdam The Crane By YAYS 5-star in communication.",
        icon: <ChatOutlined className="rule-item__icon" />,
    },
];

const amenities = [
    { name: "Wifi", id: "wifi", icon: <Wifi className="amenities__icon" /> },
    { name: "Parking", id: "doXe", icon: <LocalParking className="amenities__icon" /> },
    { name: "Television", id: "tivi", icon: <Tv className="amenities__icon" /> },
    { name: "Pool", id: "hoBoi", icon: <Pool className="amenities__icon" /> },
    { name: "Air conditioner", id: "dieuHoa", icon: <AcUnit className="amenities__icon" /> },
    { name: "Washing machine", id: "mayGiat", icon: <LocalLaundryService className="amenities__icon" /> },
];

const today = moment();

export { rules, amenities, today };
