import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
import TabBar from "./components/TabBar";
import { useDispatch } from "react-redux";
import { actGetLocationList } from "@/store/actions/locationList";

function HomeTemplate() {
    const dispatch = useDispatch();
    const style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh",
    };

    useEffect(() => {
        dispatch(actGetLocationList());
    }, []);

    return (
        <Box id="home-template" sx={style}>
            <div>
                <Header />
                <Outlet />
            </div>
            <Footer />
            <TabBar />
        </Box>
    );
}

export default HomeTemplate;
