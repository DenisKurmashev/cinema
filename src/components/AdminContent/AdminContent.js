import React, { PureComponent, Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";

import { ADMIN } from "../UserContent/path";
import PageNotFound from "../PageNotFound/PageNotFound";

import * as FilmActions from "./actions/films";
import * as AdditionalActions from "./actions/additional";
import * as SeanceActions from "./actions/seance";
import * as CinemaActions from "./actions/cinema";

import Header from "./components/Header/Header";
import NewFilm from "./components/NewFilm/NewFilm";
import NewAdditional from "./components/NewAdditional/NewAdditional";
import NewSeance from "./components/NewSeance/NewSeance";
import NewCinema from "./components/NewCinema/NewCinema";

import { HEADER_ITEMS } from "./constants/constants";

import "./AdminContent.css";

class AdminContent extends PureComponent {
  static propTypes = {
    films: PropTypes.shape({
      isFetching: PropTypes.bool,
      error: PropTypes.string,
      response: PropTypes.string,
      pageSize: PropTypes.number,
      pageId: PropTypes.number,
      pageCount: PropTypes.number,
      loadedFilms: PropTypes.array,
      loadFilmsError: PropTypes.string,
      selectedFilm: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string
      })
    })
  };
  static defaultProps = {
    films: {
      isFetching: false,
      error: null,
      response: null,
      pageSize: 10,
      pageId: 0,
      pageCount: 0,
      loadedFilms: [],
      loadFilmsError: null,
      selectedFilm: null
    }
  };

  render() {
    const {
      films,
      filmsActions,
      additional,
      additionalActions,
      seance,
      seanceActions,
      cinema,
      cinemaActions
    } = this.props;

    return (
      <Fragment>
        <Header items={HEADER_ITEMS} />

        <div className="admin-content">
          <Switch>
            <Route
              exact
              path={ADMIN}
              render={() => (
                <NewFilm films={films} filmsActions={filmsActions} />
              )}
            />
            <Route
              exact
              path={ADMIN + "/additional"}
              render={() => (
                <NewAdditional
                  additional={additional}
                  additionalActions={additionalActions}
                />
              )}
            />

            <Route
              exact
              path={ADMIN + "/seance"}
              render={() => (
                <NewSeance
                  films={films}
                  filmsActions={filmsActions}
                  additional={additional}
                  additionalActions={additionalActions}
                  seance={seance}
                  seanceActions={seanceActions}
                  cinema={cinema}
                  cinemaActions={cinemaActions}
                />
              )}
            />

            <Route
              exact
              path={ADMIN + "/cinema"}
              render={() => (
                <NewCinema cinema={cinema} cinemaActions={cinemaActions} />
              )}
            />

            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  if (!state.admin) {
    window.location.reload();
  }

  return {
    films: state.admin.films,
    additional: state.admin.additional,
    seance: state.admin.seance,
    cinema: state.admin.cinema
  };
};

const mapDispatchToProps = dispatch => {
  return {
    filmsActions: bindActionCreators(FilmActions, dispatch),
    additionalActions: bindActionCreators(AdditionalActions, dispatch),
    seanceActions: bindActionCreators(SeanceActions, dispatch),
    cinemaActions: bindActionCreators(CinemaActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminContent);
