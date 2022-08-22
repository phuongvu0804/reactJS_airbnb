import { Outlet } from "react-router-dom";

// Components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

// Style
import "./style.scss";

const Home = () => {
    return (
        <div className="admin">
            <Sidebar />
            <div className="admin-container">
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
};

export default Home;
