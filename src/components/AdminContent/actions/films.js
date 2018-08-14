import axios from "axios";
import types from "../types/films";
import { getApiObject } from "../../../util";

export const onAddNewFilmFetching = () => ({
    type: types.ON_ADD_NEW_FILM_FETCHING,
});

export const onAddNewFilmSuccess = (response) => ({
    type: types.ON_ADD_NEW_FILM_SUCCESS,
    response,
});

export const onAddNewFilmFailed = (error) => ({
    type: types.ON_ADD_NEW_FILM_FAILED,
    error,
});

export const onAddNewFilm = 
    (name, released, cover, description) => 
        (dispatch, getState) => {
            dispatch(onAddNewFilmFetching());

            const data = {
                name,
                released,
                cover, 
                description,
            };

            const headers = {
                "Authorization": getState().user.token
            };

            return axios.post(getApiObject().films, data, { headers })
                .then(response => dispatch(onAddNewFilmSuccess(response.data)))
                .catch(error => dispatch(onAddNewFilmFailed(error.message)));

        };