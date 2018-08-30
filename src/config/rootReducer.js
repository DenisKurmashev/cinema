import { combineReducers } from "redux";

import UserReducer from "../reducers/user";
import FilmsReducer from "../reducers/films";
import OrderFormReducer from "../reducers/order-form";
import OrderReducer from "../reducers/order";

const createReducer = asyncReducers => {
  return combineReducers({
    user: UserReducer,
    films: FilmsReducer,
    orderForm: OrderFormReducer,
    orderList: OrderReducer,
    ...asyncReducers
  });
};

export default createReducer;
