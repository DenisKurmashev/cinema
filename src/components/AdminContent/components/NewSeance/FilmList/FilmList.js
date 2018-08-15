import React, { PureComponent, Fragment } from "react";
import ReactPaginate from "react-paginate";

import FilmLoading from "../../../../UserContent/FilmList/FilmLoading";

import "./FilmList.css";

class FilmList extends PureComponent {

    state = {
        isListVisible: true,
    }

    componentDidMount() {
        this.props.filmsActions.loadFilms();
    }

    handlePageChange = (data) => {
        const pageId = data.selected;
        const { onPageIdChange, loadFilms } = this.props.filmsActions;

        onPageIdChange(pageId);
        loadFilms();
    }

    handleFilmsItemClick = (event) => {
        const attrName = "data-index";
        const target = event.target;

        if (!target.hasAttribute(attrName) && !target.parentNode.hasAttribute(attrName)) 
            return;

        const selectedId     
            = target.getAttribute(attrName) || target.parentNode.getAttribute(attrName);

        const { films, filmsActions } = this.props;

        // little optimize, for disable rerender if item already selected
        if (films.selectedFilm)
            if (selectedId === films.selectedFilm._id)
                return;

        filmsActions.onSelectedFilmChange(selectedId);
        this.setState({ isListVisible: false });
    }

    getSelectedFilms = () => {
        const { selectedFilm } = this.props.films;

        if (!selectedFilm)
            return null;

        return (
            <div onClick={() => this.setState({ isListVisible: !this.state.isListVisible })} className="cinema-content-selected-item">
                <div>{selectedFilm.name}</div>
            </div>
        );
    }

    render() {
        const { films } = this.props;

        return (
            <div className="cinema-content">
                { this.getSelectedFilms() }
                
                {
                    !this.state.isListVisible
                    ? null
                    : films.isFetching
                        ? <FilmLoading />
                        : (
                            <Fragment>
                                <div className="cinema-content-list" onClick={this.handleFilmsItemClick} >
                                    {
                                        films.loadedFilms.map((el, index) => (
                                            <div data-index={el._id} key={index} className={"list-item" + (index % 2 === 0 ? " gray" : "")}>
                                                <div>{el.name}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                                
                                {
                                    films.pageCount <= 1
                                    ? null
                                    : (
                                        <ReactPaginate previousLabel="previous"
                                            forcePage={films.pageId}
                                            nextLabel="next"
                                            breakLabel="..."
                                            breakClassName="break-me"
                                            pageCount={films.pageCount}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={this.handlePageChange}
                                            containerClassName="pagination"
                                            subContainerClassName="pages pagination"
                                            activeClassName="active"
                                        />
                                    )
                                }
                            </Fragment>
                        )
                }
            </div>
        );
    }

}

export default FilmList;
