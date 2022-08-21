import { combineReducers } from "redux";

import locationListReducer from "./locationList";
import roomListReducer from "./roomList";
import authReducer from "./auth";

const rootReducer = combineReducers({
    locationList: locationListReducer,
    roomList: roomListReducer,
    auth: authReducer,
});

export default rootReducer;
