import types from "../types/films";

export const onFilmsFetching = (payload) => ({
    type: types.ON_FILMS_FETCHING,
    payload,
}); 

export const onFilmsFailed = (payload) => ({
    type: types.ON_FILMS_FAILED,
    payload,
}); 

export const onFilmsSuccess = (payload) => ({
    type: types.ON_FILMS_FETCHING,
    payload,
}); 

export const onFilmsChange = (payload) => ({
    type: types.ON_FILMS_CHANGE,
    payload,
});