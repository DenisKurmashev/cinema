import React from "react";
import PropTypes from "prop-types";
import "./UserContentHeader.css";

import SearchBar from "./SearchBar/SearchBar";

const UserContentHeader = ({ films, filmsActions }) => (
    <header>
        <div className="header-mask">
            <SearchBar films={films} filmsActions={filmsActions} />
        </div>
    </header>
);

UserContentHeader.propTypes = {
    films: PropTypes.shape({
		isFetching: PropTypes.bool,
		error: PropTypes.string,
		response: PropTypes.string,
		pageSize: PropTypes.number, 
		pageId: PropTypes.number,
		pageCount: PropTypes.number,
		loadedFilms: PropTypes.array,
		loadFilmsError: PropTypes.string,
		selectedFilm: PropTypes.shape({
			_id: PropTypes.string,
			name: PropTypes.string,
		}),
    }),
    filmsActions: PropTypes.shape({
		onFilmsFilterChange: PropTypes.func,
		onFilmsPageChange: PropTypes.func,
		onFilmsFetching: PropTypes.func,
		onFilmsFailed: PropTypes.func,
		onFilmsSuccess: PropTypes.func,
		onFilmsLoad: PropTypes.func,
		onFilmsChange: PropTypes.func,
	}),
};
UserContentHeader.defaultProps = {
    films: {
		filter: "city",
		pageId: 0,
		error: "",
		isFetching: false,
		currentFilms: [],
		allFilms: [],
    },
    filmsActions: {
		onFilmsFilterChange: () => {},
		onFilmsPageChange: () => {},
		onFilmsFetching: () => {},
		onFilmsFailed: () => {},
		onFilmsSuccess: () => {},
		onFilmsLoad: () => {},
		onFilmsChange: () => {},
	},
};


export default UserContentHeader;