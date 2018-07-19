import React from "react";
import { NavLink } from "react-router-dom";
import { withFormik } from "formik";
import { validate, handleLogin } from "../util";
import { REGISTER } from "../../path";

const InnerLoginForm = ({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => {
    return (
        <form onSubmit={handleSubmit} className="default-form" noValidate>
			<div className="default-form__title">Sign in</div>

			<div className="default-form__error">{touched.email && errors.email}</div>
			<input type="email" placeholder="Email" name="email" onChange={handleChange} value={values.email} />

			<div className="default-form__error">{touched.password && errors.password}</div>
			<input type="password" placeholder="Password" name="password" onChange={handleChange} value={values.password} />

			<button type="submit" className="btn" disabled={isSubmitting}>Sign in</button>
			<NavLink className="btn-underline" to={REGISTER}>Not have account? Sign up.</NavLink>
        </form>
    );
}

const LoginForm = withFormik({
	mapPropsToValues: props => ({ email: "", password: "", user: props.user, userActions: props.userActions }),
	validate,
	handleSubmit: handleLogin,
	onSubmit: (values, actions) => {
		actions.setSubmitting(true);
	},
})(InnerLoginForm);

export default LoginForm;