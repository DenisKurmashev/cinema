import React, { PureComponent } from "react";

import { ORDER_FILTER_TYPES } from "../../../../constants/constants";

import "./Filter.css";

class Filter extends PureComponent {
  render() {
    return (
      <div onChange={this.props.changeSort} className="order-filter">
        {ORDER_FILTER_TYPES.map(item => (
          <div key={item.value} className="order-filter-item">
            <input
              type="radio"
              name="sort-by"
              defaultChecked={item.value === this.props.isSortByFuture}
              id={`${item.value}__id`}
            />
            <label htmlFor={`${item.value}__id`}>{item.name}</label>
          </div>
        ))}
      </div>
    );
  }
}

export default Filter;
