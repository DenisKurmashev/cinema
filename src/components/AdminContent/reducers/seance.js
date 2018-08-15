import types from "../types/seance";

const initialState = {
    isFetching: false,
    error: null,
    response: null, 
};

const SeanceReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.ON_SEANCE_FETCHING: 
            return { ...state, isFetching: true, error: null, response: null };

        case types.ON_SEANCE_SUCCESS:
            return { ...state, isFetching: false, response: action.response };

        case types.ON_SEANCE_FAILED:
            return { ...state, isFetching: false, error: action.error };

        default:
            return state;
    }
};

export default SeanceReducer;