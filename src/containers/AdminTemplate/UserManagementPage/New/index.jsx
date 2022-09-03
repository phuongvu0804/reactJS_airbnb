import { useState } from "react";
import { useForm } from "react-hook-form";

// Material UI
import { Stack, Grid } from "@mui/material";
import { DriveFolderUploadOutlined } from "@mui/icons-material";

// Components
import TextInput from "../../components/TextInput";
import RadioInput from "../../components/RadioInput";
import WaveSkeleton from "@/components/WaveSkeleton";

// Style
import "./style.scss";

export const inputs = [
    {
        id: 1,
        name: "name",
        label: "Full Name",
        type: "text",
        placeholder: "Le Nguyen Anh Tu",
    },
    {
        id: 2,
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "tu.lna07@gmail.com",
    },
    {
        id: 3,
        label: "Gender",
        type: "radio",
    },
    {
        id: 4,
        name: "birthday",
        label: "Birthday",
        type: "date",
    },
    {
        id: 5,
        name: "password",
        label: "Password",
        type: "password",
    },
    {
        id: 6,
        name: "phone",
        label: "Phone",
        type: "text",
        placeholder: "0946688199",
    },
    {
        id: 7,
        name: "address",
        label: "Address",
        type: "text",
        placeholder: "170 St. Esdan, Wakanda, Earth",
    },
];

const New = () => {
    const { control, handleSubmit } = useForm({
        reValidateMode: "onSubmit",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phone: "",
            birthday: "",
            gender: true,
            type: "ADMIN",
            address: "",
        },
    });
    const [file, setFile] = useState("");

    const renderInputs = () => {
        return inputs.map((input) => {
            const { id, name, label, type, placeholder } = input;
            let inputNode = null;

            if (0) {
                inputNode = (
                    <Stack spacing={0.8}>
                        <WaveSkeleton variant="rectangular" sx={{ width: "40%", height: "12px" }} />
                        <WaveSkeleton variant="rectangular" sx={{ width: "100%", height: "12px" }} />
                    </Stack>
                );
            }

            if (type === "text" || type === "email" || type === "password" || type === "date") {
                inputNode = (
                    <TextInput name={name} type={type} label={label} placeholder={placeholder} control={control} />
                );
            }

            if (type === "radio") {
                inputNode = <RadioInput label={label} />;
            }

            // Grid column size
            const columnSize = {
                address: 10.5,
                default: 5,
            };

            return (
                <Grid item xs={5} key={id}>
                    {inputNode}
                </Grid>
            );
        });
    };

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
                        {/* <div className="form-input">
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
                        ))} */}
                        {/* <Stack className="form-input">
                            <InputLabel className="admin-form-input-label">Email</InputLabel>
                            <TextInput name="email" type="email" className="admin-form-input" control={control} />
                        </Stack>
                        <Stack className="form-input" spacing={0.8}>
                            <WaveSkeleton variant="rectangular" sx={{ width: "40%", height: "12px" }} />
                            <WaveSkeleton variant="rectangular" sx={{ width: "100%", height: "12px" }} />
                        </Stack> */}
                        <Grid container columns={12} spacing={3} justifyContent="space-evenly">
                            {renderInputs()}
                            <Grid item xs={5}>
                                <button>Add</button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default New;
