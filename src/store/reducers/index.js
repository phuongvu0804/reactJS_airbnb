import { combineReducers } from "redux";

import locationListReducer from "./locationList";
import roomListReducer from "./roomList";
import roomDetailsReducer from "./roomDetails";
import authReducer from "./auth";

const rootReducer = combineReducers({
    locationList: locationListReducer,
    roomList: roomListReducer,
    roomDetails: roomDetailsReducer,
    auth: authReducer,
});

export default rootReducer;
