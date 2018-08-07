import React from "react";

import "./Additional.css";

class Additional extends React.PureComponent {

    componentDidMount() {
        if (!this.props.order.additional.length)
            this.props.orderActions.loadAdditional();
    }

    handleAdditionalChange = (event) => {
        const { order, orderActions } = this.props;

        const current = event.currentTarget;
        const checkBox = current.getElementsByClassName("additional-item__checkbox")[0];
        const countInput = current.getElementsByClassName("info-count__input")[0];

        const id = current.getAttribute("data-id");
        const isChecked = checkBox.checked;
        const count = parseInt(countInput.value || 0);
        
        for (let i = 0; i < order.selectedAdditionals.length; i++) {
            if (order.selectedAdditionals[i].id === id && isChecked === false) 
                orderActions.onSelectedAdditionalRemove(id);
        }

        if (isChecked) { 
            if (count !== 0) orderActions.onSelectedAdditionalAdd(id, count);
            else {
                countInput.value = 1;
                orderActions.onSelectedAdditionalAdd(id, 1);
            }                
        }
        else {
            checkBox.checked = true;
            orderActions.onSelectedAdditionalAdd(id, count);
        }
        
    }

    render() {
        const { order, orderActions } = this.props;

        return (
            <div className="additional">
                <h3>Additional</h3>
                {
                    order.additional
                    ? order.additional.map(item => (
                        <div data-id={item._id} onChange={this.handleAdditionalChange} key={item._id} className="additional-item">
                            <input className="additional-item__checkbox" type="checkbox" name="" id={`${item.name}__id`} />
                            <label className="additional-item__info" htmlFor={`${item.name}__id`}>
                                <div className="additional-item__info-description">
                                    <div><strong>{item.name}</strong></div>
                                    <div>{item.description}</div>
                                </div>
                                <div className="additional-item__info-count">
                                    <input type="number" min={0} max={12} defaultValue={0} placeholder="Count of additional" name="" className="info-count__input"/>
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