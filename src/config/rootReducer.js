import { combineReducers } from "redux";

import UserReducer from "../reducers/user";
import FilmsReducer from "../reducers/films";
import OrderFormReducer from "../reducers/order-form";
import OrderReducer from "../reducers/order";

const rootReducer = combineReducers({
    user: UserReducer,
    films: FilmsReducer,
    orderForm: OrderFormReducer,
    orderList: OrderReducer,
});

export default rootReducer;

