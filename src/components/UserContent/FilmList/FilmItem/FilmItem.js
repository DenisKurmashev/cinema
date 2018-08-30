import React, { PureComponent } from "react";
import { Route, Switch, Link } from "react-router-dom";

import FilmItemInfo from "./FilmItemInfo/FilmItemInfo";
import OrderItemInfo from "./OrderItemInfo/OrderItemInfo";

import { HISTORY } from "../../path";

class FilmItem extends PureComponent {
  render() {
    const { _id, date, film, cinema } = this.props.film;
    const orderInfo = this.props.orderInfo;

    return (
      <div className="film-container-item">
        {orderInfo ? <OrderItemInfo orderInfo={orderInfo} /> : null}
        <div className="film-container-item__title">{film.name}</div>
        <div className="film-container-item__cover">
          <img className="width-100" src={film.cover} alt={film.name} />
        </div>
        <FilmItemInfo city={cinema.city} name={cinema.name} date={date} />

        <Link className="btn text-upper" to={`/seance/${_id}`}>
          <Switch>
            <Route path={HISTORY} render={() => "View info"} />
            <Route render={() => "Buy ticket"} />
          </Switch>
        </Link>
      </div>
    );
  }
}

export default FilmItem;
