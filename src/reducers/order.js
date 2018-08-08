import types from "../types/order";

const initialState = {
    isFetching: false,
    orders: [],
    error: null,
};

const OrderReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.ON_ORDERS_FETCHING:
            return { ...state, isFetching: true };

        case types.ON_ORDERS_SUCCESS:
            return { ...state, orders: action.orders, isFetching: false };

        case types.ON_ORDERS_FAILED:
            return { ...state, error: action.error, isFetching: false };

        default:
            return state;
    }
};

export default OrderReducer;