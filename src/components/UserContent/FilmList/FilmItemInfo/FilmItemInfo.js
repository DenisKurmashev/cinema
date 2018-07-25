import React from "react";

const FilmItemInfo = ({ city, name, date }) => {
    const subDate = Date.parse(date) - Date.now();
    const _date = parseInt(subDate / 1000 / 3600 / 24);

    return (
        <div className="film-container-item__info">
            <div>{city}</div>
            <div>{name}</div>
            <div>In {_date} day{_date !== 0 ? "s" : ""}</div>
        </div>
    );
};

export default FilmItemInfo;