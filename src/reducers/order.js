import types from "../types/order";

const initialState = {
  isSortByFuture: "future",
  isFetching: false,
  orderList: [],
  error: null
};

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ON_CHANGE_ORDER_SORT_FILTER:
      return {
        ...state,
        isSortByFuture: state.isSortByFuture === "future" ? "past" : "future"
      };

    case types.ON_ORDERS_FETCHING:
      return { ...state, isFetching: true };

    case types.ON_ORDERS_SUCCESS:
      return { ...state, orderList: action.orders, isFetching: false };

    case types.ON_ORDERS_FAILED:
      return { ...state, error: action.error, isFetching: false };

    default:
      return state;
  }
};

export default OrderReducer;
