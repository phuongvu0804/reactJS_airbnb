// Route config
import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "@/routes";

// Datepicker
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Suspense fallback={<div>loading ...</div>}>
                <Router>
                    <Routes />
                </Router>
            </Suspense>
        </LocalizationProvider>
    );
}

export default App;
