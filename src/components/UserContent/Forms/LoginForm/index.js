import React from "react";
import { NavLink } from "react-router-dom";
import { withFormik } from "formik";
import { validate, handleSubmit } from "../util";

const InnerLoginForm = ({ values, errors, touched, handleChange, handleSubmit, }) => {
    return (
        <form onSubmit={handleSubmit} className="default-form">
			<div className="default-form__title">Sign in</div>

			<div className="default-form__error">{touched.email && errors.email}</div>
			<input type="email" placeholder="Email" name="email" onChange={handleChange} value={values.email} />

			<div className="default-form__error">{touched.password && errors.password}</div>
			<input type="password" placeholder="Password" name="password" onChange={handleChange} value={values.password} />

			<button type="submit" className="btn">Sign in</button>
			<NavLink className="btn-underline" to="/register">Not have account? Sign up.</NavLink>
        </form>
    );
}

const LoginForm = withFormik({
	mapPropsToValues: props => ({ email: "", password: "" }),
	validate,
	handleSubmit,
})(InnerLoginForm);

export default LoginForm;