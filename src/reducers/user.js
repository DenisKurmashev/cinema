import types from "../types/user";

const initialState = {
    isAuth: false,
    user: {
        name: "Denis",
        role: "user"
    },
};

const UserReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.ON_USER_AUTH_STATUS_CHANGE: 
            return { ...state, isAuth: !state.isAuth };

        case types.ON_LOGOUT: 
            return { ...state, isAuth: false, user: { ...initialState.user } };

        default:
            return state;
    }
};

export default UserReducer;