import React from "react";
import "./FilmCartHeader.css";

const FilmCartHeader = ({ currentSeance }) => {
    return (
        <div className="seance-header">
            <div className="seance-header__cover">
                <img src={currentSeance.film.cover} alt={currentSeance.film.name}/>
            </div>
            <div className="seance-header__content">
                <div className="seance-header__content-header">{currentSeance.film.name}</div>
                <div className="seance-header__content-info">
                    <div>{currentSeance.cinema.city}</div>
                    <div>{currentSeance.cinema.name}</div>
                    <div>{(new Date(currentSeance.date)).toLocaleString()}</div>
                    <div>Selected places: {currentSeance.selectedPlaces.length}</div>
                </div>
            </div>
        </div>
    );
};

export default FilmCartHeader;