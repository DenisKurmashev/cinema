import React from "react";

import RoomSchema from "./RoomSchema/RoomSchema";
import SeatsInfo from "./SeatsInfo/SeatsInfo";

import "./FilmCartContent.css";

const FilmCartContent = ({ currentSeance }) => {
    return (
        <div className="seance-content">
            <RoomSchema currentSeance={currentSeance} />
            <SeatsInfo types={currentSeance.typesOfRoomSeats} />
        </div>
    );
};

export default FilmCartContent;