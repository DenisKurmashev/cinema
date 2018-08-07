import React from "react";

import "./Additional.css";

class Additional extends React.PureComponent {

    componentDidMount() {
        if (!this.props.order.additional.length)
            this.props.orderActions.loadAdditional();
    }

    render() {
        const { order, orderActions } = this.props;

        return (
            <div className="additional">
                <h3>Additional</h3>
                {
                    order.additional
                    ? order.additional.map(item => (
                        <div key={item._id} className="additional-item">
                            <input className="additional-item__checkbox" type="checkbox" name="" id={`${item.name}__id`} />
                            <label className="additional-item__info" htmlFor={`${item.name}__id`}>
                                <div className="additional-item__info-description">
                                    <div><strong>{item.name}</strong></div>
                                    <div>{item.description}</div>
                                </div>
                                <div className="additional-item__info-count">
                                    <input type="number" min={0} defaultValue={0} placeholder="Count of additional" name="" id=""/>
                                </div>
                            </label>
                        </div>
                    ))
                    : <h2>Loading data ...</h2>
                }
                <div className="additional-count">Count: 0$</div>
            </div>
        );
    }

}

export default Additional;