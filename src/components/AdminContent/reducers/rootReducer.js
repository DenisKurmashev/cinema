import { combineReducers } from "redux";

import FilmReducer from "./films";
import AdditionalReducer from "./additional";

export default combineReducers({
    films: FilmReducer, 
    additional: AdditionalReducer,
 });