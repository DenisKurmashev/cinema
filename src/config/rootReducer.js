import { combineReducers } from "redux";

import UserReducer from "../reducers/user";
import FilmsReducer from "../reducers/films";

const rootReducer = combineReducers({
    user: UserReducer,
    films: FilmsReducer,
});

export default rootReducer;

