import { useState } from "react";

//Material UI
import { FormControl, Button, IconButton, Divider, Popper } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

//others
import "./style.scss";
import AnimalModal from "../AnimalModal";
import CloseBtn from "@/components/CloseBtn";

function GuestInputField({ id, open, anchorEl, onClick, guestNumber, setGuestNumber }) {
    const [openAnimalModal, setOpenAnimalModal] = useState(false);
    // const [guestInput, setGuestInput] = useState();

    const settings = [
        {
            inputName: "Adults",
            subText: "Ages 13 or above",
            link: false,
            divider: true,
        },
        {
            inputName: "Children",
            subText: "Ages 2 - 12",
            link: false,
            divider: true,
        },
        {
            inputName: "Infants",
            subText: "Under 2",
            link: false,
            divider: true,
        },
        {
            inputName: "Pets",
            subText: "Bringing a service animal ?",
            link: true,
        },
    ];

    const renderGuestInputField = () => {
        return settings.map((item, index) => (
            <div key={index}>
                <FormControl className="sub-modal__group" sx={{ display: "flex" }}>
                    <div className="group__title">
                        <h4>{item.inputName}</h4>
                        {item.link ? (
                            <Button
                                className="group__sub-text group__sub-text--link"
                                onClick={() => setOpenAnimalModal(true)}
                            >
                                {item.subText}
                            </Button>
                        ) : (
                            <p className="group__sub-text">{item.subText}</p>
                        )}
                    </div>
                    <div className="group__filter">
                        <IconButton
                            className="group__filter-btn"
                            onClick={() =>
                                setGuestNumber({ ...guestNumber, [item.inputName]: guestNumber[item.inputName] - 1 })
                            }
                        >
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                        <p className="group__filter-number">{guestNumber[item.inputName]}</p>
                        <IconButton
                            className="group__filter-btn"
                            onClick={() =>
                                setGuestNumber({ ...guestNumber, [item.inputName]: guestNumber[item.inputName] + 1 })
                            }
                        >
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </div>
                </FormControl>
                {item.divider ? <Divider /> : ""}
            </div>
        ));
    };

    return (
        <Popper
            id={id}
            className="search-item__sub-modal search-item__sub-modal--guest"
            component="form"
            anchorEl={anchorEl}
            open={open}
        >
            <CloseBtn onClick={onClick} sx={{ display: { xs: "flex", sm: "none" } }} />
            {renderGuestInputField()}
            <AnimalModal onOpen={openAnimalModal} onClose={() => setOpenAnimalModal(false)} />
        </Popper>
    );
}

export default GuestInputField;
