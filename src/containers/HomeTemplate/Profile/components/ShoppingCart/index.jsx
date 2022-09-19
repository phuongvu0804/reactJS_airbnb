import { useCallback, useState, useEffect } from "react";

//Material UI
import WaveSkeleton from "@/components/WaveSkeleton";
import { Close } from "@mui/icons-material";
import { Alert, Button, Collapse, Grid, IconButton, Modal, Popover, Typography } from "@mui/material";
import { Box } from "@mui/system";

//Components
import ShoppingItem from "./components/ShoppingItem";

//Others
import { ticketApi } from "@/api";
import { callApi } from "@/api/config/request";
import "./style.scss";
import LoadMoreBtn from "@/components/LoadMoreBtn";

function ShoppingCart({ data }) {
    const [shoppingList, setShoppingList] = useState([]);
    const [toastMsg, setToastMsg] = useState([]);
    const [openMsg, setOpenMsg] = useState(true);
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
            booking.forEach((item) => {
                ticketApi
                    .getTicketDetails(item)
                    .then((response) => {
                        setShoppingList([...shoppingList, response]);
                    })
                    .catch((error) => {
                        setTrashBin((prev) => [...prev, item]);
                    });
            });
        }

        const intervalId = setInterval(() => {
            if (toastMsg.length > 0) {
                handleDeleteToastMsg(toastMsg.length - 1);
            }
        }, 6000);

        return () => {
            clearInterval(intervalId);
        };
    }, [toastMsg, data]);

    const handleDeleteBooking = (ticketId) => {
        callApi(
            ticketApi.deleteTicket(ticketId),
            (response) => {
                setToastMsg([
                    ...toastMsg,
                    {
                        type: "success",
                        content: "Your have deleted successfully!",
                    },
                ]);
            },
            (error) => {
                setToastMsg([
                    ...toastMsg,
                    {
                        type: "error",
                        content: error || "Sorry, there was an error from the serve",
                    },
                ]);
                setOpenMsg(true);
            },
        );
    };

    const renderToastMsg = () => {
        if (toastMsg.length > 0) {
            return toastMsg?.map((item, index) => {
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
        if (shoppingList.length) {
            return (
                <Grid container>
                    {shoppingList?.slice(0, visible).map((item, index) => (
                        <ShoppingItem
                            data={item}
                            key={index}
                            onDelete={() => handleDeleteBooking(item.data._id)}
                            toastMsg={toastMsg}
                            setToastMsg={setToastMsg}
                        />
                    ))}
                </Grid>
            );
        } else {
            return <p>Your shopping cart is empty.</p>;
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

            {renderToastMsg()}
            {renderShoppingList()}

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
                <Box sx={{ p: 1 }}>
                    {trashBin.map((item, index) => (
                        <Typography key={index} sx={{ p: 1 }}>
                            Ticket id: {item}
                        </Typography>
                    ))}
                </Box>
            </Popover>

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
