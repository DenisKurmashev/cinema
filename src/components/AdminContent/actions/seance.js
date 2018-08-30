import axios from "axios";
import types from "../types/seance";
import { getApiObject } from "../../../util";

const api = getApiObject();

export const onSeanceFetching = () => ({
  type: types.ON_SEANCE_FETCHING
});
export const onSeanceSuccess = response => ({
  type: types.ON_SEANCE_SUCCESS,
  response
});
export const onSeanceFailed = error => ({
  type: types.ON_SEANCE_FAILED,
  error
});

export const addNewSeance = ({ date, roomNumber, cinema, film }) => (
  dispatch,
  getState
) => {
  dispatch(onSeanceFetching());

  const state = getState();

  if (!cinema) {
    cinema = state.admin.cinema.selectedCinema._id;
  }

  if (!film) {
    film = state.admin.films.selectedFilm._id;
  }

  const data = {
    date,
    roomNumber,
    cinema,
    film
  };

  const headers = {
    Authorization: state.user.token
  };

  return axios
    .post(api.sessionsById, data, { headers })
    .then(response => dispatch(onSeanceSuccess(response.data)))
    .catch(error => dispatch(onSeanceFailed(error.message)));
};
