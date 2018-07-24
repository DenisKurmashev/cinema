import React from "react";
import PropTypes from "prop-types";
import "./index.css";
import "../../../styles/button.css";

import SearchBar from "./SearchBar";
import UserBar from "./UserBar";

const Header = ({ user, userActions, films, filmsActions }) => (
    <header>
        <div className="header-mask">
            <UserBar user={user} userActions={userActions} />
            <SearchBar 
                 films={films} filmsActions={filmsActions} />
        </div>
    </header>
);

Header.propTypes = {
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
Header.defaultProps = {
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


export default Header;