import { combineReducers } from "redux";

import UserReducer from "../reducers/user";
import FilmsReducer from "../reducers/films";
import OrderFormReducer from "../reducers/order-form";

const rootReducer = combineReducers({
    user: UserReducer,
    films: FilmsReducer,
    order: OrderFormReducer,
});

export default rootReducer;

