import {
    ChatOutlined,
    DoorFrontOutlined,
    Elevator,
    Fireplace,
    HotTub,
    LocalFireDepartment,
    LocalLaundryService,
    PinDropOutlined,
    Pool,
    SportsGymnastics,
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
    { name: "Elevator", id: "elevator", icon: <Elevator className="amenities__icon" /> },
    { name: "Hot tub", id: "hotTub", icon: <HotTub className="amenities__icon" /> },
    { name: "Pool", id: "pool", icon: <Pool className="amenities__icon" /> },
    { name: "Fireplace", id: "indoorFireplace", icon: <Fireplace className="amenities__icon" /> },
    { name: "Dryer", id: "dryer", icon: <LocalLaundryService className="amenities__icon" /> },
    { name: "Gym", id: "gym", icon: <SportsGymnastics className="amenities__icon" /> },
    { name: "Heating", id: "heating", icon: <LocalFireDepartment className="amenities__icon" /> },
];

const today = moment();

export { rules, amenities, today };
