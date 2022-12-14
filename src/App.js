// Route config
import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "@/routes";

// Datepicker
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

// Loader
import PageLoader from "@/components/PageLoader";

// React Query
import { QueryClientProvider, QueryClient } from "react-query";

// Create a client
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Suspense fallback={<PageLoader />}>
                    <Router>
                        <Routes />
                    </Router>
                </Suspense>
            </LocalizationProvider>
        </QueryClientProvider>
    );
}

export default App;
