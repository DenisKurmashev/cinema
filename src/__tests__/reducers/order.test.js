import OrderReducer from "../../reducers/order";
import types from "../../types/order";

describe("Check order reducer", () => {
    test("check sort filter", () => {
        const action = {
            type: types.ON_CHANGE_ORDER_SORT_FILTER,
            payload: null,
        };
        const expectedState = {
            isSortByFuture: "past",
            isFetching: false,
            orderList: [],
            error: null,
        };

        expect(OrderReducer(undefined, action)).toEqual(expectedState);
    });

    test("check orders fetching", () => {
        const action = { type: types.ON_ORDERS_FETCHING };
        const expectedState = {
            isSortByFuture: "future",
            isFetching: true,
            orderList: [],
            error: null,
        };

        expect(OrderReducer(undefined, action)).toEqual(expectedState);
    });

    test("check order success", () => {
        const action = {
            type: types.ON_ORDERS_SUCCESS,
            orders: [{ name: "OrderName" }],
        };
        const expectedState = {
            isSortByFuture: "future",
            isFetching: false,
            orderList: action.orders,
            error: null,
        };

        expect(OrderReducer(undefined, action)).toEqual(expectedState);
    });

    test("check order failed", () => {
        const action = {
            type: types.ON_ORDERS_FAILED,
            error: { message: "Some Error" },
        };
        const expectedState = {
            isSortByFuture: "future",
            isFetching: false,
            orderList: [],
            error: action.error,
        };

        expect(OrderReducer(undefined, action)).toEqual(expectedState);
    });

    test("check default case", () => {
        const action = { type: null };
        const expectedState = {
            isSortByFuture: "future",
            isFetching: false,
            orderList: [],
            error: null,
        };

        expect(OrderReducer(undefined, action)).toEqual(expectedState);
    });
});