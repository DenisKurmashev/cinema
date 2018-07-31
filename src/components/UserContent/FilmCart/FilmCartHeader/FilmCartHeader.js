import React from "react";
import "./FilmCartHeader.css";

const FilmCartHeader = ({ currentSeance }) => {console.log(currentSeance);
    return (
        <div className="seance-header">
            <div className="seance-header__cover">
                <img src={currentSeance.film.cover} alt={currentSeance.film.name}/>
            </div>
            <div className="seance-header__content">
                <div className="seance-header__content-header"></div>
                <div className="seance-header__content-info"></div>
            </div>
        </div>
    );
};

export default FilmCartHeader;