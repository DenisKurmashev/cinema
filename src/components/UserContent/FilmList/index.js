import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FilmItemInfo from "./FilmItemInfo/FilmItemInfo";
import "./index.css";
import FilmLoading from "./FilmLoading";

const FilmList = ({ user, userActions, films, filmsActions }) => {
    return (
        <div className="film-container width-60">
   
        {
            films.isFetching
            ? <FilmLoading /> 
            : films.currentFilms.length === 0 
                ? <h2>Not found!</h2> 
                : films.currentFilms.map(item => (
                    <div key={item._id} className="film-container-item">
                        <div className="film-container-item__title">{item.film.name}</div>
                        <div className="film-container-item__cover">
                            <img className="width-100" src={item.film.cover} alt={item.film.name}/>
                        </div>
                        <FilmItemInfo city={item.cinema.city} name={item.cinema.name} date={item.date} />
                        <Link className="btn text-upper" to={`/session/${item._id}`}>Buy ticket</Link>
                    </div>
                ))
        }
            
        </div>
    )
};

FilmList.propTypes = {
    user: PropTypes.shape({
        isLoginOrRegisterFetching: PropTypes.bool,
        isAuth: PropTypes.bool,
        error: PropTypes.string,
        info: PropTypes.shape({
            name: PropTypes.string,
            role: PropTypes.string,
        }),
    }),
    films: PropTypes.shape({
        filter: PropTypes.string,
        pageId: PropTypes.number,
        error: PropTypes.any,
        isFetching: PropTypes.bool,
        currentFilms: PropTypes.array,
        allFilms: PropTypes.array,
    }),

    userActions: PropTypes.shape({
        onLoginOrRegisterFetch: PropTypes.func,
        login: PropTypes.func,
        register: PropTypes.func, 
        onLogout: PropTypes.func,
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
FilmList.defaultProps = {
    user: {
        isLoginOrRegisterFetching: false,
        isAuth: false,
        error: "",
        info: {
            name: "",
            role: "",
        },
    },
    films: {
        filter: "city",
        pageId: 0,
        error: "",
        isFetching: false,
        currentFilms: [],
        allFilms: [],
    },

    userActions: {
        onLoginOrRegisterFetch: () => {},
        login: () => {},
        register: () => {}, 
        onLogout: () => {},
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


export default FilmList;