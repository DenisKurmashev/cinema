import React from "react";

import RoomSchema from "./RoomSchema/RoomSchema";
import SeatsInfo from "./SeatsInfo/SeatsInfo";

import "./FilmCartContent.css";

const FilmCartContent = ({ userIsAuth, currentSeance }) => {
  return (
    <div className="seance-content">
      <RoomSchema currentSeance={currentSeance} />
      <SeatsInfo
        userIsAuth={userIsAuth}
        types={currentSeance.typesOfRoomSeats}
      />
    </div>
  );
};

export default FilmCartContent;
