import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { logger } from "redux-logger";

import rootReducer from "./rootReducer";
import { onLoginOrRegisterSuccess } from "../actions/user";
import { onSetInitialState } from "../actions/films";
import { readUserFromLocalStorage, parseGetParams } from "../util";

let store = createStore(rootReducer, applyMiddleware(thunk, logger));

// try to read user data and JWT token from local storage
const user = readUserFromLocalStorage();
if (user) {
    store.dispatch(onLoginOrRegisterSuccess(user));
}

const params = parseGetParams();
if (params.filter || params.searchText) {
    store.dispatch(onSetInitialState(params));
}

export default store;