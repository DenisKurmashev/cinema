import React from "react";
import Additional from "./Additional/Additional";

import "./OrderForm.css";

class OrderForm extends React.PureComponent {

    componentWillUnmount() {
        // This is very bad practice to call async HTTP request in unmount LFC, here the component will be destoyed but still the requests will be fired
        this.props.orderActions.removeFromPendingArray()
            .then(this.props.filmsActions.onFilmLoad());
    }

    // Note: componentWillMount is deprecated LFC, in React16.3 + you should not use it
    // https://reactjs.org/docs/react-component.html#unsafe_componentwillmount
    componentWillMount() {
        this.props.orderActions.addToPendingArray();
    }

    render() {
        const { order, orderActions }
            = this.props;
            
        return (
            <form className="default-form" noValidate>
                {
                    order.isSuccess
                    ? (
                        <div className="default-form__congratulation" >
                            <div><h2>Congratulation!</h2></div>
                            <div className="close-btn-wrapper">
                                <input disabled={order.fetching} onClick={orderActions.onOrderFormClose} type="button" className="btn text-upper" value="close" />
                            </div>
                        </div>
                    )
                    : (
                        <React.Fragment>
                            <Additional />
                            <input disabled={order.fetching} onClick={orderActions.addNewOrder} type="button" className="btn text-upper" value="get ticket" />
                            <input disabled={order.fetching} onClick={orderActions.onOrderFormClose} type="button" className="btn text-upper" value="close" />
                        </React.Fragment>
                    )
                }
            </form>
        );
    }

}

export default OrderForm;