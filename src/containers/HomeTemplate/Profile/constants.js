const { BeenhereOutlined } = require("@mui/icons-material");

const verificationInfo = {
    icon: <BeenhereOutlined />,
    title: "Identity verification",
    desc: "Show others you’re really you with the identity verification badge.",
};

const successDeleteAlert = {
    state: true,
    type: "success",
    title: "Success",
    content: "You have deleted successfully your booking",
};

const errorDeleteAlert = {
    state: true,
    type: "error",
    title: "Error",
    content: "Oops! Something went wrong, you cannot delete your booking at this time.",
};

const VerifiedData = ["Email address", "Phone number"];
export { verificationInfo, VerifiedData, successDeleteAlert, errorDeleteAlert };
