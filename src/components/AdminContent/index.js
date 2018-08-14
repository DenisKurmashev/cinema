import React, { PureComponent, Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { ADMIN } from "../UserContent/path";
import PageNotFound from "../PageNotFound";

import * as FilmActions from "./actions/films";
import * as AdditionalActions from "./actions/additional";

import Header from "./components/Header/Header";
import NewFilm from "./components/NewFilm/NewFilm";
import NewAdditional from "./components/NewAdditional/NewAdditional";

import { HEADER_ITEMS } from "./constants/constants";

import "./index.css";

class AdminContent extends PureComponent {
    
    render() {
        const { films, filmsActions, additional, additionalActions } = this.props;

        return (
            <Fragment>
                <Header items={HEADER_ITEMS} />

                <div className="admin-content">
                    <Switch>
                        <Route exact path={ADMIN} render={() => <NewFilm films={films} filmsActions={filmsActions} />} />
                        <Route exact path={ADMIN + "/additional"} render={() => <NewAdditional additional={additional} additionalActions={additionalActions} />} />
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
        additional: state.admin.additional,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        filmsActions: bindActionCreators(FilmActions, dispatch),
        additionalActions: bindActionCreators(AdditionalActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminContent);