import React from "react";

const FilmItemInfo = ({ city, name, date }) => {
    const subDate = Date.parse(date) - Date.now();
    const _date = parseInt(subDate / 1000 / 3600 / 24, 10);

    // if day equal 0, e.g. session will be today
    // get hours till session
    let hours = 0;
    if (_date === 0) {
        let minutesTillSession = (new Date(Date.parse(date) - Date.now())).getMinutes();

        if (minutesTillSession > 59) 
            hours = parseInt(
                (new Date(date)).getHours() 
                - (new Date()).getHours()
                + parseInt((new Date(date)).getTimezoneOffset() / 60, 10)
                , 10
            );

    }

    // if hours equal 0, e.g. session will be less than 1 hour
    // get minutes till session
    let minutes = 0;
    if (_date === 0 && hours === 0) 
        minutes = (new Date(Date.parse(date) - Date.now())).getMinutes();

    return (
        <div className="film-container-item__info">
            <div>{city}</div>
            <div>{name}</div>
            <div>
                {
                    _date !== 0 
                    ? `In ${_date} day${_date > 1 ? "s" : ""}`  
                    : hours !== 0 
                        ? `In ${hours} hour${hours > 1 ? "s" : ""}` 
                        : `In ${minutes} minute${minutes > 1 ? "s" : ""}`
                }
            </div>
        </div>
    );
};

export default FilmItemInfo;