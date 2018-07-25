import React from "react";
import { Link } from "react-router-dom";
import FilmItemInfo from "./FilmItemInfo/FilmItemInfo";
import "./index.css";
import FilmLoading from "./FilmLoading";

const FilmList = ({ user, userActions, films, filmsActions }) => {
    return (
        <div className="film-container width-60">
   
        {
            !films.isFetching
            ? films.currentFilms.map(item => (
                <div key={item._id} className="film-container-item">
                    <div className="film-container-item__title">{item.film.name}</div>
                    <div className="film-container-item__cover">
                        <img className="width-100" src={item.film.cover} alt={item.film.name}/>
                    </div>
                    <FilmItemInfo city={item.cinema.city} name={item.cinema.name} date={item.date} />
                    <Link className="btn text-upper" to={`/session/${item._id}`}>Buy ticket</Link>
                </div>
            )) 
            : <FilmLoading />
        }
            
        </div>
    )
};

export default FilmList;