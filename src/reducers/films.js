import types from "../types/films";

const initialState = {
    error: null,
    isFetching: false,
    currentFilms: [],
    allFilms: [],
};

const FilmsReducer = (state = initialState, action) => {
    switch(action.type) {
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

        case types.ON_FILMS_CHANGE: 
            return { 
                ...state,  
                currentFilms: state.films.filter((el, index) => {
                    // TO-DO: search logic
                }).slice(0, 10)
            };

        default:
            return state;
    }
};

export default FilmsReducer;