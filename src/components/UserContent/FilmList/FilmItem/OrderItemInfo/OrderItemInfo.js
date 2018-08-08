import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import "./OrderItemInfo.css";

class OrderItemInfo extends PureComponent {

    static propTypes = {
        orderInfo: PropTypes.shape({
            additional: PropTypes.array,
            created: PropTypes.string,
            place: PropTypes.shape({
                x: PropTypes.number,
                y: PropTypes.number,
            })
        })
    }
    static defaultProps = {
        orderInfo: {
            additional: [],
            created: "",
            place: {
                x: null,
                y: null
            }
        }
    }

    render() {
        const { additional, created, place } = this.props.orderInfo;

        return (
            <div className="film-container-item__order-info">
                <div className="order-info__date">Date: {(new Date(created)).toLocaleString()}</div>
                <div className="order-info__place">Row: {place.y}, Place: {place.x}</div>
                {
                    additional.length !== 0
                    ? (
                        <div className="order-info__additional">
                            {
                                additional.map(item => (
                                    <div key={item._id} className="order-info__additional-item">
                                        {item.additional.name} * {item.count} = {item.additional.price * item.count}$
                                    </div>
                                ))
                            }
                        </div>
                    ) : null
                }
            </div>
        );
    }

}

export default OrderItemInfo;