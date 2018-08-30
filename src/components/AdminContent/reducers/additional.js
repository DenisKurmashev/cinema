import types from "../types/additional";

const initialState = {
  isFetching: false,
  response: null,
  error: null
};

const AdditionalReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ON_ADDITIONAL_FETCHING:
      return { ...state, isFetching: true, error: null, response: null };

    case types.ON_ADDITIONAL_SUCCESS:
      return { ...state, isFetching: false, response: action.data };

    case types.ON_ADDITIONAL_FAILED:
      return { ...state, isFetching: false, error: action.error };

    default:
      return state;
  }
};

export default AdditionalReducer;
