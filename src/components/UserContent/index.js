import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginAndRegisterForm from "./Forms/login-register";
import { PROFILE, ROOT } from "./path";
import PageNotFound from "../PageNotFound";

import Header from "./Header";
import FilmList from "./FilmList";

const InnerUserContent = ({ ...rest }) => (
    <div>
        <Header {...rest} />
        <FilmList {...rest} />    
    </div>
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
        <div>
            <Switch>
                <LoginAndRegisterFormWrapper path={PROFILE} user={user} userActions={userActions} />
                <InnerUserContentWrapper exact path={ROOT} user={user} userActions={userActions} />
                <Route component={PageNotFound} />
            </Switch>
        </div>
    );
};

export default UserContent;