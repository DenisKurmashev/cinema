import types from "../types/films";
import axios from "axios";
import { getApiObject } from "../util";

export const onFilmsFilterChange = (payload) => ({
    type: types.ON_FILMS_FILTER_CHANGE,
    payload,
});

export const onFilmsPageChange = (films) => ({
    type: types.ON_FILMS_PAGE_CHANGE,
    films,
});

export const onFilmsFetching = (payload) => ({
    type: types.ON_FILMS_FETCHING,
    payload,
}); 

export const onFilmsFailed = (payload) => ({
    type: types.ON_FILMS_FAILED,
    payload,
}); 

export const onFilmsSuccess = (payload) => ({
    type: types.ON_FILMS_SUCCESS,
    payload,
}); 

export const onFilmsLoad = (pageId = 1) => {
    return (dispatch, getState) => {
        dispatch(onFilmsFetching());

        return axios.get(`${getApiObject().sessions}/${pageId}`)
            .then(response => dispatch(onFilmsSuccess(response.data)))
            .catch(error => dispatch(onFilmsFailed(error)));

    };
};

export const onFilmsChange = (text) => {
    return (dispatch, getState) => {
        dispatch(onFilmsFetching());

        const data = {  
            text: text,
            filter: getState().films.filter
        };

        return axios.post(getApiObject().search, data)
            .then(response => dispatch(onFilmsSuccess(response.data)))
            .catch(error => dispatch(onFilmsFailed(error)));

    };
};