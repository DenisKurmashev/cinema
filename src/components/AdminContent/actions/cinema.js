import axios from "axios";
import types from "../types/cinema";
import { getApiObject } from "../../../util";

const api = getApiObject();

export const onResetSelectedCinema = () => ({
  type: types.ON_RESET_SELECTED_CINEMA
});

export const onSelectedCinemaChange = id => ({
  type: types.ON_SELECTED_CINEMA_CHANGE,
  id
});

export const onCinemaFetching = () => ({
  type: types.ON_CINEMA_FETCHING
});
export const onLoadCinemaSuccess = ({ cinemas, pageCount }) => ({
  type: types.ON_LOAD_CINEMA_SUCCESS,
  cinemas,
  pageCount
});
export const onLoadCinemaFailed = error => ({
  type: types.ON_LOAD_CINEMA_FAILED,
  error
});

export const onLoadTypesSuccess = seatsTypes => ({
  type: types.ON_LOAD_TYPES_SUCCESS,
  seatsTypes
});
export const onLoadTypesFailed = error => ({
  type: types.ON_LOAD_TYPES_FAILED,
  error
});

export const onAddNewCinemaSuccess = response => ({
  type: types.ON_ADD_CINEMA_SUCCESS,
  response
});
export const onAddNewCinemaFailed = error => ({
  type: types.ON_ADD_CINEMA_FAILED,
  error
});

export const onPageIdChange = pageId => ({
  type: types.ON_CINEMA_PAGE_CHANGE,
  pageId
});

export const onCurrentRoomSchemaChange = schema => ({
  type: types.ON_CURRENT_ROOM_SCHEMA_CHANGE,
  schema
});
export const onCurrentRoomSchemaUpdate = (x, y, value) => ({
  type: types.ON_CURRENT_ROOM_SCHEMA_UPDATE,
  x,
  y,
  value
});

export const loadCinema = () => (dispatch, getState) => {
  dispatch(onCinemaFetching());

  const state = getState();
  const { pageId, pageSize } = state.admin.cinema;

  const headers = {
    Authorization: getState().user.token
  };

  const url = api.cinema + `/?pageId=${pageId}&pageSize=${pageSize}`;

  return axios
    .get(url, { headers })
    .then(response => dispatch(onLoadCinemaSuccess(response.data)))
    .catch(error => dispatch(onLoadCinemaFailed(error.message)));
};

export const addNewCinema = ({ name, city }) => (dispatch, getState) => {
  dispatch(onCinemaFetching());

  const state = getState();
  let rooms = null;

  if (state.admin.cinema.currentRoomSchema.placeSchema.length > 0) {
    try {
      rooms = JSON.stringify([state.admin.cinema.currentRoomSchema]);
    } catch (ex) {
      console.log(ex);
      rooms = null;
    }
  }

  const data = {
    name,
    city
  };

  if (rooms) data.rooms = rooms;

  const headers = {
    Authorization: state.user.token
  };

  return axios
    .post(api.cinema, data, { headers })
    .then(response => dispatch(onAddNewCinemaSuccess(response.data)))
    .catch(error => dispatch(onAddNewCinemaFailed(error.message)));
};
