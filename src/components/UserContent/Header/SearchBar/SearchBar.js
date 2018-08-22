import React, { PureComponent } from "react";
import { DebounceInput } from "react-debounce-input";
import { FILTER_TYPES } from "../../../../constants/constants";
import "./SearchBar.css";

class SearchBar extends PureComponent {

    state = {
        typeOfInput: "text",
    }

    handleTextInputChange = event => {
        const { onSearchTextChange, onFilmsLoad, onFilmsChange, onFilmsPageChange } = this.props.filmsActions;
        const value = event.target.value;

        onFilmsPageChange(0);
        onSearchTextChange(value);
        
        if (!value) onFilmsLoad(1)
        else onFilmsChange(value);
    }

    handleRadioInputChange = event => {
        const { onFilmsLoad, onFilmsChange, onFilmsFilterChange } = this.props.filmsActions;
        const { searchText } = this.props.films;

        onFilmsFilterChange(event.target.value);

        if (!searchText) onFilmsLoad(1)
        else onFilmsChange(searchText);

        if (event.target.getAttribute("id") === "date") {
            this.setState({ typeOfInput: "datetime-local" });
        } else {
            this.setState({ typeOfInput: "text" });
        }

    }

    formOnSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <div className="search-bar">
                <form className="search-bar-form" noValidate onSubmit={this.formOnSubmit}>
                    <div className="search-bar-form__input">
                        <DebounceInput 
                            debounceTimeout={300} 
                            value={this.props.films.searchText} 
                            type={this.state.typeOfInput} 
                            autoComplete="off" 
                            onChange={this.handleTextInputChange} 
                            autoFocus 
                            name="searchText" 
                            placeholder="Enter the search query" 
                        />
                    </div>
                    <div className="search-bar-form__options">
                        {FILTER_TYPES.map(item => (
                            // React key = item.value
                            <div key={item.value} className="search-bar-form__options-item">
                                <input type="radio" value={item.value} name="option" id={item.value}
                                    checked={this.props.films.filter === item.value} onChange={this.handleRadioInputChange} />
                                <label htmlFor={item.value} >{item.name}</label>
                            </div>
                        ))}
                    </div>
                </form>
            </div>
        );
    }

}

export default SearchBar;