import React from "react";

import RoomSchema from "./RoomSchema/RoomSchema";
import SeatsInfo from "./SeatsInfo/SeatsInfo";

import "./FilmCartContent.css";

const FilmCartContent = ({ userIsAuth, currentSeance }) => {
    return (
        <div className="seance-content">
            <RoomSchema currentSeance={currentSeance} />
            {/* The problem here: every component which should behave differently based on auth user get auth props, which for this project is OK, but foe the real one, some better approaches comes in play, e.g.: React Context, HOC's, Redux,
            React this article to learn some best approaches for this case: https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/ */}
            <SeatsInfo userIsAuth={userIsAuth} types={currentSeance.typesOfRoomSeats} />
        </div>
    );
};

export default FilmCartContent;