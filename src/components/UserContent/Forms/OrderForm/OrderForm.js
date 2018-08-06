import React from "react";
import { withFormik } from "formik";
import { validateOrderForm, handleOrderForm } from "../util";

const InnerOrderForm = ({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => {
    return (
        <form onSubmit={handleSubmit} className="default-form" noValidate>
            <h1>Hello</h1>
        </form>
    );
};

const OrderForm = withFormik({
    mapPropsToValues: props => ({ email: "", password: "", user: props.user, userActions: props.userActions }),
	validate: validateOrderForm,
	handleSubmit: handleOrderForm,
	onSubmit: (values, actions) => {
		actions.setSubmitting(true);
	},
})(InnerOrderForm);

export default OrderForm;