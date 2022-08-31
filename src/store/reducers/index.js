import { combineReducers } from "redux";

import locationListReducer from "./locationList";
import roomListReducer from "./roomList";
import roomDetailsReducer from "./roomDetails";
import authReducer from "./auth";
import userReducer from "./user";

const rootReducer = combineReducers({
    locationList: locationListReducer,
    roomList: roomListReducer,
    roomDetails: roomDetailsReducer,
    auth: authReducer,
    user: userReducer,
});

export default rootReducer;
