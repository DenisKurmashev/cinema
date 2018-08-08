import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Filter from "./Filter/Filter";
import HistoryList from "./HistoryList/HistoryList";

class HistoryPage extends PureComponent {

    render() {
        return (
            <div className="history-page">
                <Filter />
                <HistoryList />
            </div>
        );
    }

}

const mapStateToProps = state => ({

});
const mapDispatchToProps = dispatch => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);