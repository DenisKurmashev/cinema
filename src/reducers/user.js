import types from "../types/user";

const initialState = {
    isFetching: false,
    isAuth: false,
    loginOrRegisterError: "",
    user: {
        name: "Denis",
        role: "user"
    },
};

const UserReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.ON_USER_AUTH_STATUS_CHANGE: 
            return { ...state, isAuth: !state.isAuth };

        case types.ON_FETCH:
            return { ...state, isFetching: true };

        case types.ON_LOGIN_OR_REGISTER_FAILED: 
            return { ...state, isFetching: false, loginOrRegisterError: action.payload };

        case types.ON_LOGIN_OR_REGISTER_SUCCESS:
            return { ...state, isAuth: true, isFetching: false, user: action.payload.user || state.user, token: action.payload.token };

        case types.ON_LOGOUT: 
            return { ...state, isAuth: false, user: { ...initialState.user } };

        default:
            return state;
    }
};

export default UserReducer;