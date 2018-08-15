import React, { PureComponent, Fragment } from "react";
import ReactPaginate from "react-paginate";

import "./CinemasList.css";

class CinemasList extends PureComponent {

    state = {
        isListVisible: true,
    }

    componentDidMount() {
        this.props.cinemaActions.loadCinema();
    }

    handleCinemaItemClick = (event) => {
        const attrName = "data-index";
        const target = event.target;

        if (!target.hasAttribute(attrName) && !target.parentNode.hasAttribute(attrName)) 
            return;

        const selectedId     
            = target.getAttribute(attrName) || target.parentNode.getAttribute(attrName);

        this.props.cinemaActions.onSelectedCinemaChange(selectedId);
    }

    getSelectedCinema = () => {
        const { selectedCinema, loadedCinemas } = this.props.cinema;

        if (!selectedCinema)
            return null;

        const selectedItem = loadedCinemas.find(el => el._id === selectedCinema);

        if (!selectedItem)
            return null;

        return (
            <div className="cinema-content-selected-item">
                <div>{selectedItem.name}</div>
                <div>{selectedItem.city}</div>
            </div>
        );
    }

    render() {
        const { cinema, cinemaActions } = this.props;

        return (
            <div className="cinema-content">
                { this.getSelectedCinema() }
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
            </div>
        );
    }

}

export default CinemasList;
