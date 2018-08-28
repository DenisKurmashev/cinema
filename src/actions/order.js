import axios from "axios";
import types from "../types/order";
import { getApiObject } from "../util";

import store from '../config/configStore'

// If you have case where some request are with AUTH, some not - you could create a separate axios instance with own blackjack and hoo...
// intercepters and config
const authInstance = axios.create()
authInstance.interceptors.request.use((config) => {
    // Whatever you want to pick up
    const token = store.getState().user.token

    if (token) {
        config.headers.Authorization = token
    }

    return config
});
// Note: OR you could create do this in default instance, e.g.:
// axios.interceptors.request.use(config => {
//         // Check if url is needs AUTH
//       if (config.baseURL === needsAPiAithUrl && !config.headers.Authorization) {
//         const token = store.getState().user.token
  
//         if (token) {
//             config.headers.Authorization = token
//         }
//       }
  
//       return config;
//     },
//     error => Promise.reject(error)
//   );


const api = getApiObject();

export const onChangeOrderSortFilter = (payload) => ({
    type: types.ON_CHANGE_ORDER_SORT_FILTER,
    payload,
}); 

export const onOrdersFetching = (payload) => ({
    type: types.ON_ORDERS_FETCHING,
    payload,
});

export const onOrdersFailed = (error) => ({
    type: types.ON_ORDERS_FAILED,
    error,
});

export const onOrdersSuccess = (orders) => ({
    type: types.ON_ORDERS_SUCCESS,
    orders,
});

export const fetchOrders = () => 
    (dispatch, getState) => {
        dispatch(onOrdersFetching());

        // Note clean API, all token logic in separate interceptors
        return authInstance.get(api.orders)
            .then(response => dispatch(onOrdersSuccess(response.data)))
            .catch(error => onOrdersFailed(error.message));

    }