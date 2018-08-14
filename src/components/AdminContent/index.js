import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { ADMIN } from "../UserContent/path";
import PageNotFound from "../PageNotFound";

import * as FilmActions from "./actions/films";

import Header from "./components/Header/Header";
import NewFilm from "./components/NewFilm/NewFilm";

class AdminContent extends PureComponent {

    HEADER_ITEMS = [
        {
            title: "add films",
            path: ADMIN + "/",
            component: NewFilm, 
            props: {
                filmsActions: this.props.filmsActions
            }
        }
    ]
    
    render() {console.log(this.props)
        return (
            <div>
                <Header items={this.HEADER_ITEMS} />

                <Switch>
                    {
                        this.HEADER_ITEMS.map((el, index) => (
                            <Route key={index} path={el.path} render={(props) => <el.component {...el.props} />} />
                        ))
                    }
                    <Route component={PageNotFound} />
                </Switch>
            </div>
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