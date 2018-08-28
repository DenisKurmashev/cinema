import types from "../types/order-form";

const initialState = {
    // Note: you should pick one style for naming variables(with prefix isFetching, isOpened, hasClosed or withour fetching, closed, succeed)
    // Don't mix many styles in naming
    fetching: false,
    isOpened: false,
    isSuccess: false,
    error: "",
    additional: [],
    selectedPlace: {
        x: null,
        y: null,
    },
    selectedAdditionals: []
};

const OrderFormReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.ON_OPEN:
            return { ...state, isOpened: true };

        case types.ON_CLOSE:
            return { ...state, isOpened: false, selectedAdditionals: [], isSuccess: false };

        case types.ON_ADDITIONAL_FETCHING:
            return { ...state, fetching: true };

        case types.ON_ADDITIONAL_SUCCESS:
            return { ...state, additional: action.payload, fetching: false };

        case types.ON_ADDITIONAL_FAILED:
            return { ...state, error: action.payload, fetching: false };

        case types.ON_SELECTED_PLACE_CHANGED:
            return { ...state, selectedPlace: { x: action.x, y: action.y } };

        case types.ON_ORDER_SUCCESS:
            return { ...state, isSuccess: true, fetching: false };

        case types.ON_SELECTED_ADDITIONAL_ADD:
        // Note: useless whitespaces, lint ALWAYS should be used
            return { 
                ...state, 
                selectedAdditionals: [ 
                    // Note: Try to name vars properly(e.g.: item.additional !== action.id, if "additional" is id then name it "additionalId")
                    ...state.selectedAdditionals.filter(item => item.additional !== action.id), 
                    { additional: action.id, count: action.count } 
                ] 
            };

        case types.ON_SELECTED_ADDITIONAL_REMOVE:
            return { ...state, selectedAdditionals: state.selectedAdditionals.filter(item => item.additional !== action.id) };

        default:
            return state;
    }
};

export default OrderFormReducer;