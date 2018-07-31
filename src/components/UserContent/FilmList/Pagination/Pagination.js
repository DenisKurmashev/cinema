import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css"

class Pagination extends Component {

    handlePageChange = (data) => {
        this.props.filmsActions.onFilmsPageChange(data.selected);

        if (this.props.films.searchText)
            this.props.filmsActions.onFilmsChange(null, data.selected + 1);
        else 
            this.props.filmsActions.onFilmsLoad(data.selected + 1);
        
    }

    render() {
        return (
            <ReactPaginate previousLabel={"previous"}
                forcePage={this.props.films.pageId}
                nextLabel={"next"}
                breakLabel="..."
                breakClassName={"break-me"}
                pageCount={this.props.films.pageCount}
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