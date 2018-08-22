import types from "../types/films";
import { FILTER_TYPES, PAGE_ITEMS_COUNT } from "../constants/constants";

const initialState = {
    filter: FILTER_TYPES[0].value,
    searchText: "",
    pageId: 0,
    pageCount: 0,
    error: null,
    isFetching: false,
    currentFilms: [],
    allFilms: [],
    openedSeance: {},
};

const FilmsReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.ON_SET_INITIAL_STATE: 
            return { ...state, ...action.payload };

        case types.ON_FILMS_FILTER_CHANGE:
            return { ...state, filter: action.payload };

        case types.ON_SEARCH_TEXT_CHANGE:
            return { ...state, searchText: action.payload };

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
                currentFilms: action.payload.data || [],
                pageCount: Math.ceil(action.payload.count / PAGE_ITEMS_COUNT),
                isFetching: false 
            };

        case types.ON_FILM_SUCCESS:
            return { ...state, openedSeance: action.seance, searchText: "", pageId: 0, filter: FILTER_TYPES[0].value };

        default:
            return state;
    }
};

export default FilmsReducer;