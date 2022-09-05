import { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

//Material UI
import WaveSkeleton from "@/components/WaveSkeleton";
import { Close } from "@mui/icons-material";
import { Alert, Collapse, Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";

//Components
import ShoppingItem from "./components/ShoppingItem";

//Others
import { ticketApi } from "@/api";
import { callApi } from "@/api/config/request";
import "./style.scss";
import LoadMoreBtn from "@/components/LoadMoreBtn";

function ShoppingCart({ data }) {
    const dispatch = useDispatch();
    const [shoppingList, setShoppingList] = useState(null);
    const [serverError, setServerError] = useState(null);
    const [toastMsg, setToastMsg] = useState([]);
    const [openMsg, setOpenMsg] = useState(true);
    const [visible, setVisible] = useState(4);

    const handleDeleteToastMsg = useCallback(
        (errorKey) => {
            const deletedArray = toastMsg.filter((item, index) => index !== errorKey);
            setToastMsg(deletedArray);
        },
        [toastMsg],
    );

    useEffect(() => {
        if (data) {
            const booking = data.tickets;
            Promise.all(booking.map((item) => ticketApi.getTicketDetails(item)))
                .then((response) => setShoppingList(response))
                .catch((error) => setServerError(error));
        }

        const intervalId = setInterval(() => {
            if (toastMsg.length > 0) {
                handleDeleteToastMsg(toastMsg.length - 1);
            }
        }, 6000);

        return () => {
            clearInterval(intervalId);
        };
    }, [toastMsg]);

    const handleDeleteBooking = () => {
        callApi(
            dispatch(ticketApi.deleteTicket),
            (response) => {
                setToastMsg([
                    ...toastMsg,
                    {
                        type: "success",
                        content: response,
                    },
                ]);
            },
            (error) => {
                setToastMsg([
                    ...toastMsg,
                    {
                        type: "error",
                        content: error,
                    },
                ]);
                setOpenMsg(true);
            },
        );
    };

    const renderToastMsg = () => {
        if (toastMsg.length > 0) {
            return toastMsg.map((item, index) => {
                const errorKey = index;
                return (
                    <Collapse className="toast-msg" key={errorKey} in={openMsg} sx={{ mb: "6px" }}>
                        <Alert
                            severity={item.type}
                            action={
                                <IconButton size="small" color="inherit" onClick={() => handleDeleteToastMsg(errorKey)}>
                                    <Close />
                                </IconButton>
                            }
                        >
                            {item.content}
                        </Alert>
                    </Collapse>
                );
            });
        }
    };

    const renderShoppingList = () => {
        if (shoppingList) {
            return (
                <Grid container>
                    {shoppingList?.slice(0, visible).map((item, index) => (
                        <ShoppingItem data={item} key={index} onDelete={handleDeleteBooking} />
                    ))}
                </Grid>
            );
        }
    };

    return (
        <ul className="shop-cart-list">
            <h4 className="profile__sub-title">Shopping cart</h4>
            {serverError && (
                <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                    <Alert severity="error" sx={{ minWidth: "200px" }}>
                        {serverError}
                    </Alert>
                </Box>
            )}
            {renderToastMsg()}
            {renderShoppingList()}
            {visible < shoppingList?.length && (
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
