import React, { PureComponent, Fragment } from "react";
import ReactPaginate from "react-paginate";

import FilmLoading from "../../../../UserContent/FilmList/FilmLoading";

import "./CinemasList.css";

class CinemasList extends PureComponent {

    state = {
        isListVisible: true,
    }

    componentDidMount() {
        this.props.cinemaActions.loadCinema();
    }

    componentWillUnmount() {
        this.props.cinemaActions.onSelectedCinemaChange(null);
    }

    componentDidUpdate() {
        const { selectedCinema } = this.props.cinema;
        if (!selectedCinema) {
            this.setState({ isListVisible: true });
        }
    }

    handlePageChange = (data) => {
        const pageId = data.selected;
        const { onPageIdChange, loadCinema } = this.props.cinemaActions;

        onPageIdChange(pageId);
        loadCinema();
    }

    handleCinemaItemClick = (event) => {
        const attrName = "data-index";
        const target = event.target;

        if (!target.hasAttribute(attrName) && !target.parentNode.hasAttribute(attrName)) 
            return;

        const selectedId     
            = target.getAttribute(attrName) || target.parentNode.getAttribute(attrName);

        const { cinema, cinemaActions } = this.props;
        
        // little optimize, for disable rerender if item already selected
        if (cinema.selectedCinema)
            if (selectedId ===cinema.selectedCinema._id)
                return;

        cinemaActions.onSelectedCinemaChange(selectedId);
        this.setState({ isListVisible: false });
    }

    getSelectedCinema = () => {
        const { selectedCinema } = this.props.cinema;

        if (!selectedCinema)
            return null;

        return (
            <div onClick={() => this.setState({ isListVisible: !this.state.isListVisible })} className="cinema-content-selected-item">
                <div>{selectedCinema.name}</div>
                <div>{selectedCinema.city}</div>
            </div>
        );
    }

    render() {
        const { cinema } = this.props;

        return (
            <div className="cinema-content">
                { this.getSelectedCinema() }
                
                {
                    !this.state.isListVisible
                    ? null
                    : cinema.isFetching
                        ? <FilmLoading />
                        : (
                            <Fragment>
                                <div className="cinema-content-list" onClick={this.handleCinemaItemClick} >
                                    {
                                        cinema.loadedCinemas.map((el, index) => (
                                            <div data-index={el._id} key={index} className={"list-item" + (index % 2 === 0 ? " gray" : "")}>
                                                <div>{el.name}</div>
                                                <div>{el.city}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                                
                                {
                                    cinema.pageCount <= 1
                                    ? null
                                    : (
                                        <ReactPaginate previousLabel="previous"
                                            forcePage={cinema.pageId}
                                            nextLabel="next"
                                            breakLabel="..."
                                            breakClassName="break-me"
                                            pageCount={cinema.pageCount}
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

export default CinemasList;
