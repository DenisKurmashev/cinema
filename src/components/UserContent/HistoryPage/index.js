import React, { PureComponent } from "react";

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

export default HistoryPage;