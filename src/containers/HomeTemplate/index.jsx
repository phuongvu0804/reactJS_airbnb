import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
import TabBar from "./components/TabBar";

function HomeTemplate() {
    const style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh",
    };

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
