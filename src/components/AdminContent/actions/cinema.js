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

