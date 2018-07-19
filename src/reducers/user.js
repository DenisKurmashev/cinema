import types from "../types/user";

const initialState = {
    isLoginOrRegisterFetching: false,
    isAuth: false,
    error: "",
    info: {
        name: "Denis",
        role: "user"
    },
};

const UserReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.ON_LOGIN_OR_REGISTER_FETCHING:
            return { ...state, isLoginOrRegisterFetching: true };

        case types.ON_LOGIN_OR_REGISTER_FAILED: 
            return { ...state, isLoginOrRegisterFetching: false, error: action.payload };

        case types.ON_LOGIN_OR_REGISTER_SUCCESS:
            return { ...state, isAuth: true, isLoginOrRegisterFetching: false, info: action.payload.user || state.info, token: action.payload.token };

        case types.ON_LOGOUT: 
            return { ...state, isAuth: false, info: { ...initialState.info } };

        default:
            return state;
    }
};

export default UserReducer;