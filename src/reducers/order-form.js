import types from "../types/order-form";

const initialState = {
    isOpened: false
};

const OrderFormReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.ON_OPEN:
            return { ...state, isOpened: true };

        case types.ON_CLOSE:
            return { ...state, isOpened: false };

        default:
            return state;
    }
};

export default OrderFormReducer;