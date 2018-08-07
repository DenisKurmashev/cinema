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

export const onSelectedPlaceChanged = (x, y) => ({
    type: types.ON_SELECTED_PLACE_CHANGED,
    x,
    y,
});

export const onSelectedAdditionalAdd = (id, count) => ({
    type: types.ON_SELECTED_ADDITIONAL_ADD,
    id,
    count,
});
export const onSelectedAdditionalRemove = (id) => ({
    type: types.ON_SELECTED_ADDITIONAL_REMOVE,
    id,
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
     
export const addNewOrder = () => 
    (dispatch, getState) => {
        dispatch(onAdditionalFetching());

        const state = getState();

        const data = {
            session: state.films.openedSeance._id,
            place: JSON.stringify(state.order.selectedPlace),
            additional: JSON.stringify(state.order.selectedAdditionals)
        };

        const headers = {
            "Authorization": state.user.token
        };

        return axios.post(getApiObject().orders, data, { headers })
            .then(response => dispatch(onAdditionalSuccess(response.data)))
            .catch(error => dispatch(onAdditionalFailed(error.message)));
    }