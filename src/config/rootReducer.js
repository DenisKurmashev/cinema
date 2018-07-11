import { combineReducers } from "redux";

import UserReducer from "../reducers/user";

const rootReducer = combineReducers({
    user: UserReducer,
});

export default rootReducer;

