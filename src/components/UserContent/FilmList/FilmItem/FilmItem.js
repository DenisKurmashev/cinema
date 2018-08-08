import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

import FilmItemInfo from "./FilmItemInfo/FilmItemInfo";
import OrderItemInfo from "./OrderItemInfo/OrderItemInfo";

class FilmItem extends PureComponent {

    render() {
        const { _id, date, film, cinema, orderInfo } = this.props.film;

        return (
            <div className="film-container-item">
                {
                    orderInfo 
                    ? <OrderItemInfo orderInfo={orderInfo} />
                    : null
                }
                <div className="film-container-item__title">{film.name}</div>
                <div className="film-container-item__cover">
                    <img className="width-100" src={film.cover} alt={film.name}/>
                </div>
                <FilmItemInfo city={cinema.city} name={cinema.name} date={date} />
                <Link className="btn text-upper" to={`/seance/${_id}`}>Buy ticket</Link>
            </div>
        );
    }

}

export default FilmItem;