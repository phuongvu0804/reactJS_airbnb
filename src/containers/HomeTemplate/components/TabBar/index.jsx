import { useNavigate } from "react-router-dom";
import { useState } from "react";

//Material UI
import { Button } from "@mui/material";
import { noUserbuttonList, withUserbuttonList } from "./constants";

//Others
import "./style.scss";

function TabBar() {
    const [active, setActive] = useState(false);
    const navigate = useNavigate();

    const user = localStorage.getItem("user");
    const buttonList = user ? withUserbuttonList : noUserbuttonList;

    const handleClick = (item) => {
        if (item.title === "Log out") {
            localStorage.removeItem("user");
        }
        setActive(item.id);
        navigate(item.navigateTo);
    };

    const renderButtons = () => {
        return buttonList.map((item) => (
            <Button
                key={item.id}
                className={item.id === active ? "tab-bar__btn active" : "tab-bar__btn"}
                onClick={() => handleClick(item)}
            >
                {item.icon}
                {item.title}
            </Button>
        ));
    };
    return <div id="tab-bar">{renderButtons()}</div>;
}

export default TabBar;
