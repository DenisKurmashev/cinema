import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { logger } from "redux-logger";

import rootReducer from "./rootReducer";
import { onLoginOrRegisterSuccess } from "../actions/user";
import { onFilmsLoad } from "../actions/films";
import { readUserFromLocalStorage } from "../util";

let store = createStore(rootReducer, applyMiddleware(thunk, logger));

// try to read user data and JWT token from local storage
const user = readUserFromLocalStorage();
if (user) {
    store.dispatch(onLoginOrRegisterSuccess(user));
}

// get first films page
store.dispatch(onFilmsLoad(1));

export default store;