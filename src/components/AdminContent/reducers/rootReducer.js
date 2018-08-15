import { combineReducers } from "redux";

import FilmReducer from "./films";
import AdditionalReducer from "./additional";
import SeanceReducer from "./seance";

export default combineReducers({
    films: FilmReducer, 
    additional: AdditionalReducer,
    seance: SeanceReducer,
 });