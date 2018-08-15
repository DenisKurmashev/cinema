import React, { PureComponent } from "react";
import ReactPaginate from "react-paginate";

import "./CinemasList.css";

class CinemasList extends PureComponent {

    render() {
        const { cinema, cinemaActions } = this.props;

        return (
            <div className="cinema-content">
                <div className="cinema-content-selected-item"></div>
                <div className="cinema-content-list">
                    {
                        cinema.loadedCinemas.map((el, index) => (
                            <div data-index={index} key={index} className={"list-item" + (index % 2 === 0 ? " gray" : "")}>
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
