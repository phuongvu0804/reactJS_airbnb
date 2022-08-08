import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function HomeTemplate() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}
