import axios from "axios";

import types from "../types/order";
import { getApiObject } from "../util";

export const onOrdersFetching = (payload) => ({
    type: types.ON_ORDERS_FETCHING,
    payload,
});

export const onOrdersFailed = (payload) => ({
    type: types.ON_ORDERS_FAILED,
    payload,
});

export const onOrdersSuccess = (payload) => ({
    type: types.ON_ORDERS_SUCCESS,
    payload,
});

export const fetchOrders = () => 
    (dispatch, getState) => {
        dispatch(onOrdersFetching());

        const headers = {
            "Authorization": state.user.token
        };

        return axios.get(getApiObject().orders, { headers })
            .then(response => dispatch(onOrdersSuccess(response.data)))
            .catch(error => onOrdersFailed(error.message));

    }