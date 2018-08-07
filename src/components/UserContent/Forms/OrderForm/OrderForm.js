import React from "react";
import Additional from "./Additional/Additional";

class OrderForm extends React.PureComponent {

    render() {
        const { order, orderActions }
            = this.props;
            
        return (
            <form className="default-form" noValidate>
                <Additional />

                <input disabled={order.fetching} onClick={orderActions.addNewOrder} type="button" className="btn text-upper" value="get ticket" />
            </form>
        );
    }

}

export default OrderForm;