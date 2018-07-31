import React from "react";

import FilmCartHeader from "./FilmCartHeader/FilmCartHeader";

import "./FilmCart.css";

class FilmCart extends React.Component {

    componentDidMount() {
        const { filmsActions, match } = this.props;
        filmsActions.onFilmLoad(match.params.seanceId);
    }

    render() {
        const { films, match } = this.props;
        const seanceId = match.params.seanceId;

        const currentSeance 
            =  films.currentFilms.find(item => item._id === seanceId) 
            || films.openedSeance;

        if (!currentSeance._id) 
            return null;

        return (
            <div className="seance" >
                <FilmCartHeader currentSeance={currentSeance} />
                <div className="seance-content"></div>
            </div>
        );
    }

}

export default FilmCart;