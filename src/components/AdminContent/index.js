import React, { PureComponent, Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { ADMIN } from "../UserContent/path";
import PageNotFound from "../PageNotFound";

import * as FilmActions       from "./actions/films";
import * as AdditionalActions from "./actions/additional";
import * as SeanceActions     from "./actions/seance";
import * as CinemaActions     from "./actions/cinema";

import Header        from "./components/Header/Header";
import NewFilm       from "./components/NewFilm/NewFilm";
import NewAdditional from "./components/NewAdditional/NewAdditional";
import NewSeance     from "./components/NewSeance/NewSeance";

import { HEADER_ITEMS } from "./constants/constants";

import "./index.css";

class AdminContent extends PureComponent {
    
    render() {
        const { films, filmsActions, additional, additionalActions, seance, seanceActions, cinema, cinemaActions } 
            = this.props;

        return (
            <Fragment>
                <Header items={HEADER_ITEMS} />

                <div className="admin-content">
                    <Switch>
                        <Route exact path={ADMIN} render={() => <NewFilm films={films} filmsActions={filmsActions} />} />
                        <Route exact path={ADMIN + "/additional"} render={() => <NewAdditional additional={additional} additionalActions={additionalActions} />} />

                        <Route exact path={ADMIN + "/seance"} render={() => 
                            <NewSeance films={films}    filmsActions={filmsActions}
                                additional={additional} additionalActions={additionalActions}
                                seance={seance}         seanceActions={seanceActions} 
                                cinema={cinema}         cinemaActions={cinemaActions}
                            />
                        } />

                        <Route component={PageNotFound} />
                    </Switch>
                </div>
            </Fragment>
        );
    }

};

const mapStateToProps = state => {
    return {
        films:      state.admin.films,
        additional: state.admin.additional,
        seance:     state.admin.seance,
        cinema:     state.admin.cinema,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        filmsActions:      bindActionCreators(FilmActions, dispatch),
        additionalActions: bindActionCreators(AdditionalActions, dispatch),
        seanceActions:     bindActionCreators(SeanceActions, dispatch),
        cinemaActions:     bindActionCreators(CinemaActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminContent);