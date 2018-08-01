import React from "react";

import RoomSchema from "./RoomSchema/RoomSchema";

import "./FilmCartContent.css";

const FilmCartContent = ({ currentSeance }) => {
    return (
        <div className="seance-content">
            <RoomSchema currentSeance={currentSeance} />
        </div>
    );
};

export default FilmCartContent;