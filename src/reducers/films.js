import types from "../types/films";
import { FILTER_TYPES } from "../constants/constants";

const initialState = {
    filter: FILTER_TYPES[0].value,
    pageId: 1,
    error: null,
    isFetching: false,
    currentFilms: [],
    allFilms: [],
};

const FilmsReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.ON_FILMS_FILTER_CHANGE:
            return { ...state, filter: action.payload };

        case types.ON_FILMS_PAGE_CHANGE: 
            return { ...state, pageId: action.pageId };

        case types.ON_FILMS_FETCHING: 
            return { ...state, isFetching: true };

        case types.ON_FILMS_FAILED:
            return { ...state, error: action.payload, isFetching: false };

        case types.ON_FILMS_SUCCESS:
            return { 
                ...state, 
                allFilms: [ ...state.allFilms, ...(action.payload || []) ], 
                currentFilms: action.payload.slice(0, 10) || [],
                isFetching: false 
            };

        default:
            return state;
    }
};

export default FilmsReducer;