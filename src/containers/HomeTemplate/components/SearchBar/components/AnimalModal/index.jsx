import React from "react";

//Material UI
import images from "@/assets/images";
import Image from "@/components/Image";
import { IconButton, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";

//others
import "./style.scss";
import CloseBtn from "@/components/CloseBtn";

function AnimalModal({ onOpen, onClose }) {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "white",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal open={onOpen} onClose={onClose} sx={{ zIndex: 1310 }}>
            <Box className="group__modal group__modal—animal" component="form" sx={style}>
                <CloseBtn className="group__modal-closing-btn" onClick={onClose} />
                <div className="group__modal-img">
                    <Image src={images.animalService} alt="Animal service's illustration" />
                </div>
                <div className="group__modal-content">
                    <Typography className="group__modal-title">Service animals</Typography>
                    <div className="group__modal-text-wrapper">
                        <p className="group__modal-text">
                            Service animals aren’t pets, so there’s no need to add them here.
                            <br></br>
                            <br></br>
                            Traveling with an emotional support animal? Check out our{" "}
                            <a
                                className="group__modal-link"
                                href="https://www.airbnb.com/help/article/1869/accessibility-policy"
                                target="_blank"
                            >
                                accessibility policy
                            </a>
                        </p>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}

export default AnimalModal;
