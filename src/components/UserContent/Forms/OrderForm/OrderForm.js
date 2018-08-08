import React from "react";
import Additional from "./Additional/Additional";

class OrderForm extends React.PureComponent {

    componentWillUnmount() {
        this.props.filmsActions.onFilmLoad();
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
                    ? <h2>Congratulation!</h2>
                    : (
                        <React.Fragment>
                            <Additional />
                            <input disabled={order.fetching} onClick={orderActions.addNewOrder} type="button" className="btn text-upper" value="get ticket" />
                        </React.Fragment>
                    )
                }
            </form>
        );
    }

}

export default OrderForm;