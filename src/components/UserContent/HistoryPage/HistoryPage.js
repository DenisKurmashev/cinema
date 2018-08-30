import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Filter from "./Filter/Filter";
import HistoryList from "./HistoryList/HistoryList";

import * as OrderActions from "../../../actions/order";

import "./HistoryPage.css";

class HistoryPage extends PureComponent {
  static propTypes = {
    order: PropTypes.shape({
      isSortByFuture: PropTypes.oneOf(["future", "past"]),
      isFetching: PropTypes.bool,
      orderList: PropTypes.array,
      error: PropTypes.string
    }),

    orderActions: PropTypes.shape({
      fetchOrders: PropTypes.func,
      onChangeOrderSortFilter: PropTypes.func
    })
  };
  static defaultProps = {
    order: {
      isSortByFuture: "future",
      isFetching: false,
      orderList: [],
      error: null
    },

    orderActions: {
      fetchOrders: () => {},
      onChangeOrderSortFilter: () => {}
    }
  };

  render() {
    const { order, orderActions } = this.props;

    return (
      <div className="history-page">
        <Filter
          isSortByFuture={order.isSortByFuture}
          changeSort={orderActions.onChangeOrderSortFilter}
        />
        <HistoryList order={order} orderActions={orderActions} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  order: state.orderList
});
const mapDispatchToProps = dispatch => ({
  orderActions: bindActionCreators(OrderActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryPage);
