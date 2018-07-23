import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

import LoginAndRegisterForm from "./Forms/login-register";
import { PROFILE, ROOT } from "./path";
import PageNotFound from "../PageNotFound";
import Header from "./Header";
import FilmList from "./FilmList";

const InnerUserContent = ({ ...rest }) => (
    <Fragment>
        <Header {...rest} />
        <FilmList {...rest} />    
    </Fragment>
);

// wrappers
const LoginAndRegisterFormWrapper = ({ user, userActions, ...rest }) => (
    <Route {...rest} render={props => <LoginAndRegisterForm {...props} user={user} userActions={userActions} />} />
);
const InnerUserContentWrapper = ({ user, userActions, ...rest }) => (
    <Route {...rest} render={props => <InnerUserContent {...props} user={user} userActions={userActions} />} />
);

const UserContent = ({ user, userActions }) => {
    return (
        <Fragment>
            <Switch>
                <LoginAndRegisterFormWrapper path={PROFILE} user={user} userActions={userActions} />
                <InnerUserContentWrapper exact path={ROOT} user={user} userActions={userActions} />
                <Route component={PageNotFound} />
            </Switch>
        </Fragment>
    );
};

UserContent.propTypes = {
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
UserContent.defaultProps = {
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


export default UserContent;