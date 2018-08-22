import React from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";

import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import { LOGIN, REGISTER } from "../path";
import PageNotFound from "../../PageNotFound/PageNotFound";

import "./login-register.css";

// wrappers 
const LoginFormWrapper = ({ user, userActions, ...rest }) => (
    <Route {...rest} render={props => <LoginForm user={user} userActions={userActions} {...props} />} />
);
const RegisterFormWrapper = ({ user, userActions, ...rest }) => (
    <Route {...rest} render={props => <RegisterForm user={user} userActions={userActions} {...props} />} />
);

const LoginAndRegisterForm = ({ user, userActions }) => (
    <div className="login-register-container">
        <Switch>
            <LoginFormWrapper exact path={LOGIN} user={user} userActions={userActions} />
            <RegisterFormWrapper exact path={REGISTER} user={user} userActions={userActions} />
            <Route component={PageNotFound} />
        </Switch>
    </div>
);

LoginAndRegisterForm.propTypes = {
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
LoginAndRegisterForm.defaultProps = {
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

export default LoginAndRegisterForm;