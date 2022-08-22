// Material UI
import {
    Search,
    Language,
    DarkModeOutlined,
    FullscreenExit,
    NotificationsNone,
    ChatBubbleOutline,
    List,
} from "@mui/icons-material";

//  Style
import "./style.scss";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder="Search..." />
                    <Search />
                </div>
                <div className="items">
                    <div className="item">
                        <Language className="icon" />
                        English
                    </div>
                    <div className="item">
                        <DarkModeOutlined className="icon" />
                    </div>
                    <div className="item">
                        <FullscreenExit className="icon" />
                    </div>
                    <div className="item">
                        <NotificationsNone className="icon" />
                        <div className="counter">1</div>
                    </div>
                    <div className="item">
                        <ChatBubbleOutline className="icon" />
                        <div className="counter">1</div>
                    </div>
                    <div className="item ">
                        <List className="icon" />
                    </div>{" "}
                    <div className="item ">
                        <img
                            className="avatar"
                            alt="avatar"
                            src="https://i.pinimg.com/564x/84/3e/c1/843ec19ab21460c86530c41145737fee.jpg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
