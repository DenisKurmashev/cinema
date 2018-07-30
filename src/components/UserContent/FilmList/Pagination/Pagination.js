import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css"

class Pagination extends Component {

    handlePageChange = (data) => {
        this.props.filmsActions.onFilmsPageChange(data.selected);
        this.props.filmsActions.onFilmsLoad(data.selected + 1);
    }

    render() {
        return (
            <ReactPaginate previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel="..."
                breakClassName={"break-me"}
                pageCount={3}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageChange}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"} 
            />
        );
    }
}

export default Pagination;