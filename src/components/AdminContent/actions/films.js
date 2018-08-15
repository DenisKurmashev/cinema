import axios from "axios";
import types from "../types/films";
import { getApiObject } from "../../../util";

const api = getApiObject();

export const onFilmsFetching = () => ({
    type: types.ON_FILMS_FETCHING,
});
export const onAddNewFilmSuccess = (response) => ({
    type: types.ON_ADD_NEW_FILM_SUCCESS,
    response,
});
export const onAddNewFilmFailed = (error) => ({
    type: types.ON_ADD_NEW_FILM_FAILED,
    error,
});


export const onPageIdChange = (pageId) => ({
    type: types.ON_PAGE_ID_CHANGE,
    pageId,
});


export const onLoadFilmsSuccess = ({ films, pageCount }) => ({
    type: types.ON_LOAD_FILMS_SUCCESS,
    films,
    pageCount,
});
export const onLoadFilmsFailed = (error) => ({
    type: types.ON_LOAD_FILMS_FAILED,
    error,
});


export const addNewFilm = 
    ({ name, released, cover, description }) => 
        (dispatch, getState) => {
            dispatch(onFilmsFetching());

            const data = {
                name,
                released,
                cover, 
                description,
            };

            const headers = {
                "Authorization": getState().user.token
            };

            return axios.post(api.films, data, { headers })
                .then(response => dispatch(onAddNewFilmSuccess(response.data)))
                .catch(error => dispatch(onAddNewFilmFailed(error.message)));

        };

// get films with pagination
// pageId - pagination page number
export const getFilms = 
    () => 
        (dispatch, getState) => {
            dispatch(onFilmsFetching());

            const state = getState();
            const { pageId, pageSize } = state.admin.films;

            const headers = {
                "Authorization": getState().user.token
            };

            const url  = api.films + `/?pageId=${pageId}&pageSize=${pageSize}`;

            return axios.get(url, { headers })
                .then(response => dispatch(onLoadFilmsSuccess(response.data)))
                .catch(error => dispatch(onLoadFilmsFailed(error.message)));

        };