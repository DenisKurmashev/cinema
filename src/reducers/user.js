import types from "../types/user";

const initialState = {
    isAuth: false,
    user: {},
};

const UserReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.ON_USER_AUTH_STATUS_CHANGE: 
            return { ...state, isAuth: !state.isAuth };

        default:
            return state;
    }
};

export default UserReducer;