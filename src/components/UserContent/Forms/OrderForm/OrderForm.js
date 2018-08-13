import React from "react";
import Additional from "./Additional/Additional";

class OrderForm extends React.PureComponent {

    componentWillUnmount() {
        this.props.orderActions.removeFromPendingArray()
            .then(this.props.filmsActions.onFilmLoad());
    }

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
                        <div>
                            <div><h2>Congratulation!</h2></div>
                            <div><input disabled={order.fetching} onClick={orderActions.onOrderFormClose} type="button" className="btn text-upper" value="close" /></div>
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