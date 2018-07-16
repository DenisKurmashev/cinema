import React from "react";
import { Route } from "react-router-dom";
import AuthForm from "./LoginForm";
import RegForm from "./RegisterForm";

import "./index.css";

// wrappers 
const AuthFormWrapper = ({ ...rest }) => (
    <Route {...rest} render={props => <AuthForm {...props} />} />
);
const RegFormWrapper = ({ ...rest }) => (
    <Route {...rest} render={props => <RegForm {...props} />} />
);

const LoginAndRegisterForm = ({ user, userActions }) => (
    <div>
        <AuthFormWrapper path="/login" user={user} userActions={userActions} />
        <RegFormWrapper path="/register" user={user} userActions={userActions} />
    </div>
);

export default LoginAndRegisterForm;