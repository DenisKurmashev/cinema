import axios from "axios";
import types from "../types/order-form";
import { getApiObject } from "../util";

export const onOrderFormOpen = (payload) => ({
    type: types.ON_OPEN,
    payload,
});

export const onOrderFormClose = (payload) => ({
    type: types.ON_CLOSE,
    payload,
});

export const onAdditionalFetching = (payload) => ({
    type: types.ON_ADDITIONAL_FETCHING,
    payload,
});

export const onAdditionalSuccess = (payload) => ({
    type: types.ON_ADDITIONAL_SUCCESS,
    payload,
});

export const onAdditionalFailed = (payload) => ({
    type: types.ON_ADDITIONAL_FAILED,
    payload,
});

export const loadAdditional = () => 
    (dispatch, getState) => {
        dispatch(onAdditionalFetching());

        return axios.get(getApiObject().additional)
            .then(response => dispatch(onAdditionalSuccess(response.data)))
            .catch(error => dispatch(onAdditionalFailed(error.message)));
    }
        