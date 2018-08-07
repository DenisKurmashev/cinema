import types from "../types/order-form";

const initialState = {
    isOpened: false,
    error: "",
    additional: [],
    selectedPlace: {
        x: null,
        y: null,
    }
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

        default:
            return state;
    }
};

export default OrderFormReducer;