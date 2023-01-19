import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Material UI
import WaveSkeleton from "@/components/WaveSkeleton";
import { Button, Grid, Popover, Typography } from "@mui/material";
import { Box } from "@mui/system";

//Components
import ShoppingItem from "./components/ShoppingItem";

//Others
import { ticketApi } from "@/api";
import { callApi } from "@/api/config/request";
import "./style.scss";
import LoadMoreBtn from "@/components/LoadMoreBtn";
import { actCloseAlert, actOpenAlert } from "@/store/actions/alert";
import { errorDeleteAlert, successDeleteAlert } from "../../constants";

function ShoppingCart({ data, timeOutId }) {
    const dispatch = useDispatch();
    const ticketList = useSelector((state) => state.ticket.data);
    const [toastMsg, setToastMsg] = useState([]);
    const [visible, setVisible] = useState(4);
    const [trashBin, setTrashBin] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const handleDeleteBooking = (ticketId) => {
        callApi(
            ticketApi.deleteTicket(ticketId),
            (response) => {
                dispatch(actOpenAlert(successDeleteAlert));
            },
            (error) => {
                dispatch(actOpenAlert(errorDeleteAlert));
            },
        );

        timeOutId = window.setTimeout(() => dispatch(actCloseAlert()), 5000);
    };

    const renderShoppingList = () => {
        if (ticketList?.length) {
            return ticketList
                ?.slice(0, visible)
                .map((item, index) => (
                    <ShoppingItem
                        data={item}
                        key={index}
                        onDelete={() => handleDeleteBooking(item.maPhong)}
                        toastMsg={toastMsg}
                        setToastMsg={setToastMsg}
                    />
                ));
        } else {
            return <p>Your shopping cart is empty.</p>;
        }
    };

    const renderTrashBin = () => {
        if (trashBin?.length) {
            return trashBin.map((item, index) => (
                <Typography key={index} sx={{ p: 1 }}>
                    Ticket id: {item}
                </Typography>
            ));
        } else {
            return (
                <Typography component="h6" sx={{ fontSize: 14, fontWeight: 400 }}>
                    Your trash bin is empty
                </Typography>
            );
        }
    };

    return (
        <ul className="shop-cart-list">
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h4 className="profile__sub-title">Shopping cart</h4>
                {trashBin && (
                    <Button
                        aria-describedby={id}
                        variant="text"
                        onClick={handleClick}
                        sx={{ color: "var(--black)", textDecoration: "underline", textTransform: "none", mb: "20px" }}
                    >
                        Deleted tickets
                    </Button>
                )}
            </Box>

            <Grid container>{renderShoppingList()}</Grid>

            {/* /Render deleted shopping cart */}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <Box sx={{ p: 1 }}>{renderTrashBin()}</Box>
            </Popover>

            {visible < ticketList?.length && (
                <LoadMoreBtn className="__show-btn" variant="outlined" setVisible={setVisible} loadNumber={4} />
            )}
        </ul>
    );
}

function Loading() {
    return (
        <ul className="user-details__shop-cart-list">
            <h4 className="profile__sub-title">Shopping cart</h4>
            {Array(2)
                .fill(0)
                .map((item, index) => (
                    <li key={index} className="shop-cart__item">
                        <WaveSkeleton variant="circular" sx={{ width: "56px", height: "56px" }} />
                        <div className="shop-cart-item__content">
                            <WaveSkeleton variant="text" sx={{ fontSize: "16px", width: "300px" }} />
                            <WaveSkeleton variant="text" sx={{ fontSize: "16px", width: "200px" }} />
                        </div>
                    </li>
                ))}
        </ul>
    );
}

ShoppingCart.Loading = Loading;

export default ShoppingCart;
