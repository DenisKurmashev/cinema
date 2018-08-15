import axios from "axios";
import types from "../types/cinema";
import { getApiObject } from "../../../util";

const api = getApiObject();

export const onCinemaFetching = () => ({
    type: types.ON_CinemaS_FETCHING,
});
export const onGetCinemaSuccess = (response) => ({
    type: types.ON_LOAD_CINEMA_SUCCESS,
    response,
});
export const onGetCinemaFailed = (error) => ({
    type: types.ON_LOAD_CINEMA_FAILED,
    error,
});


export const onPageIdChange = (pageId) => ({
    type: types.ON_CINEMA_PAGE_CHANGE,
    pageId,
});


