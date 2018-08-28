import configStore from "redux-mock-store";

import * as OrderActions from "../../actions/order";

const mockStore = configStore();
const store = mockStore();

describe("Order actions", () => {
    beforeEach(() => {
        store.clearActions();
    });
});

describe("Check all actions creators", () => {
    test("Dispatch the current action and payload", () => {
        const expectedAction = [
            {
                // Note: you should use constants
                type: "ON_CHANGE_ORDER_SORT_FILTER",
                payload: "",
            },
            {
                type: "ON_ORDERS_FETCHING",
                payload: "",
            },
            {
                type: "ON_ORDERS_FAILED",
                error: "",
            },
            {
                type: "ON_ORDERS_SUCCESS",
                orders: "",
            },
        ];

        store.dispatch(OrderActions.onChangeOrderSortFilter(""));
        store.dispatch(OrderActions.onOrdersFetching(""));
        store.dispatch(OrderActions.onOrdersFailed(""));
        store.dispatch(OrderActions.onOrdersSuccess(""));

        expect(store.getActions()).toEqual(expectedAction);
    });
});