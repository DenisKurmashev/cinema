import React from "react";
import { withFormik } from "formik";
import { validate, handleSubmit } from "../util";

const InnerRegisterForm = ({ values, errors, touched, handleChange, handleSubmit, }) => {
    return (
        <form onSubmit={handleSubmit} className="default-form">
			<div className="default-form__title">Sign up</div>

            <div className="default-form__error">{touched.name && errors.name}</div>
			<input type="text" placeholder="Name" name="name" onChange={handleChange} value={values.name} />

			<div className="default-form__error">{touched.email && errors.email}</div>
			<input type="email" placeholder="Email" name="email" onChange={handleChange} value={values.email} />

			<div className="default-form__error">{touched.password && errors.password}</div>
			<input type="password" placeholder="Password" name="password" onChange={handleChange} value={values.password} />

			<button type="submit" className="btn">Sign up</button>
        </form>
    );
}

const RegisterForm = withFormik({
	mapPropsToValues: props => ({ name: "", email: "", password: "" }),
	validate,
	handleSubmit,
})(InnerRegisterForm);

export default RegisterForm;