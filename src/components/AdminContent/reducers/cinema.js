import types from "../types/cinema";

const initialState = {
    isFetching: false,
    error: null,
    response: null, 

    // for add new Seance form
    pageSize: 10, // show at one page 10 items
    pageId: 0,
    pageCount: 0,
    loadedCinemas: [],
    loadCinemasError: null,
    selectedCinema: null,
};

const CinemaReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.ON_SELECTED_CINEMA_CHANGE: 
            return { 
                ...state, 
                selectedCinema: state.loadedCinemas.find(el => el._id === action.id) 
            };

        case types.ON_SELECTED_FILM_CHANGE:
            return { ...state, selectedFilm: action.id };

        case types.ON_CINEMA_FETCHING: 
            return { ...state, isFetching: true, error: null, response: null };

        case types.ON_LOAD_CINEMA_SUCCESS:
            return { ...state, isFetching: false, loadedCinemas: action.cinemas, pageCount: action.pageCount };

        case types.ON_LOAD_CINEMA_FAILED:
            return { ...state, isFetching: false, loadCinemasError: action.error };

        case types.ON_CINEMA_PAGE_CHANGE:
            return { ...state, pageId: action.pageId };

        default:
            return state;
    }
};

export default CinemaReducer;