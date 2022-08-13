import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

//Redux config
import { Provider } from "react-redux";
import configureStore from "./store";

//MUI Datepicker config
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { LocalizationProvider } from "@mui/x-date-pickers";

//Components
import App from "./App";
import GlobalStyles from "@/components/GlobalStyles";

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <LocalizationProvider dateAdapter={AdapterMoment}>
        <Provider store={store}>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </Provider>
    </LocalizationProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
