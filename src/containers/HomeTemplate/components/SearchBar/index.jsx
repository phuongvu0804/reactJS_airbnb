import { useState } from "react";

//Material UI
import TextField from "@mui/material/TextField";
import { Box, Divider, FormControl, FormLabel, Grid, IconButton, Modal, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";

import "./style.scss";
import SubmitBtn from "@/components/SubmitBtn";
import { Search } from "@mui/icons-material";

function SearchBar() {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    const searchTabs = [
        {
            id: 1,
            wrapperTab: false,
            formControlClassName: "search-bar__input-control search-bar__input-control--where",
            sx: { flex: 2 },
            divider: true,
            others: "",
            children: {
                formLabelName: "Where",
                formLabelClassName: "search-bar__input-label",
                textFieldClassName: "search-bar__input",
                textFieldVariant: "outlined",
                textFieldPlaceholder: "Search destinations",
            },
        },
        {
            id: 2,
            wrapperTab: false,
            formControlClassName: "search-bar__input-control",
            sx: { flex: 1 },
            divider: true,
            others: "",
            children: {
                formLabelName: "Check in",
                formLabelClassName: "search-bar__input-label",
                textFieldClassName: "search-bar__input",
                textFieldVariant: "outlined",
                textFieldPlaceholder: "Add dates",
            },
        },
        {
            id: 3,
            wrapperTab: false,
            formControlClassName: "search-bar__input-control ",
            sx: { flex: 1 },
            divider: true,
            others: "",
            children: {
                formLabelName: "Check out",
                formLabelClassName: "search-bar__input-label",
                textFieldClassName: "search-bar__input",
                textFieldVariant: "outlined",
                textFieldPlaceholder: "Add dates",
            },
        },
        {
            id: 4,
            wrapperTab: "search-bar__input-wrapper--last",
            formControlClassName: "search-bar__input-control",
            sx: { flex: 2 },
            divider: false,
            others: "",
            children: {
                formLabelName: "Who",
                formLabelClassName: "search-bar__input-label",
                textFieldClassName: "search-bar__input",
                textFieldVariant: "outlined",
                textFieldPlaceholder: "Add guests",
            },
        },
    ];

    const searchTabsMobile = ["Anywhere", "Any week", "Add guests"];
    const [tabState, setTabState] = useState({
        activeTab: null,
        searchTabs: searchTabs,
    });
    const [openModal, setOpenModal] = useState(false);

    const toggleActiveStyle = (item) => {
        if (!item.wrapperTab) {
            if (item.id === tabState.activeTab) {
                return "search-bar__input-wrapper active";
            } else {
                return "search-bar__input-wrapper";
            }
        } else {
            if (item.id === tabState.activeTab) {
                return `search-bar__input-wrapper ${item.wrapperTab} active`;
            } else {
                return `search-bar__input-wrapper ${item.wrapperTab}`;
            }
        }
    };

    const handleCloseModal = () => setOpenModal(false);

    const handleOpenModal = () => setOpenModal(true);

    const SearchBarPCTablet = () => {
        return (
            <>
                <Box className="search-bar__form" sx={{ display: { xs: "none", md: "flex" } }}>
                    {searchTabs.map((item) => (
                        <Box key={item.id} sx={{ ...item.sx }} className={toggleActiveStyle(item)}>
                            <FormControl
                                className={
                                    item.id === tabState.activeTab
                                        ? `${item.formControlClassName} active`
                                        : ` : ${item.formControlClassName}`
                                }
                                {...item.others}
                                onClick={() => setTabState({ ...tabState, activeTab: item.id })}
                            >
                                <FormLabel className={item.children.formLabelClassName}>
                                    {item.children.formLabelName}
                                </FormLabel>
                                <TextField
                                    className={item.children.textFieldClassName}
                                    placeholder={item.children.textFieldPlaceholder}
                                    variant={item.children.textFieldVariant}
                                />
                            </FormControl>
                            {item.id === 4 ? (
                                <SubmitBtn
                                    className="seacrh-bar__form-btn"
                                    startIcon={<Search />}
                                    variant="contained"
                                ></SubmitBtn>
                            ) : (
                                ""
                            )}
                            {item.divider ? (
                                <Divider
                                    className="search-bar__divider"
                                    orientation="vertical"
                                    variant="middle"
                                    flexItem
                                />
                            ) : (
                                ""
                            )}
                        </Box>
                    ))}
                </Box>
            </>
        );
    };
    const SearchBarMobile = ({ onClick }) => {
        return (
            <>
                <IconButton className="search-bar__search-btn" onClick={onClick}>
                    <SearchIcon />
                </IconButton>
                <div className="search-bar__content" onClick={onClick}>
                    <h3 className="search-bar__title">Where to?</h3>
                    <ul className="search-bar__text-wrapper">
                        {searchTabsMobile.map((item, index) => (
                            <li className="search-bar__text" key={index}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <IconButton className="search-bar__filter-btn" onClick={onClick}>
                    <TuneIcon />
                </IconButton>
            </>
        );
    };
    return (
        <div
            className={tabState.activeTab ? "home-page__search-bar active" : "home-page__search-bar"}
            onMouseOut={() => setTabState({ ...tabState, activeTab: null })}
        >
            <SearchBarPCTablet />
            <SearchBarMobile onClick={handleOpenModal} />
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default SearchBar;
