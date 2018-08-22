import React from "react";
import PropTypes from "prop-types";

import FilmItem from "./FilmItem/FilmItem";
import "./index.css";
import FilmLoading from "./FilmLoading";
import Pagination from "./Pagination/Pagination";

class FilmList extends React.Component {

    static propTypes = {
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
    }
    
    static defaultProps = {
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
    }

    componentDidMount() {
        const { searchText } = this.props.films;
        const { onFilmsLoad, onFilmsChange } = this.props.filmsActions;

        if (!searchText) onFilmsLoad(1)
        else onFilmsChange();
    }

    shouldComponentUpdate(nextProps) {
        const { filter, searchText, pageId } = this.props.films;

        if (
            filter !== nextProps.films.filter && 
            searchText === nextProps.films.searchText && 
            pageId === nextProps.films.pageId
        ) return false;

        return true;
    }

    render() {
        const { films, filmsActions } = this.props;

        return (
            <div className="film-container">
       
                {
                    films.isFetching
                    ? <FilmLoading /> 
                    : films.currentFilms.length === 0 
                        ? <h2>Not found!</h2> 
                        : films.currentFilms.map(item => <FilmItem key={item._id} film={item} />)
                }

                {
                    films.pageCount > 1 
                    ? ( 
                        <div className="width-100">
                            <Pagination films={films} filmsActions={filmsActions} />
                        </div>
                    )
                    : ""
                }

            </div>
        );
    }
}

export default FilmList;