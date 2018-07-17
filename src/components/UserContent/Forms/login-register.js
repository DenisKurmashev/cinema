import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { LOGIN, REGISTER } from "../path";
import PageNotFound from "../../PageNotFound";

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
            <LoginFormWrapper exact path={LOGIN} user={user} userActions={userActions} />
            <RegisterFormWrapper exact path={REGISTER} user={user} userActions={userActions} />
            <Route component={PageNotFound} />
        </Switch>
    </div>
);

export default LoginAndRegisterForm;