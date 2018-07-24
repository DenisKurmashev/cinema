import React from "react";
import "./index.css";

class SearchBar extends React.Component {

    handleChange = async event => {
        console.log(this.props);
        this.props.filmsActions.onFilmsChange(event.target.name);    
    }

    render() {
        return (
            <div className="search-bar">
                <form className="search-bar-form">
                    <input type="text" onChange={this.handleChange} autoFocus name="searchText" placeholder="Enter the search query" />
                </form>
            </div>
        );
    }

}

export default SearchBar;