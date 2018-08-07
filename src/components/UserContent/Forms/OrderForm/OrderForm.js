import React from "react";
import { withFormik } from "formik";
import { validateOrderForm, handleOrderForm } from "../util";
import Additional from "./Additional/Additional";

class InnerOrderForm extends React.PureComponent {

    render() {
        const { order, orderActions, values, errors, touched, handleChange, handleSubmit, isSubmitting }
            = this.props;
            
        return (
            <form onSubmit={handleSubmit} className="default-form" noValidate>
                <Additional order={order} orderActions={orderActions} />
            </form>
        );
    }

}

const OrderForm = withFormik({
    validateOnBlur: false,
    mapPropsToValues: props => ({ email: "", password: "" }),
	validate: validateOrderForm,
	handleSubmit: handleOrderForm,
	onSubmit: (values, actions) => {
		actions.setSubmitting(true);
	},
})(InnerOrderForm);

export default OrderForm;