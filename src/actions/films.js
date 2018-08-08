import types from "../types/films";
import axios from "axios";
import { getApiObject, setGetParam } from "../util";

export const onSetInitialState = (payload) => ({
    type: types.ON_SET_INITIAL_STATE,
    payload
});

export const onFilmsFilterChange = (payload) =>{
    setGetParam("filter", payload);
    return {
        type: types.ON_FILMS_FILTER_CHANGE,
        payload,
    };
};

export const onFilmsPageChange = (pageId) => ({
    type: types.ON_FILMS_PAGE_CHANGE,
    pageId,
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

export const onFilmSuccess = (seance) => ({
    type: types.ON_FILM_SUCCESS,
    seance,
});

export const onSearchTextChange = (payload) => {
    setGetParam("searchText", payload);
    return {
        type: types.ON_SEARCH_TEXT_CHANGE,
        payload,
    };
}

export const onFilmsLoad = (pageId) => {
    return (dispatch, getState) => {
        dispatch(onFilmsFetching());

        if (!pageId)
            pageId = getState().films.pageId + 1;

        return axios.get(getApiObject().sessions + pageId)
            .then(response => dispatch(onFilmsSuccess(response.data)))
            .catch(error => dispatch(onFilmsFailed(error.message)));

    };
};

export const onFilmLoad = (seanceId) => {
    return (dispatch, getState) => {
        dispatch(onFilmsFetching());

        if (!seanceId)
            seanceId = getState().films.openedSeance._id

        return axios.get(`${getApiObject().sessionsById}/${seanceId}`)
            .then(response => dispatch(onFilmSuccess(response.data)))
            .catch(error => dispatch(onFilmsFailed(error.message)));

    };
};

export const onFilmsChange = (text, pageId) => {
    return (dispatch, getState) => {
        dispatch(onFilmsFetching());

        if (!pageId) 
            pageId = getState().films.pageId + 1

        const data = {  
            text: text || getState().films.searchText,
            filter: getState().films.filter
        };

        return axios.post(`${getApiObject().search}/${pageId}`, data)
            .then(response => dispatch(onFilmsSuccess(response.data)))
            .catch(error => dispatch(onFilmsFailed(error.message)));

    };
};