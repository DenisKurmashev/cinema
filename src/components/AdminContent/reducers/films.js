import types from "../types/films";

const initialState = {
    isFetching: false,
    error: null,
    response: null, 

    // for add new Seance form
    pageSize: 10, // show at one page 10 items
    pageId: 0,
    pageCount: 0,
    loadedFilms: [],
    loadFilmsError: null,
    selectedFilm: null,
};

const FilmReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.ON_SELECTED_FILM_CHANGE: 
            return { 
                ...state, 
                selectedFilm: state.loadedFilms.find(el => el._id === action.id)
            };

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

        case types.ON_RESET_SELECTED_FILM:
            return { ...state, selectedFilm: null };

        default:
            return state;
    }
};

export default FilmReducer;