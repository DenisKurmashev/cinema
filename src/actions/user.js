import axios from "axios";
import types from "../types/user";
import { getApiObject } from "../util";

const api = getApiObject();

export const onLoginOrRegisterFetch = (payload) => ({
    type: types.ON_LOGIN_OR_REGISTER_FETCHING,
    payload,
});

export const onLoginOrRegisterFailed = (payload) => ({
    type: types.ON_LOGIN_OR_REGISTER_FAILED,
    payload,
});

export const onLoginOrRegisterSuccess = (payload) => ({
    type: types.ON_LOGIN_OR_REGISTER_SUCCESS,
    payload,
});

export const login = (payload) => {
    return (dispatch, getState) => {
        dispatch(onLoginOrRegisterFetch());

        return axios.post(api.login, payload)
            .then(response => dispatch(onLoginOrRegisterSuccess(response.data)))
            .catch((err) => dispatch(onLoginOrRegisterFailed(err.message)));

    };
};

export const register = (payload) => {
    return (dispatch, getState) => {
        dispatch(onLoginOrRegisterFetch());

        return axios.post(api.register, payload)
            .then(response => dispatch(onLoginOrRegisterSuccess(response.data)))
            .catch((err) => dispatch(onLoginOrRegisterFailed(err.message)));

    };
};

export const onLogout = (payload) => ({
    type: types.ON_LOGOUT,
    payload,
});