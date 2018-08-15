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
};

const CinemaReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.ON_CINEMA_FETCHING: 
            return { ...state, isFetching: true, error: null, response: null };

        case types.ON_LOAD_CINEMA_SUCCESS:
            return { ...state, isFetching: false, loadedCinemas: action.films, pageCount: action.pageCount };

        case types.ON_LOAD_CINEMA_FAILED:
            return { ...state, isFetching: false, loadCinemasError: action.error };

        case types.ON_PAGE_ID_CHANGE:
            return { ...state, pageId: action.pageId };

        default:
            return state;
    }
};

export default CinemaReducer;