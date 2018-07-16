import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import "./index.css";

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
            <LoginFormWrapper exact path="/login" user={user} userActions={userActions} />
            <RegisterFormWrapper exact path="/register" user={user} userActions={userActions} />
        </Switch>
    </div>
);

export default withRouter(LoginAndRegisterForm);