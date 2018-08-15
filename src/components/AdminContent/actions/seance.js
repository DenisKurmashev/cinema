import axios from "axios";
import types from "../types/seance";
import { getApiObject } from "../../../util";

const api = getApiObject();

export const onSeanceFetching = () => ({
    type: types.ON_SEANCE_FETCHING,
});

export const onSeanceSuccess = (response) => ({
    type: types.ON_SEANCE_SUCCESS,
    response,
});

export const onSeanceFailed = (error) => ({
    type: types.ON_SEANCE_FAILED,
    error,
});