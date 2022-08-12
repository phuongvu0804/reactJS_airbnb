import React from "react";

//Material UI
import TextField from "@mui/material/TextField";
import { Box, FormControl, FormLabel } from "@mui/material";

import "./style.scss";
import SubmitBtn from "@/components/SubmitBtn";
import { Search } from "@mui/icons-material";

function SearchBar() {
    return (
        <div className="home-page__search-bar">
            <Box component="form" className="search-bar__form">
                <FormControl className="search-bar__input-control">
                    <FormLabel className="search-bar__input-label">Where</FormLabel>
                    <TextField className="search-bar__input" variant="outlined" />
                </FormControl>
                <FormControl className="search-bar__input-control">
                    <FormLabel className="search-bar__input-label">Check in</FormLabel>
                    <TextField className="search-bar__input" variant="outlined" />
                </FormControl>
                <FormControl className="search-bar__input-control">
                    <FormLabel className="search-bar__input-label">Check out</FormLabel>
                    <TextField className="search-bar__input" variant="outlined" />
                </FormControl>
                <FormControl className="search-bar__input-control">
                    <FormLabel className="search-bar__input-label">Who</FormLabel>
                    <TextField className="search-bar__input" variant="outlined" />
                </FormControl>
                <SubmitBtn className="seacrh-bar__form-btn" startIcon={<Search />} variant="contained">
                    Search
                </SubmitBtn>
            </Box>
        </div>
    );
}

export default SearchBar;
