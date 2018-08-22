import React from "react";
import PropTypes from "prop-types";
import "./index.css";
import "../../../styles/button.css";

import SearchBar from "./SearchBar";

const Header = ({ user, userActions, films, filmsActions }) => (
    <header>
        <div className="header-mask">
            <SearchBar films={films} filmsActions={filmsActions} />
        </div>
    </header>
);

Header.propTypes = {
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
Header.defaultProps = {
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


export default Header;