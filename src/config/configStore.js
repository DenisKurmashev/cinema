import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { logger } from "redux-logger";

import rootReducer from "./rootReducer";
import { onLoginOrRegisterSuccess } from "../actions/user";
import { readUserFromLocalStorage } from "../util";

let store = createStore(rootReducer, applyMiddleware(thunk, logger));

const user = readUserFromLocalStorage();
if (user) {
    store.dispatch(onLoginOrRegisterSuccess(user));
}

export default store;