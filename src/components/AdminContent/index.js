import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { ADMIN } from "../UserContent/path";

import * as FilmActions from "../../actions/films";

import Header from "./Header/Header";
import NewFilm from "./NewFilm/NewFilm";

class AdminContent extends PureComponent {

    HEADER_ITEMS = [
        {
            title: "add films",
            path: ADMIN + "/new-film",
            component: NewFilm, 
            props: {
                filmsActions: this.props.filmsActions
            }
        }
    ]
    
    render() {
        return (
            <div>
                <Header item={this.HEADER_ITEMS} />
            </div>
        );
    }

};

const mapStateToProps = state => {
    return {
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        filmsActions: bindActionCreators(FilmActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminContent);