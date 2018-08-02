import React from "react";

import FilmCartHeader from "./FilmCartHeader/FilmCartHeader";
import FilmCartContent from "./FilmCartContent/FilmCartContent";

import "./FilmCart.css";

class FilmCart extends React.Component {

    componentDidMount() {
        const { filmsActions, match } = this.props;
        filmsActions.onFilmLoad(match.params.seanceId);
    }

    render() {
        const { films, match } = this.props;
        const seanceId = match.params.seanceId;

        const currentSeance =  films.openedSeance;

        if (!currentSeance._id) 
            return null;

        return (
            <div className="seance" >
                <FilmCartHeader currentSeance={currentSeance} />
                <FilmCartContent currentSeance={currentSeance} />
            </div>
        );
    }

}

export default FilmCart;