import types from "../types/order-form";

export const onOrderFormOpen = (payload) => ({
    type: types.ON_OPEN,
    payload,
});

export const onOrderFormClose = (payload) => ({
    type: types.ON_CLOSE,
    payload,
});