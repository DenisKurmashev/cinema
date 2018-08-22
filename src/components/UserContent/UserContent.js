import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

import LoginAndRegisterForm from "./Forms/login-register";
import { PROFILE, HISTORY, ROOT, SEANCE, ADMIN } from "./path";
import PageNotFound from "../PageNotFound/PageNotFound";
import UserContentHeader from "./Header/UserContentHeader";
import FilmList from "./FilmList/FilmList";
import FilmCart from "./FilmCart/FilmCart";
import HistoryPage from "./HistoryPage/HistoryPage";
import AdminPage from "../AdminContent"; 
import GlobalHeader from "../Header/Header";

const InnerUserContent = ({ ...rest }) => (
    <Fragment>
        <UserContentHeader {...rest} />
        <FilmList {...rest} />    
    </Fragment>
);

// wrappers
const LoginAndRegisterFormWrapper = ({ user, userActions, films, filmsActions, ...rest }) => (
    <Route {...rest} render={props => <LoginAndRegisterForm 
        {...props} 
        user={user} 
        userActions={userActions} 
        films={films}
		filmsActions={filmsActions}
    />} />
);
const InnerUserContentWrapper = ({ user, userActions, films, filmsActions, ...rest }) => (
    <Route {...rest} render={props => <InnerUserContent 
        {...props} 
        user={user} 
        userActions={userActions}
        films={films}
		filmsActions={filmsActions}    
    />} />
);

const SeanceWrapper = ({ user, userActions, films, filmsActions, ...rest }) => (
    <Route {...rest} render={props => <FilmCart 
        {...props} 
        user={user} 
        userActions={userActions}
        films={films}
		filmsActions={filmsActions}    
    />} />
);

const HistoryPageWrapper = ({ user, userActions, films, filmsActions, ...rest }) => (
    <Route {...rest} render={props => <HistoryPage 
        {...props}
        user={user} 
        userActions={userActions}
        films={films}
		filmsActions={filmsActions}   
    />} />
);

const AdminPageWrapper = (rest) => (
    <Route {...rest} render={props => <AdminPage {...props} />} />
);

const UserContent = ({ user, userActions, films, filmsActions }) => {
    return (
        <Fragment>
            <GlobalHeader user={user} onLogout={userActions.onLogout} />
            <Switch>
                {
                    user.isAuth
                    ? <HistoryPageWrapper path={HISTORY} />
                    : null
                }
                <LoginAndRegisterFormWrapper path={PROFILE} user={user} userActions={userActions} />
                <InnerUserContentWrapper exact 
                    path={ROOT} 
                    user={user} 
                    userActions={userActions}
                    films={films}
					filmsActions={filmsActions}
                />
                <SeanceWrapper path={SEANCE}
                    user={user} 
                    userActions={userActions}
                    films={films}
					filmsActions={filmsActions}
                />

                {
                    user.isAuth && user.info.role === "admin" 
                    ? <AdminPageWrapper path={ADMIN} />
                    : null
                }
                
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
    films: PropTypes.shape({
        filter: PropTypes.string,
        pageId: PropTypes.number,
        error: PropTypes.any,
        isFetching: PropTypes.bool,
        currentFilms: PropTypes.array,
        allFilms: PropTypes.array,
    }),

    userActions: PropTypes.shape({
        onLoginOrRegisterFetch: PropTypes.func,
        login: PropTypes.func,
        register: PropTypes.func, 
        onLogout: PropTypes.func,
    }),
    filmsActions: PropTypes.shape({
        onFilmsFilterChange: PropTypes.func,
        onFilmsPageChange: PropTypes.func,
        onFilmsFetching: PropTypes.func,
        onFilmsFailed: PropTypes.func,
        onFilmsSuccess: PropTypes.func,
        onFilmsLoad: PropTypes.func,
        onFilmsChange: PropTypes.func,
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
    films: {
        filter: "city",
        pageId: 0,
        error: "",
        isFetching: false,
        currentFilms: [],
        allFilms: [],
    },

    userActions: {
        onLoginOrRegisterFetch: () => {},
        login: () => {},
        register: () => {}, 
        onLogout: () => {},
    },
    filmsActions: {
        onFilmsFilterChange: () => {},
        onFilmsPageChange: () => {},
        onFilmsFetching: () => {},
        onFilmsFailed: () => {},
        onFilmsSuccess: () => {},
        onFilmsLoad: () => {},
        onFilmsChange: () => {},
    },
};


export default UserContent;