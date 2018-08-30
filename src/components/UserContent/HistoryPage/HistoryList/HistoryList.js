import React, { PureComponent } from "react";

import FilmItem from "../../FilmList/FilmItem/FilmItem";
import FilmLoading from "../../FilmList/FilmLoading/FilmLoading";
import { getOrderInfo } from "../util";

import "./HistoryList.css";

class HistoryList extends PureComponent {
  componentDidMount() {
    this.props.orderActions.fetchOrders();
  }

  render() {
    const { order } = this.props;

    const orderList =
      order.isSortByFuture === "future"
        ? order.orderList.filter(
            item => new Date(item.created).getTime() < Date.now()
          )
        : order.orderList.filter(
            item => new Date(item.created).getTime() > Date.now()
          );

    return (
      <div className="history-page-list">
        {order.isFetching ? (
          <FilmLoading />
        ) : orderList.length !== 0 ? (
          orderList.map(item => (
            <FilmItem
              key={item._id}
              orderInfo={getOrderInfo(item)}
              film={item.session}
            />
          ))
        ) : (
          <h2>Orders not found!</h2>
        )}
      </div>
    );
  }
}

export default HistoryList;
