import axios from "axios";
import types from "../types/cinema";
import { getApiObject } from "../../../util";

const api = getApiObject();

export const onSelectedCinemaChange = (id) => ({
    type: types.ON_SELECTED_CINEMA_CHANGE,
    id,
});

export const onCinemaFetching = () => ({
    type: types.ON_CINEMA_FETCHING,
});
export const onLoadCinemaSuccess = ({ cinemas, pageCount }) => ({
    type: types.ON_LOAD_CINEMA_SUCCESS,
    cinemas,
    pageCount,
});
export const onLoadCinemaFailed = (error) => ({
    type: types.ON_LOAD_CINEMA_FAILED,
    error,
});

export const onAddNewCinemaSuccess = (response) => ({
    type: types.ON_ADD_CINEMA_SUCCESS,
    response,
});
export const onAddNewCinemaFailed = (error) => ({
    type: types.ON_ADD_CINEMA_FAILED,
    error,
});


export const onPageIdChange = (pageId) => ({
    type: types.ON_CINEMA_PAGE_CHANGE,
    pageId,
});


export const loadCinema = 
    () => 
        (dispatch, getState) => {
            dispatch(onCinemaFetching());

            const state = getState();
            const { pageId, pageSize } = state.admin.cinema;

            const headers = {
                "Authorization": getState().user.token
            };

            const url = api.cinema + `/?pageId=${pageId}&pageSize=${pageSize}`;

            return axios.get(url, { headers })
                .then(response => dispatch(onLoadCinemaSuccess(response.data)))
                .catch(error => dispatch(onLoadCinemaFailed(error.message)));

        };

export const addNewCinema = 
    ({ name, city }) => 
        (dispatch, getState) => {
            dispatch(onCinemaFetching());

            const data = {
                name,
                city,
            };

            const headers = {
                "Authorization": getState().user.token
            };

            return axios.post(api.cinema, data, { headers })
                .then(response => dispatch(onAddNewCinemaSuccess(response.data)))
                .catch(error => dispatch(onAddNewCinemaFailed(error.message)));

        };
