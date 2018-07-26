import types from "../types/films";
import axios from "axios";
import { getApiObject } from "../util";

export const onFilmsFilterChange = (payload) => ({
    type: types.ON_FILMS_FILTER_CHANGE,
    payload,
});

export const onFilmsPageChange = (payload) => ({
    // TO-DO: ...
    type: types.ON_FILMS_FILTER_CHANGE,
    payload,
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

export const onFilmsLoad = (pageId) => {
    return (dispatch, getState) => {
        dispatch(onFilmsFetching());

        return axios.get(`${getApiObject().sessions}/${pageId}`)
            .then(response => dispatch(onFilmsSuccess(response.data)))
            .catch(error => dispatch(onFilmsFailed(error)));

    };
};

export const onFilmsChange = (payload) => ({
    type: types.ON_FILMS_CHANGE,
    payload,
});