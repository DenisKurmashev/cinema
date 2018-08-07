import React from "react";
import { withFormik } from "formik";
import { validateOrderForm, handleOrderForm } from "../util";

class InnerOrderForm extends React.PureComponent {

    componentDidMount() {
        this.props.orderActions.loadAdditional();
    }

    render() {
        const { values, errors, touched, handleChange, handleSubmit, isSubmitting }
            = this.props;
    
        return (
            <form onSubmit={handleSubmit} className="default-form" noValidate>
                <div className="additional">

                </div>
            </form>
        );
    }

}

const OrderForm = withFormik({
    validateOnBlur: false,
    mapPropsToValues: props => ({ email: "", password: "", user: props.user, userActions: props.userActions }),
	validate: validateOrderForm,
	handleSubmit: handleOrderForm,
	onSubmit: (values, actions) => {
		actions.setSubmitting(true);
	},
})(InnerOrderForm);

export default OrderForm;