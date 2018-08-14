import React, { PureComponent, Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { ADMIN } from "../UserContent/path";
import PageNotFound from "../PageNotFound";

import * as FilmActions from "./actions/films";

import Header from "./components/Header/Header";
import NewFilm from "./components/NewFilm/NewFilm";

import { HEADER_ITEMS } from "./constants/constants";

import "./index.css";

class AdminContent extends PureComponent {
    
    render() {
        const { films, filmsActions } = this.props;

        return (
            <Fragment>
                <Header items={HEADER_ITEMS} />

                <div className="admin-content">
                    <Switch>
                        <Route path={`${ADMIN}/`} render={() => <NewFilm films={films} filmsActions={filmsActions} />} />
                        <Route component={PageNotFound} />
                    </Switch>
                </div>
            </Fragment>
        );
    }

};

const mapStateToProps = state => {
    return {
        films: state.admin.films,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        filmsActions: bindActionCreators(FilmActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminContent);