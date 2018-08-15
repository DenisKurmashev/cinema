import types from "../types/films";

const initialState = {
    isFetching: false,
    error: null,
    response: null, 

    // for add new Seance form
    pageId: 0,
    pageCount: 0,
    loadedFilms: [],
    loadFilmsError: null,
};

const FilmReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.ON_FILMS_FETCHING: 
            return { ...state, isFetching: true, error: null, response: null };

        case types.ON_ADD_NEW_FILM_SUCCESS:
            return { ...state, isFetching: false, response: action.response };

        case types.ON_ADD_NEW_FILM_FAILED:
            return { ...state, isFetching: false, error: action.error };

        case types.ON_LOAD_FILMS_SUCCESS:
            return { ...state, isFetching: false, loadedFilms: action.films, pageCount: action.pageCount };

        case types.ON_LOAD_FILMS_FAILED:
            return { ...state, isFetching: false, loadFilmsError: action.error };

        case types.ON_PAGE_ID_CHANGE:
            return { ...state, pageId: action.pageId };

        default:
            return state;
    }
};

export default FilmReducer;