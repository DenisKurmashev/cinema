import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const UserBar = ({ user, userActions }) => {
    if (!user.isAuth)
        return null;

    const welcomeText = `Hello, ${user.info.name || "-user-"}`;

    return (
        <div className="user-bar">
            <div className="user-bar-item">{welcomeText}</div>
            <div onClick={userActions.onLogout} className="user-bar-item btn-underline">logout</div>
        </div>
    );
};

UserBar.propTypes = {
    user: PropTypes.shape({
        isLoginOrRegisterFetching: PropTypes.bool,
        isAuth: PropTypes.bool,
        error: PropTypes.string,
        info: PropTypes.shape({
            name: PropTypes.string,
            role: PropTypes.string,
        }),
    }),

    userActions: PropTypes.shape({
        onLoginOrRegisterFetch: PropTypes.func,
        login: PropTypes.func,
        register: PropTypes.func, 
        onLogout: PropTypes.func,
    }),
};
UserBar.defaultProps = {
    user: {
        isLoginOrRegisterFetching: false,
        isAuth: false,
        error: "",
        info: {
            name: "",
            role: "",
        },
    },

    userActions: {
        onLoginOrRegisterFetch: () => {},
        login: () => {},
        register: () => {}, 
        onLogout: () => {},
    },
};

export default UserBar;