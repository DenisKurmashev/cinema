import React from "react";

import FilmCartHeader from "./FilmCartHeader/FilmCartHeader";
import FilmCartContent from "./FilmCartContent/FilmCartContent";
import FilmLoading from "../FilmList/FilmLoading/FilmLoading";

import "./FilmCart.css";

class FilmCart extends React.Component {

    componentDidMount() {
        const { filmsActions, match } = this.props;
        filmsActions.onFilmLoad(match.params.seanceId);
    }

    render() {
        const { user, films } = this.props;

        const currentSeance =  films.openedSeance;

        if (!currentSeance._id) 
            return (
                <div className="seance-loading">
                    <FilmLoading />
                </div>
            );

        return (
            <div className="seance" >
                <FilmCartHeader currentSeance={currentSeance} />
                <FilmCartContent currentSeance={currentSeance} userIsAuth={user.isAuth} />
            </div>
        );
    }

}

export default FilmCart;