import { useDispatch, useSelector } from "react-redux";
import React from "react";

import { Alert, AlertTitle, Dialog } from "@mui/material";

import { actCloseAlert } from "@/store/actions/alert";

const MUIAlert = ({ alert, timeOutId }) => {
    const dispatch = useDispatch();

    const TYPE = useSelector((state) => state.alert.type);

    const closeAlert = () => {
        dispatch(actCloseAlert());

        //Clear timeout
        clearTimeout(timeOutId);
    };
    return (
        <Dialog open={TYPE === "open" ? true : false} onClose={closeAlert}>
            <Alert severity={alert.type} sx={{ fontSize: "16px", alignItems: "center" }}>
                <AlertTitle sx={{ fontSize: "18px" }}>{alert.title}:</AlertTitle>
                {alert.content}
            </Alert>
        </Dialog>
    );
};

export default MUIAlert;
