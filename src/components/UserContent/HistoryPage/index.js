import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Filter from "./Filter/Filter";
import HistoryList from "./HistoryList/HistoryList";

import * as OrderActions from "../../../actions/order"; 

class HistoryPage extends PureComponent {

    render() {
        const { order, orderActions }
            = this.props;

        return (
            <div className="history-page">
                <Filter />
                <HistoryList order={order} orderActions={orderActions} />
            </div>
        );
    }

}

const mapStateToProps = state => ({
    order: state.orderList,
});
const mapDispatchToProps = dispatch => ({
    orderActions: bindActionCreators(OrderActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);