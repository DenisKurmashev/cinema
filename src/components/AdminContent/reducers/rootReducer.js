import { combineReducers } from "redux";
import FilmReducer from "./films";

export default combineReducers({
    films: FilmReducer, 
 });