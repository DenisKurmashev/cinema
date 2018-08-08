import React, { PureComponent } from "react";

import FilmItem from "../../FilmList/FilmItem/FilmItem";

import "./HistoryList.css";

class HistoryList extends PureComponent {

    componentDidMount() {
        this.props.orderActions.fetchOrders();
    }

    render() {
        const { order } 
            = this.props;

        return (
            <div className="history-page-list">
                {
                    order.orderList.length !== 0
                    ? order.orderList.map(item => <FilmItem key={item._id} film={item.session} />)
                    : null
                }
            </div>
        );
    }

}

export default HistoryList;