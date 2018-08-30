import axios from "axios";

import types from "../types/order";
import { getApiObject } from "../util";

const api = getApiObject();

export const onChangeOrderSortFilter = payload => ({
  type: types.ON_CHANGE_ORDER_SORT_FILTER,
  payload
});

export const onOrdersFetching = payload => ({
  type: types.ON_ORDERS_FETCHING,
  payload
});

export const onOrdersFailed = error => ({
  type: types.ON_ORDERS_FAILED,
  error
});

export const onOrdersSuccess = orders => ({
  type: types.ON_ORDERS_SUCCESS,
  orders
});

export const fetchOrders = () => (dispatch, getState) => {
  dispatch(onOrdersFetching());

  const headers = {
    Authorization: getState().user.token
  };

  return axios
    .get(api.orders, { headers })
    .then(response => dispatch(onOrdersSuccess(response.data)))
    .catch(error => onOrdersFailed(error.message));
};
