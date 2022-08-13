import { combineReducers } from "redux";

import placeListReducer from "./placeList";

const rootReducer = combineReducers({
    placeList: placeListReducer,
});

export default rootReducer;
