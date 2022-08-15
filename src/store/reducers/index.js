import { combineReducers } from "redux";

import locationListReducer from "./locationList";
import roomListReducer from "./roomList";

const rootReducer = combineReducers({
    locationList: locationListReducer,
    roomList: roomListReducer,
});

export default rootReducer;
