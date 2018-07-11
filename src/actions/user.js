import types from "../types/user";

export const onUserAuthStatusChange = (payload) => ({
    type: types.ON_USER_AUTH_STATUS_CHANGE,
    payload,
});