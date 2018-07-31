import React from "react";

const FilmCart = ({ user, userActions, films, filmsActions, match }) => {
    return (
        <div>
            {match.params.seanceId}
        </div>
    );
};

export default FilmCart;