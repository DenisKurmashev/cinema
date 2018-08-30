import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { logger } from "redux-logger";

import createReducer from "./rootReducer";
import { onLoginOrRegisterSuccess } from "../actions/user";
import { onSetInitialState /*onFilmsPageChange*/ } from "../actions/films";
import { readUserFromLocalStorage, parseGetParams } from "../util";

import AdminReducer from "../components/AdminContent/reducers/rootReducer";

let store = createStore(createReducer(), applyMiddleware(thunk, logger));
store.asyncReducer = {};

// try to read user data and JWT token from local storage
const user = readUserFromLocalStorage();
if (user) {
  // if user role admin
  // add dynamic reducer for its page
  if (user.user.role === "admin") {
    store.asyncReducer.admin = AdminReducer;
    store.replaceReducer(createReducer(store.asyncReducer));
  }

  store.dispatch(onLoginOrRegisterSuccess(user));
}

const params = parseGetParams();
if (params.filter || params.searchText) {
  store.dispatch(onSetInitialState(params));
}
// TO-DO: set pagination page from get param
// if (params.pageId) {
//     store.dispatch(onFilmsPageChange(parseInt(params.pageId)));
// }

export default store;
