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

    // for making schema of room
    roomsSchemas: [],
    seatsTypes: [],
    loadSeatsError: null,
    currentRoomSchema: {
        placeSchema: []
    },
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

        case types.ON_ADD_CINEMA_SUCCESS:
            return { ...state, isFetching: false, response: action.response };

        case types.ON_ADD_CINEMA_FAILED:
            return { ...state, isFetching: false, error: action.error };

        case types.ON_CINEMA_PAGE_CHANGE:
            return { ...state, pageId: action.pageId };

        case types.ON_LOAD_TYPES_SUCCESS:
            return { ...state, isFetching: false, seatsTypes: action.seatsTypes };

        case types.ON_LOAD_TYPES_FAILED:
            return { ...state, isFetching: false, loadSeatsError: action.error };

        case types.ON_CURRENT_ROOM_SCHEMA_CHANGE:
            return { ...state, currentRoomSchema: { placeSchema: action.schema } };

        case types.ON_CURRENT_ROOM_SCHEMA_UPDATE:
            const newSchema = Array.from(state.currentRoomSchema.placeSchema);
            const { x, y, value } = action;

            newSchema[x][y] = value;

            return { ...state, currentRoomSchema: { placeSchema: newSchema } };

        default:
            return state;
    }
};

export default CinemaReducer;