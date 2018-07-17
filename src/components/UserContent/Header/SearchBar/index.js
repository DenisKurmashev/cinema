import React from "react";
import Autosuggest from "react-autosuggest";
import "./index.css";

const getSuggestions = (value, data) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    
    return inputLength === 0 ? [] : [ { name: "Denis" } ];
};

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            suggestions: [],
        };
    }

    onChange = (event, { newValue }) => {
        this.setState({ value: newValue });
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({  })
    }

    render() {
        const { value, suggestions } = this.state;
    
        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Type a name of film or city where you need a cinema...',
            value,
            onChange: this.onChange
        };

        return (
            <div className="search-bar">
                <form className="search-bar-form">
                    
                </form>
            </div>
        );
    }
}

export default SearchBar;

// import Autosuggest from 'react-autosuggest';
 
// // Imagine you have a list of languages that you'd like to autosuggest.
// const languages = [
//   {
//     name: 'C',
//     year: 1972
//   },
//   {
//     name: 'C++',
//     year: 1972
//   },
//   {
//     name: 'Elm',
//     year: 2012
//   },
// ];
 
// // Teach Autosuggest how to calculate suggestions for any given input value.
// const getSuggestions = value => {
//   const inputValue = value.trim().toLowerCase();
//   const inputLength = inputValue.length;
 
//   return inputLength === 0 ? [] : languages.filter(lang =>
//     lang.name.toLowerCase().slice(0, inputLength) === inputValue
//   );
// };
 

// const getSuggestionValue = suggestion => suggestion.name;
 
// // Use your imagination to render suggestions.
// const renderSuggestion = suggestion => (
//   <div>
//     {suggestion.name}
//   </div>
// );
 
// class SearchBar extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       value: '',
//       suggestions: []
//     };
//   }
 
//   onChange = (event, { newValue }) => {
//     this.setState({
//       value: newValue
//     });
//   };
//   onSuggestionsFetchRequested = ({ value }) => {
//     this.setState({
//       suggestions: getSuggestions(value)
//     });
//   };
 
//   onSuggestionsClearRequested = () => {
//     this.setState({
//       suggestions: []
//     });
//   };
 
//   render() {
//     const { value, suggestions } = this.state;
 
//     // Autosuggest will pass through all these props to the input.
//     const inputProps = {
//       placeholder: 'Type a programming language',
//       value,
//       onChange: this.onChange
//     };
 
//     // Finally, render it!
//     return (
//       <Autosuggest
//         suggestions={suggestions}
//         onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
//         onSuggestionsClearRequested={this.onSuggestionsClearRequested}
//         getSuggestionValue={getSuggestionValue}
//         renderSuggestion={renderSuggestion}
//         inputProps={inputProps}
//       />
//     );
//   }
// }

// export default SearchBar;