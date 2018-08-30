import axios from "axios";
import types from "../types/additional";
import { getApiObject } from "../../../util";

const api = getApiObject();

export const onAdditionalFetching = () => ({
  type: types.ON_ADDITIONAL_FETCHING
});

export const onAdditionalSuccess = data => ({
  type: types.ON_ADDITIONAL_SUCCESS,
  data
});

export const onAdditionalFailed = error => ({
  type: types.ON_ADDITIONAL_FAILED,
  error
});

export const addAdditional = ({ name, price, description }) => (
  dispatch,
  getState
) => {
  dispatch(onAdditionalFetching());

  const data = {
    name,
    price,
    description
  };

  const headers = {
    Authorization: getState().user.token
  };

  return axios
    .post(api.additional, data, { headers })
    .then(response => dispatch(onAdditionalSuccess(response.data)))
    .catch(error => dispatch(onAdditionalFailed(error.message)));
};
