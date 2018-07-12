import React from "react";
import { withFormik } from "formik";
import { validate, handleSubmit } from "../util";

const InnerAuthForm = ({ values, errors, touched, handleChange, handleSubmit, }) => {
    return (
        <form onSubmit={handleSubmit}>
			<div className="">{touched.email && errors.email}</div>
			<input type="email" name="email" onChange={handleChange} value={values.email} />

			<div className="">{touched.password && errors.password}</div>
			<input type="password" name="password" onChange={handleChange} value={values.password} />

			<button type="submit">Submit</button>
        </form>
    );
}

const AuthForm = withFormik({
	mapPropsToValues: props => ({ email: "", password: "" }),
	validate,
	handleSubmit,
})(InnerAuthForm);

export default AuthForm;