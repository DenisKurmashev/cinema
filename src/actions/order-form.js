import axios from "axios";
import types from "../types/order-form";
import { getApiObject } from "../util";

const api = getApiObject();

export const onOrderFormOpen = payload => ({
  type: types.ON_OPEN,
  payload
});

export const onOrderFormClose = payload => ({
  type: types.ON_CLOSE,
  payload
});

export const onSelectedPlaceChanged = (x, y) => ({
  type: types.ON_SELECTED_PLACE_CHANGED,
  x,
  y
});

export const onSelectedAdditionalAdd = (id, count) => ({
  type: types.ON_SELECTED_ADDITIONAL_ADD,
  id,
  count
});
export const onSelectedAdditionalRemove = id => ({
  type: types.ON_SELECTED_ADDITIONAL_REMOVE,
  id
});

export const onAdditionalFetching = payload => ({
  type: types.ON_ADDITIONAL_FETCHING,
  payload
});

export const onAdditionalSuccess = payload => ({
  type: types.ON_ADDITIONAL_SUCCESS,
  payload
});

export const onAdditionalFailed = payload => ({
  type: types.ON_ADDITIONAL_FAILED,
  payload
});

export const onOrderSuccess = payload => ({
  type: types.ON_ORDER_SUCCESS,
  payload
});

export const loadAdditional = () => (dispatch, getState) => {
  dispatch(onAdditionalFetching());

  return axios
    .get(api.additional)
    .then(response => dispatch(onAdditionalSuccess(response.data)))
    .catch(error => dispatch(onAdditionalFailed(error.message)));
};

export const addNewOrder = () => (dispatch, getState) => {
  dispatch(onAdditionalFetching());

  const state = getState();

  let data = {
    session: state.films.openedSeance._id,
    place: null,
    additional: null
  };

  try {
    data.place = JSON.stringify(state.orderForm.selectedPlace);
    data.additional = JSON.stringify(state.orderForm.selectedAdditionals);
  } catch (error) {
    console.log("Can't stringify {addNewOrder} action.", error);
    dispatch(onAdditionalFailed(error));
    return;
  }

  const headers = {
    Authorization: state.user.token
  };

  return axios
    .post(api.orders, data, { headers })
    .then(
      response =>
        response.status === 201
          ? dispatch(onOrderSuccess())
          : dispatch(onAdditionalFailed(response.data))
    )
    .catch(error => dispatch(onAdditionalFailed(error.message)));
};

export const addToPendingArray = () => (dispatch, getState) => {
  const state = getState();

  const data = {
    x: state.orderForm.selectedPlace.x,
    y: state.orderForm.selectedPlace.y
  };

  const seanceId = state.films.openedSeance._id;

  const headers = {
    Authorization: state.user.token
  };

  return axios
    .post(`${api.pending}/${seanceId}`, data, { headers })
    .then(response => console.log("Add to pending places!"))
    .catch(error => console.log("Error. Not add to pending places!"));
};

export const removeFromPendingArray = () => (dispatch, getState) => {
  const state = getState();

  const data = {
    x: state.orderForm.selectedPlace.x,
    y: state.orderForm.selectedPlace.y
  };

  const seanceId = state.films.openedSeance._id;

  const headers = {
    Authorization: state.user.token
  };

  return axios
    .delete(`${api.pending}/${seanceId}`, { data, headers })
    .then(response => console.log("Remove from pending places!"))
    .catch(error => console.log("Error. Not remove from pending places!"));
};
