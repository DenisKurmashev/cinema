import types from "../types/films";

const initialState = {
    isFetching: false,
    error: null,
    response: null, 
};

const FilmReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.ON_ADD_NEW_FILM_FETCHING: 
            return { ...state, isFetching: true, error: null, response: null };

        case types.ON_ADD_NEW_FILM_SUCCESS:
            return { ...state, isFetching: false, response: action.response };

        case types.ON_ADD_NEW_FILM_FAILED:
            return { ...state, isFetching: false, error: action.error };

        default:
            return state;
    }
};

export default FilmReducer;