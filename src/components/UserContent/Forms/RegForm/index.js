import React from "react";
import { withFormik } from "formik";
import { validate, handleSubmit } from "../util";

const InnerRegForm = ({ values, errors, touched, handleChange, handleSubmit, }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="">{touched.name && errors.name}</div>
			<input type="text" name="name" onChange={handleChange} value={values.name} />

			<div className="">{touched.email && errors.email}</div>
			<input type="email" name="email" onChange={handleChange} value={values.email} />

			<div className="">{touched.password && errors.password}</div>
			<input type="password" name="password" onChange={handleChange} value={values.password} />

			<button type="submit">Submit</button>
        </form>
    );
}

const RegForm = withFormik({
	mapPropsToValues: props => ({ name: "", email: "", password: "" }),
	validate,
	handleSubmit,
})(InnerRegForm);

export default RegForm;