import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginAndRegisterForm from "./Forms/login-register";
import { PROFILE } from "./path";
import PageNotFound from "../PageNotFound";

const LoginAndRegisterFormWrapper = ({ user, userActions, ...rest }) => (
    <Route {...rest} render={props => <LoginAndRegisterForm {...props} user={user} userActions={userActions} />} />
);

const UserContent = ({ user, userActions }) => {
    return (
        <div>
            <Switch>
                <LoginAndRegisterFormWrapper path={PROFILE} user={user} userActions={userActions} />
                <Route component={PageNotFound} />
            </Switch>
        </div>
    );
};

export default UserContent;