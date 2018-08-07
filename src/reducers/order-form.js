import types from "../types/order-form";

const initialState = {
    isOpened: false,
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
            return { ...state, isOpened: false };

        case types.ON_ADDITIONAL_SUCCESS:
            return { ...state, additional: action.payload };

        case types.ON_ADDITIONAL_FAILED:
            return { ...state, error: action.payload };

        case types.ON_SELECTED_PLACE_CHANGED:
            return { ...state, selectedPlace: { x: action.x, y: action.y } };

        case types.ON_SELECTED_ADDITIONAL_ADD:
            return { 
                ...state, 
                selectedAdditionals: [ 
                    ...state.selectedAdditionals.filter(item => item.id !== action.id), 
                    { id: action.id, count: action.count } 
                ] 
            };

        case types.ON_SELECTED_ADDITIONAL_REMOVE:
            return { ...state, selectedAdditionals: state.selectedAdditionals.filter(item => item.id !== action.id) };

        default:
            return state;
    }
};

export default OrderFormReducer;