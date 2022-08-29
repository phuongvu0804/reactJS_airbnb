import { useState } from "react";

// Material UI
import { DriveFolderUploadOutlined } from "@mui/icons-material";

// Style
import "./style.scss";

export const inputs = [
    {
        id: 1,
        label: "Username",
        type: "text",
        placeholder: "john_doe",
    },
    {
        id: 2,
        label: "Name and surname",
        type: "text",
        placeholder: "John Doe",
    },
    {
        id: 3,
        label: "Email",
        type: "mail",
        placeholder: "john_doe@gmail.com",
    },
    {
        id: 4,
        label: "Phone",
        type: "text",
        placeholder: "+1 234 567 89",
    },
    {
        id: 5,
        label: "Password",
        type: "password",
    },
    {
        id: 6,
        label: "Address",
        type: "text",
        placeholder: "Elton St. 216 NewYork",
    },
    {
        id: 7,
        label: "Country",
        type: "text",
        placeholder: "USA",
    },
];

const New = () => {
    const [file, setFile] = useState("");

    return (
        <div className="new">
            <div className="bottom">
                <div className="left">
                    <img
                        src={
                            file
                                ? URL.createObjectURL(file)
                                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        }
                        alt=""
                    />
                </div>
                <div className="right">
                    <form>
                        <div className="form-input">
                            <label htmlFor="file">
                                Image: <DriveFolderUploadOutlined className="icon" />
                            </label>
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                id="file"
                                style={{ display: "none" }}
                            />
                        </div>
                        {inputs.map((input) => (
                            <div className="form-input" key={input.id}>
                                <label>{input.label}</label>
                                <input type={input.type} placeholder={input.placeholder} />
                            </div>
                        ))}
                        <button>Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default New;
